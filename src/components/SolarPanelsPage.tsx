import React from 'react';
import { useNavigate } from 'react-router-dom';
import SolarPanelCalculator from './SolarPanelCalculator';
import BatteriesPage from './BatteriesPage';
import { ChevronRight } from 'lucide-react';

const SolarPanelsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 16px;
            height: 16px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          * {
            scrollbar-width: auto;
            scrollbar-color: #c1c1c1 #f1f1f1;
          }
        `}
      </style>

      <div className="text-black max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light mb-6">
          <strong>Solar panels: complete technical guide for homeowners 2026</strong>
        </h2>

        <p className="text-lg mb-6">
          Photovoltaic solar panels convert sunlight into electricity and today stand among the most profitable investments for homeowners. In this guide, you'll discover when solar panels were first developed, how much they used to cost, and how much they cost now after a price drop of more than 90%.
          <br /><br />
          <strong>But the real question is: are they truly a good investment?</strong>
        </p>

        <div className="flex justify-center my-4">
          <img
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1780122307/hombre_en_traje_de_c_tmj9sf.png"
            alt="Investment"
            className="w-auto"
            style={{ height: '13.2rem' }}
          />
        </div>

        <p className="text-lg mb-6">
          You will also see what real returns they offer compared to other investments: a bank deposit yields around 3%, the stock market can reach <strong>10%</strong>, but solar panels achieve between <strong>12% and 18%</strong> annually, depending on your home and your consumption. Additionally, you will learn how to use a simple formula to calculate how many years it will take to recoup your investment, without batteries. You can enter your own data: orientation, location, number of panels, roof pitch, installation costs, and your average consumption. If you sell surplus energy back to the electricity company, you will know exactly when your electricity will become completely free. <strong>Is the investment profitable then? Could it even be more profitable than investing in the stock market?</strong>
        </p>

        <div className="flex justify-center my-4">
          <img
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1780122594/Inersion_xdcdrw.png"
            alt="Investment"
            className="w-auto"
            style={{ height: '13.2rem' }}
          />
        </div>

        <p className="text-lg mb-6">
          Tailored to the real characteristics of your home, you'll get the exact data you need to understand your investment clearly and confidently. But first, let's learn more about the history of solar panels to understand the current state of this technology, as well as the future of the next technologies being researched. <strong>Let's go.</strong>
        </p>

        {/* 1. HISTORY */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">
          1. Origins and evolution of solar panels – from 19th century to today's technology
        </h3>

        <h4 className="text-xl font-semibold mt-6 mb-2">🌞 The Pioneers (19th century – 1954)</h4>
        <p className="mb-2">
          The history of solar energy began much earlier than most people imagine. In <strong>1883</strong>,
          American inventor <strong>Charles Fritts</strong> built the first practical photovoltaic
          module using selenium coated with a thin layer of gold. Its efficiency was only about
          <strong>1‑2%</strong> – revolutionary in concept but not practical for large‑scale electricity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md">
              <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779952585/4218c5e2-e86e-4093-b8c4-21aa628fbd49.png" alt="Diagram 1" className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-md">
              <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779952645/fa9cf63c-2bce-454e-be4a-47a0bc1c09b2.png" alt="Diagram 2" className="w-full h-auto object-cover" />
            </div>
          </div>
