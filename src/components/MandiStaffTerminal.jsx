import React, { useState } from 'react';
import { 
  Building2, 
  Megaphone, 
  CheckCircle2, 
  Scale, 
  FileSpreadsheet, 
  IndianRupee, 
  Send, 
  Sliders, 
  ShieldCheck,
  Building,
  Printer,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../data/i18n';
import { mspRates, sampleFarmerProfile } from '../data/mockData';
import { downloadProcurementPdfReceipt } from '../utils/generatePdfReceipt';

export default function MandiStaffTerminal({ 
  activeBooking, 
  onUpdateQualityAndWeighment, 
  onApproveDbtPayment, 
  onCallNextToken,
  lang 
}) {
  const t = translations[lang] || translations.en;

  // Local Form States
  const [moisture, setMoisture] = useState(activeBooking?.qualityData?.moisturePercent || 12.5);
  const [foreignMatter, setForeignMatter] = useState(activeBooking?.qualityData?.foreignMatterPercent || 0.8);
  const [grade, setGrade] = useState(activeBooking?.qualityData?.grade || 'Grade A');
  const [grossKg, setGrossKg] = useState(activeBooking?.weighmentData?.grossKg || 16200);
  const [tareKg, setTareKg] = useState(activeBooking?.weighmentData?.tareKg || 4200);
  
  // Calculate Net
  const netKg = Math.max(0, grossKg - tareKg);
  const netQuintals = Math.round(netKg / 100);
  
  const currentRate = mspRates[activeBooking?.cropType || 'wheat']?.pricePerQuintal || 2275;
  const totalMspAmount = netQuintals * currentRate;

  // Slip Generated State
  const [slipGenerated, setSlipGenerated] = useState(activeBooking?.stepIndex >= 6);

  const handleSaveQualityWeighment = (e) => {
    e.preventDefault();
    onUpdateQualityAndWeighment({
      moisturePercent: Number(moisture),
      foreignMatterPercent: Number(foreignMatter),
      grade,
      grossKg: Number(grossKg),
      tareKg: Number(tareKg),
      netKg,
      netQuintals,
      totalPaymentRs: totalMspAmount
    });
    setSlipGenerated(true);
  };

  const handleDbtClick = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    onApproveDbtPayment();
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto px-2">
      
      {/* Mandi Terminal Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-600/30">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                  STAFF TERMINAL ACTIVE
                </span>
                <span className="text-xs text-slate-500 font-mono">OPERATOR: FCI-KHN-402</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                Khanna Main Procurement Mandi - Gate & Weighbridge Desk
              </h1>
            </div>
          </div>

          {/* Quick Queue Call Bar */}
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="text-right px-2">
              <div className="text-[10px] text-slate-500 font-black uppercase">Currently Serving</div>
              <div className="text-lg font-black text-amber-600 font-mono">
                {activeBooking?.currentServingToken || "WHEAT-2026-A33"}
              </div>
            </div>
            <button
              onClick={onCallNextToken}
              className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-3 px-4 rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Call Next Token (A-45)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Operator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quality Inspection & Weighbridge Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Quality Grading & Weighbridge Slip
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Record moisture testing & gross/tare tractor weight</p>
                </div>
              </div>
              <span className="font-mono font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl text-xs">
                Token: {activeBooking?.tokenId}
              </span>
            </div>

            {/* Farmer Info Bar */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/60 border border-emerald-200 p-4 rounded-2xl flex flex-wrap justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 font-bold">Farmer: </span>
                <span className="font-black text-slate-900">{activeBooking?.farmerName}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Crop: </span>
                <span className="font-black text-emerald-800">{activeBooking?.cropLabel}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold">Declared Qty: </span>
                <span className="font-black text-slate-900">{activeBooking?.expectedQuintals} Quintals</span>
              </div>
            </div>

            <form onSubmit={handleSaveQualityWeighment} className="space-y-6 text-xs">
              
              {/* Section 1: Quality Grading */}
              <div className="space-y-4">
                <div className="font-black text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>1. Quality & Grain Moisture Inspection</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-black text-slate-700 mb-1.5">
                      Moisture % (Max 14%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={moisture}
                      onChange={(e) => setMoisture(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-900 font-black outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 mb-1.5">
                      Impurity / Foreign %
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={foreignMatter}
                      onChange={(e) => setForeignMatter(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-900 font-black outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 mb-1.5">
                      Produce Grade
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-900 font-black outline-none"
                    >
                      <option value="Grade A">Grade A (100% MSP Rate)</option>
                      <option value="Standard">Standard Grade (100% MSP Rate)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Electronic Weighbridge */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="font-black text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2 text-emerald-700">
                  <Scale className="w-4 h-4" />
                  <span>2. Electronic Weighbridge Measurements</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black text-slate-700 mb-1.5">
                      Gross Tractor Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="10"
                      required
                      value={grossKg}
                      onChange={(e) => setGrossKg(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-900 font-black outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 mb-1.5">
                      Tare Empty Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="10"
                      required
                      value={tareKg}
                      onChange={(e) => setTareKg(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-900 font-black outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Auto Net Calculation Box */}
                <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-amber-900 font-black uppercase">Verified Net Grain Weight</div>
                    <div className="text-base font-black text-amber-950 font-mono">
                      {netKg.toLocaleString()} kg ({netQuintals} Quintals)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-amber-900 font-black uppercase">Calculated MSP Amount</div>
                    <div className="text-lg font-black text-emerald-800 font-mono">
                      ₹{totalMspAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-2xl transition shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span>Calculate Official MSP Bill & Issue Receipt</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Digital Receipt & Instant DBT Disbursal Terminal (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-emerald-200 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-black text-slate-900">
                  Procurement Receipt & DBT Disbursal
                </h2>
              </div>
            </div>

            {slipGenerated ? (
              <div className="space-y-4 animate-fade-in">
                {/* Printable Receipt Ticket Container */}
                <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5 space-y-3 font-mono text-xs shadow-inner">
                  <div className="text-center pb-2 border-b border-slate-200">
                    <div className="font-black text-slate-900 text-base">FCI GOVT. PROCUREMENT RECEIPT</div>
                    <div className="text-[10px] text-slate-500 font-sans">Khanna Mandi • Receipt #FCI-2026-9910</div>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Farmer Name:</span>
                      <span className="font-black text-slate-900">{activeBooking?.farmerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Harvest Crop:</span>
                      <span className="font-black text-emerald-800">{activeBooking?.cropLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Verified Net Qty:</span>
                      <span className="font-black text-slate-900 font-mono">{netQuintals} Quintals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Govt MSP Rate:</span>
                      <span className="font-black text-slate-900">₹{currentRate} / Quintal</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 font-black">
                      <span className="text-slate-800">Total MSP Payable:</span>
                      <span className="text-emerald-800 text-base font-mono">₹{totalMspAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Print & Download Action Buttons for Staff */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handlePrintSlip}
                      className="bg-slate-900 hover:bg-black text-white font-black text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>Print Slip</span>
                    </button>

                    <button
                      onClick={() => downloadProcurementPdfReceipt(activeBooking, sampleFarmerProfile)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save PDF</span>
                    </button>
                  </div>
                </div>

                {/* DBT Disbursal Action */}
                <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl space-y-3">
                  <div className="text-xs text-emerald-950 font-bold">
                    Direct Benefit Transfer (DBT) ready to be credited to farmer bank account <span className="font-black">HDFC ****4821</span>.
                  </div>

                  {activeBooking?.stepIndex >= 7 ? (
                    <div className="p-4 bg-white border-2 border-emerald-300 rounded-xl text-center space-y-1 shadow-md">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="text-sm font-black text-emerald-900">DBT Bank Transfer Executed!</div>
                      <div className="text-xs text-slate-500 font-mono">Ref: {activeBooking?.mspDetails?.paymentRef}</div>
                    </div>
                  ) : (
                    <button
                      onClick={handleDbtClick}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-sm py-4 rounded-xl transition shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                      <span>Initiate Instant DBT Bank Transfer (₹{totalMspAmount.toLocaleString()})</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 space-y-2">
                <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-600">
                  Fill in moisture & weighbridge measurements on the left form to generate official procurement slip.
                </div>
              </div>
            )}
          </div>

          {/* Daily Quota Controller Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-black text-slate-900">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                {t.mandiQuotaControl}
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-extrabold text-[10px]">ACTIVE</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 font-medium">
              <div className="flex justify-between">
                <span>Daily Max Capacity:</span>
                <span className="font-black text-slate-900 font-mono">10,000 Quintals</span>
              </div>
              <div className="flex justify-between">
                <span>Booked Today:</span>
                <span className="font-black text-amber-700 font-mono">9,200 Quintals (92%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
