export interface Env {
  // si usas variables de entorno, defínelas aquí
}

export async function onRequest(context: { request: Request; env: Env }) {
  const url = new URL(context.request.url);
  const postcode = url.searchParams.get('postcode');
  const peakPower = parseFloat(url.searchParams.get('peakPower') || '4');
  const inclination = parseInt(url.searchParams.get('inclination') || '35');
  const azimuth = parseInt(url.searchParams.get('azimuth') || '0');
  const batteryKwh = parseFloat(url.searchParams.get('battery') || '0');

  if (!postcode) {
    return new Response(JSON.stringify({ error: 'Postcode required' }), { status: 400 });
  }

  try {
    // 1️⃣ Geocodificar código postal → lat/lon (Nominatim)
    const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(postcode)}&format=json&limit=1`;
    const geoRes = await fetch(geoUrl, { headers: { 'User-Agent': 'DB+ Solar Calculator' } });
    const geoData = await geoRes.json() as any[];
    if (!geoData.length) throw new Error('Postcode not found');
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // 2️⃣ Obtener datos de PVGIS
    const pvgisUrl = `https://re.jrc.ec.europa.eu/api/PVcalc?lat=${lat}&lon=${lon}&peakpower=${peakPower}&loss=14&inclination=${inclination}&azimuth=${azimuth}&outputformat=json`;
    const pvRes = await fetch(pvgisUrl);
    const pvData = await pvRes.json() as any;
    if (!pvData?.outputs?.totals?.fixed?.E_y) throw new Error('PVGIS data unavailable');

    const produccionAnual = pvData.outputs.totals.fixed.E_y; // kWh
    const consumoAnual = 4500; // factura típica (puedes hacerlo configurable)
    const precioKwh = 0.25;     // £/kWh
    const precioExcedente = 0.10; // SEG

    const ahorroDirecto = Math.min(produccionAnual, consumoAnual) * precioKwh;
    const excedente = Math.max(0, produccionAnual - consumoAnual);
    const ingresoExcedente = excedente * precioExcedente;

    let bateria = null;
    if (batteryKwh > 0) {
      const batteryCost = batteryKwh * 800; // £800/kWh approx
      const excedenteDiario = excedente / 365;
      const energiaBateriaAnual = Math.min(batteryKwh * 365 * 0.9, excedente);
      const ahorroBateria = energiaBateriaAnual * precioKwh;
      const payback = batteryCost / ahorroBateria;
      bateria = {
        capacidad_kwh: batteryKwh,
        costo_estimado_gbp: Math.round(batteryCost),
        ahorro_adicional_gbp: Math.round(ahorroBateria),
        payback_anos: Math.round(payback * 10) / 10,
      };
    }

    const result = {
      produccion_kwh: Math.round(produccionAnual),
      ahorro_directo_gbp: Math.round(ahorroDirecto),
      excedente_kwh: Math.round(excedente),
      ingreso_excedente_gbp: Math.round(ingresoExcedente),
      co2_evitado_kg: Math.round(produccionAnual * 0.25),
      inclinacion_optima: pvData.outputs.optimal?.inclination ?? null,
      bateria,
    };

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
