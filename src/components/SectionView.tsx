/*
 * SECTIONVIEW.TSX — Versión final con Technology basada en imágenes (sin árbol)
 * - Sustituye el componente TechnologyTree por una navegación visual por imágenes.
 * - Cada nivel muestra imágenes que al clicar llevan a subimágenes o al artículo final.
 * - Se incluye el logo "Green Energy" como imagen principal de ese tema.
 * - [MOD 2026-05-29] Reemplazo imagen "Solar panels" y aumento tamaño de logos.
 */

// ... (imports permanecen igual) ...

// Configuración inicial de la tecnología (Nivel 1)
const technologyRootNodes: TechNode[] = [
  {
    id: "green-energy",
    title: "Green Energy",
    imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780075454/Greenenergy_lxlahz.png",
    description: "Renewable energy systems for homes",
    children: [
      {
        id: "solar-panels",
        title: "Solar Panels",
        // NUEVA IMAGEN PROPORCIONADA POR EL USUARIO
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780076711/66681c59-9afc-41e2-be6f-ef0f5d5af64d.png",
        description: "Photovoltaic technology",
        articleComponent: <SolarPanelsPage />,
      },
      // Aquí puedes agregar más hijos: Inverters, Baterías, etc.
    ],
  },
  // Puedes agregar más nodos raíz...
];

// ... (resto del código hasta el render de Technology) ...

              {/* SECCIÓN TECHNOLOGY TOTALMENTE RENOVADA CON IMÁGENES */}
              {isTechnology && (
                <div className="mb-12">
                  <div
                    className="text-black font-normal text-lg md:text-xl leading-tight px-10 mb-8"
                    dangerouslySetInnerHTML={{ __html: displayedCategory.description }}
                  />
                  <div className="px-10">
                    {/* Botón para volver atrás (si hay historial o artículo activo) */}
                    {(techHistory.length > 0 || activeArticle) && (
                      <button
                        onClick={handleTechGoBack}
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 mb-6 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    )}

                    {/* Si hay un artículo activo, lo mostramos */}
                    {activeArticle && (
                      <div className="mt-4">
                        {activeArticle}
                      </div>
                    )}

                    {/* Si no hay artículo activo, mostramos las imágenes del nivel actual */}
                    {!activeArticle && (
                      <>
                        {currentTechNodes.length === 0 ? (
                          <p className="text-gray-500">No hay elementos en este nivel.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {currentTechNodes.map((node) => (
                              <div
                                key={node.id}
                                onClick={() => handleTechNodeClick(node)}
                                className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                              >
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                                  <div className="aspect-video w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                                    <img
                                      src={node.imageUrl}
                                      alt={node.title}
                                      // CLASES MODIFICADAS PARA AUMENTAR EL TAMAÑO DEL LOGO
                                      className="w-auto h-32 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="p-4 text-center">
                                    <h4 className="font-medium text-lg text-gray-800">{node.title}</h4>
                                    {node.description && (
                                      <p className="text-sm text-gray-500 mt-1">{node.description}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

// ... (resto del archivo sin cambios) ...
