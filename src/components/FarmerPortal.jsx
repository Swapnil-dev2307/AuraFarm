import React, { useState } from 'react';
import { 
  UserCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Truck, 
  Compass, 
  QrCode, 
  CalendarCheck, 
  ShieldCheck, 
  Building, 
  Check,
  Download
} from 'lucide-react';
import { translations } from '../data/i18n';
import { mspRates } from '../data/mockData';
import { downloadProcurementPdfReceipt } from '../utils/generatePdfReceipt';

export default function FarmerPortal({ 
  farmerProfile, 
  mandis, 
  activeBooking, 
  onBookSlot, 
  onMarkArrived, 
  onRaiseGrievance,
  lang,
  toggleUssdModal,
  isMobilePreview
}) {
  const t = translations[lang] || translations.en;

  // Booking Form State
  const [selectedMandiId, setSelectedMandiId] = useState('mandi-nashik');
  const [selectedCrop, setSelectedCrop] = useState('soybean');
  const [expectedQty, setExpectedQty] = useState(120);
  const [bookingDate, setBookingDate] = useState('2026-09-06');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:30 AM');
  
  // Grievance Modal State
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [grievanceText, setGrievanceText] = useState('');

  // Selected mandi object
  const selectedMandi = mandis.find(m => m.id === selectedMandiId) || mandis[0];
  
  // Calculate capacity percentage
  const capPercent = Math.round((selectedMandi.bookedQuintals / selectedMandi.dailyCapacityQuintals) * 100);
  const isOverbooked = capPercent > 85;
  const alternateMandi = mandis.find(m => m.id === 'mandi-pimpalgaon') || mandis[1];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onBookSlot({
      mandiId: selectedMandi.id,
      mandiName: selectedMandi.name,
      cropType: selectedCrop,
      cropLabel: mspRates[selectedCrop]?.name || selectedCrop,
      expectedQuintals: Number(expectedQty),
      bookingDate,
      timeSlot
    });
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    onRaiseGrievance(grievanceText);
    setGrievanceSubmitted(true);
    setTimeout(() => {
      setShowGrievanceModal(false);
      setGrievanceSubmitted(false);
      setGrievanceText('');
    }, 2500);
  };

  // Pipeline step definitions
  const pipelineSteps = [
    { key: 1, title: t.step1, desc: `${t.aadhaarVerifiedTitle}` },
    { key: 2, title: t.step2, desc: activeBooking?.bookingDate || t.preferredDateLabel },
    { key: 3, title: t.step3, desc: activeBooking?.gateArrived ? t.gateVerifiedBadge : t.markArrivedBtnText },
    { key: 4, title: t.step4, desc: activeBooking?.qualityData ? t.approvedFullMsp : t.qualityInspectionHeading },
    { key: 5, title: t.step5, desc: activeBooking?.weighmentData ? `${activeBooking.weighmentData.netQuintals} Quintals` : t.weighbridgeHeading },
    { key: 6, title: t.step6, desc: activeBooking?.stepIndex >= 6 ? t.calculatedMspBill : t.officialMandiReceiptTitle },
    { key: 7, title: t.step7, desc: activeBooking?.stepIndex >= 7 ? t.dbtExecutedTitle : t.dbtApprovalTitle },
    { key: 8, title: t.step8, desc: activeBooking?.stepIndex >= 8 ? t.paidToBankTag : t.dbtAccount },
  ];

  const currentStep = activeBooking?.stepIndex || 2;
  const currentMspRate = mspRates[selectedCrop]?.pricePerQuintal || 2275;
  const estimatedTotalValue = expectedQty * currentMspRate;

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto px-2">
      
      {/* Visual Hero Banner with Authentic Aadhaar Identity Photo Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 overflow-hidden">
        <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-6 sm:gap-8 items-center`}>
          
          {/* Left Column: Greeting & Status */}
          <div className={`${isMobilePreview ? 'col-span-1' : 'lg:col-span-7'} space-y-4`}>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1.5 rounded-full border border-emerald-200">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>{t.eKycBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {t.welcomeUser} <span className="text-emerald-700">{farmerProfile.farmerName}</span>! 👋
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {t.aadhaarVerifiedSub}
            </p>

            {/* Quick Profile Cards */}
            <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-3 pt-2`}>
              <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-800 font-bold uppercase">{t.landRecordLinked}</div>
                  <div className="text-xs font-black text-slate-900">{farmerProfile.landRecordNo}</div>
                </div>
              </div>

              <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-lg flex items-center justify-center">
                  ₹
                </div>
                <div>
                  <div className="text-[11px] text-amber-800 font-bold uppercase">{t.dbtAccount}</div>
                  <div className="text-xs font-black text-slate-900">{farmerProfile.bankAccountMasked}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Aadhaar Card Farmer Identity Card */}
          <div className={`${isMobilePreview ? 'col-span-1' : 'lg:col-span-5'}`}>
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-5 shadow-2xl space-y-4">
              
              {/* Aadhaar Card Header */}
              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <div>
                    <div className="text-xs font-black text-slate-900 tracking-wider uppercase">{t.uidaiHeader}</div>
                    <div className="text-[10px] text-slate-500 font-bold">{t.farmerDigitalId}</div>
                  </div>
                </div>
                <span className="bg-emerald-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t.verifiedTag}
                </span>
              </div>

              {/* Passport Photo + Profile Details */}
              <div className="flex gap-4 items-center">
                {/* Aadhaar Passport Photo */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-slate-100 relative">
                  <img 
                    src="/farmer_aadhaar_profile.jpg" 
                    alt="Farmer Aadhaar Passport Photo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-700 text-white text-[9px] font-black text-center py-0.5 uppercase tracking-wider">
                    {t.aadhaarPhotoTag}
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-1.5 text-xs flex-1">
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase">{t.farmerNameLabel}</div>
                    <div className="font-black text-slate-900 text-sm leading-tight">{farmerProfile.farmerName}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase">{t.aadhaarNumberLabel}</div>
                    <div className="font-mono font-black text-emerald-800 text-xs">{farmerProfile.aadhaarMasked}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase">{t.farmerRegistryId}</div>
                    <div className="font-mono font-bold text-slate-700 text-[11px]">{farmerProfile.farmerId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase">{t.villageDistrictLabel}</div>
                    <div className="font-bold text-slate-800 text-[11px]">{farmerProfile.village}</div>
                  </div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="bg-white border border-emerald-200 p-2.5 rounded-xl text-center text-[11px] font-black text-emerald-800 flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.biometricFooter}</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Main Experience Grid */}
      <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-6 sm:gap-8`}>
        
        {/* Left Column: Slot Booking Wizard */}
        <div className={`${isMobilePreview ? 'col-span-1' : 'lg:col-span-7'} space-y-6`}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-600/30">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {t.bookMandiSlotHeading}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">{t.bookMandiSlotSub}</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                {t.capacityAwareBadge}
              </span>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* 1. Real Crop Images Selection Cards */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                    {t.selectCropStep}
                  </label>
                  <span className="text-xs text-emerald-700 font-black">{t.govtMspRates}</span>
                </div>

                <div className={`grid grid-cols-2 ${isMobilePreview ? 'grid-cols-2' : 'sm:grid-cols-3 lg:grid-cols-5'} gap-2 sm:gap-3`}>
                  {Object.entries(mspRates).map(([key, crop]) => {
                    const isSelected = selectedCrop === key;
                    return (
                      <div
                        key={key}
                        onClick={() => setSelectedCrop(key)}
                        className={`cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative overflow-hidden group ${
                          isSelected
                            ? 'border-emerald-600 bg-gradient-to-b from-emerald-50 to-emerald-100/60 shadow-lg shadow-emerald-600/20 scale-[1.04]'
                            : 'border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md hover:scale-[1.02]'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-md">
                            ✓
                          </div>
                        )}

                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md my-1 group-hover:scale-105 transition-transform bg-slate-100">
                          <img 
                            src={crop.imgUrl} 
                            alt={crop.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mt-2 space-y-0.5 w-full">
                          <div className="text-xs font-black text-slate-900 leading-tight truncate">{crop.name}</div>
                          <div className="text-[11px] font-extrabold text-amber-700 font-mono">₹{crop.pricePerQuintal} / Q</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Quantity Input Card */}
              <div className={`bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4 items-center`}>
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                    {t.expectedQuantityLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={expectedQty}
                      onChange={(e) => setExpectedQty(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl p-3 text-base font-black text-slate-900 outline-none focus:border-emerald-600"
                    />
                    <span className="absolute right-3 top-3.5 text-xs text-slate-400 font-extrabold">Quintals</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
                  <div className="text-xs text-slate-500 font-bold">{t.estMspTotal}</div>
                  <div className="text-xl font-black text-emerald-800 font-mono">
                    ₹{estimatedTotalValue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-extrabold mt-0.5">Direct Transfer to Bank Account ****4821</div>
                </div>
              </div>

              {/* 3. Mandi Selector Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                  {t.chooseProcurementHub}
                </label>

                <div className="grid grid-cols-1 gap-3">
                  {mandis.map((m) => {
                    const isSelected = selectedMandiId === m.id;
                    const pct = Math.round((m.bookedQuintals / m.dailyCapacityQuintals) * 100);
                    const isFull = pct > 85;

                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMandiId(m.id)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-gradient-to-r from-emerald-50 to-white shadow-md'
                            : 'border-slate-200 bg-white hover:border-emerald-400'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-emerald-700" />
                              <h3 className="text-sm font-black text-slate-900">{m.name}</h3>
                              <span className="text-xs text-slate-500 font-bold">({m.distanceKm} km)</span>
                            </div>
                            <div className="text-xs text-slate-600 font-medium">
                              {m.district} • {t.avgMandiWaitTime}: <strong className="text-slate-900">{m.avgWaitMins} mins</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                              isFull 
                                ? 'bg-red-100 text-red-800 border-red-200' 
                                : pct > 60 
                                ? 'bg-amber-100 text-amber-800 border-amber-200' 
                                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            }`}>
                              {pct}% {t.capacityLabel} ({m.bookedQuintals}/{m.dailyCapacityQuintals} Q)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Smart Mandi Load Balancer Recommendation Banner */}
              {isOverbooked && (
                <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 space-y-3 shadow-md animate-slide-down">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-black text-amber-900 uppercase tracking-wide">
                        {t.loadBalancerAlertTitle} - {selectedMandi.name}
                      </h3>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        {selectedMandi.name} is currently at <strong>{capPercent}% capacity</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-amber-300 space-y-2">
                    <div className="flex items-center justify-between text-xs font-extrabold text-emerald-800">
                      <span className="flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-emerald-600" />
                        {t.recommendedAlternateHub}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        {t.recommendedTag}
                      </span>
                    </div>
                    <div className="text-sm font-black text-slate-900">{alternateMandi.name}</div>
                    <div className="text-xs text-slate-600 font-medium">
                      {t.alternateBenefit}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMandiId(alternateMandi.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>{t.switchHubBtn} {alternateMandi.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Date & Time Selection */}
              <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4`}>
                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                    {t.preferredDateLabel}
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                    {t.timeWindowLabel}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none focus:border-emerald-600"
                  >
                    <option value="08:00 AM - 09:30 AM">08:00 AM - 09:30 AM</option>
                    <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                    <option value="12:00 PM - 01:30 PM">12:00 PM - 01:30 PM</option>
                    <option value="02:30 PM - 04:00 PM">02:30 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Big Prominent Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base py-4 rounded-2xl transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.confirmSlotBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Queue Status Ticket */}
        <div className={`${isMobilePreview ? 'col-span-1' : 'lg:col-span-5'} space-y-6`}>
          
          {/* Digital Token Ticket */}
          <div className="ticket-card p-6 space-y-5">
            <div className="ticket-notch-left" />
            <div className="ticket-notch-right" />

            <div className="flex justify-between items-start border-b border-emerald-200 pb-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {t.officialMandiPass}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-2">
                  {activeBooking?.mandiName || selectedMandi.name}
                </h2>
                <div className="text-xs text-slate-500 font-bold">Date: {activeBooking?.bookingDate} ({activeBooking?.timeSlot})</div>
              </div>

              {/* Simulated QR Code */}
              <div className="w-14 h-14 bg-slate-900 p-1.5 rounded-xl text-white flex items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-emerald-400" />
              </div>
            </div>

            {/* Token ID Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/80 border-2 border-emerald-300 p-5 rounded-2xl text-center space-y-1 shadow-inner">
              <div className="text-xs text-emerald-900 font-black uppercase tracking-widest">
                {t.digitalTokenTicket}
              </div>
              <div className="text-3xl font-black text-emerald-800 font-mono tracking-wider">
                {activeBooking?.tokenId || "WHEAT-2026-A45"}
              </div>
            </div>

            {/* Live Queue Counters */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold text-[11px]">{t.currentlyServingLabel}</span>
                <div className="font-mono font-black text-amber-700 text-base">
                  {activeBooking?.currentServingToken || "WHEAT-2026-A33"}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold text-[11px]">{t.yourPositionLabel}</span>
                <div className="font-mono font-black text-emerald-800 text-base">
                  #{activeBooking?.queuePosition || 12} {t.inLine} (~{activeBooking?.estimatedWaitMins || 36} mins)
                </div>
              </div>
            </div>

            {/* Gate Arrival Action Button */}
            <div className="pt-2">
              {!activeBooking?.gateArrived ? (
                <button
                  onClick={onMarkArrived}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-sm py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-5 h-5" />
                  <span>{t.markArrivedBtnText}</span>
                </button>
              ) : (
                <div className="p-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 rounded-xl text-center font-extrabold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>{t.gateVerifiedBadge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Download Official Receipt Action Card (Farmer View) */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-white">{t.officialMandiReceiptTitle}</h3>
              </div>
              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{t.pdfReadyBadge}</span>
            </div>

            <p className="text-xs text-emerald-100 font-medium">
              {t.downloadPdfSub}
            </p>

            <button
              onClick={() => downloadProcurementPdfReceipt(activeBooking, farmerProfile)}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>{t.downloadPdfReceiptBtn}</span>
            </button>
          </div>

          {/* Grievance Desk Trigger */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-600 font-bold">{t.reportIssuePrompt}</span>
            <button
              onClick={() => setShowGrievanceModal(true)}
              className="text-amber-700 font-black hover:underline flex items-center gap-1"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t.reportIssueBtn}</span>
            </button>
          </div>
        </div>

      </div>

      {/* 8-Step Swiggy/Courier Style Order Status Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {t.procurementDbtStatusBar}
            </h2>
            <p className="text-xs text-slate-500 font-medium">{t.procurementDbtSub}</p>
          </div>
          <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full border border-amber-200">
            {t.stepProgress} {currentStep} {t.of8} {pipelineSteps[currentStep - 1]?.title}
          </span>
        </div>

        {/* Stepper Timeline */}
        <div className="overflow-x-auto py-2">
          <div className="min-w-[760px] flex items-center justify-between relative px-2">
            {pipelineSteps.map((s, idx) => {
              const isCompleted = s.key < currentStep;
              const isActive = s.key === currentStep;

              return (
                <div key={s.key} className="step-item text-center">
                  {idx < pipelineSteps.length - 1 && (
                    <div className={`step-connector ${s.key < currentStep ? 'completed' : 'upcoming'}`} />
                  )}
                  <div className={`step-circle ${isCompleted ? 'completed' : isActive ? 'active' : 'upcoming'}`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : s.key}
                  </div>
                  <div className="mt-2 space-y-0.5 max-w-[90px]">
                    <div className={`text-xs font-bold ${isActive ? 'text-amber-700 font-black' : isCompleted ? 'text-emerald-800' : 'text-slate-400'}`}>
                      {s.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium line-clamp-1">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Breakdown Cards */}
        <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'md:grid-cols-3'} gap-4 text-xs pt-2`}>
          
          {/* Card 1: Quality Check */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-900 text-sm">{t.qualityMoistureHeading}</span>
              {activeBooking?.qualityData ? <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">Grade A</span> : <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">{t.processingTag}</span>}
            </div>
            {activeBooking?.qualityData ? (
              <div className="space-y-1 text-slate-600 font-medium">
                <div>{t.moistureLabel} <strong className="text-slate-900">{activeBooking.qualityData.moisturePercent}%</strong> (Max 14%)</div>
                <div>{t.impurityLabel} <strong className="text-slate-900">{activeBooking.qualityData.foreignMatterPercent}%</strong></div>
                <div className="text-emerald-700 font-bold text-xs pt-1">{t.approvedFullMsp}</div>
              </div>
            ) : (
              <div className="text-slate-400 italic">{t.pendingInspectionDesc}</div>
            )}
          </div>

          {/* Card 2: Weighbridge */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-900 text-sm">{t.verifiedWeighmentHeading}</span>
              {activeBooking?.weighmentData ? <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-mono font-bold">{activeBooking.weighmentData.netQuintals} Quintals</span> : <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">{t.processingTag}</span>}
            </div>
            {activeBooking?.weighmentData ? (
              <div className="space-y-1 text-slate-600 font-medium">
                <div>{t.grossLabel} <strong className="text-slate-900">{activeBooking.weighmentData.grossKg.toLocaleString()} kg</strong></div>
                <div>{t.tareLabel} <strong className="text-slate-900">{activeBooking.weighmentData.tareKg.toLocaleString()} kg</strong></div>
                <div>{t.netLabel} <strong className="text-emerald-800 font-bold">{activeBooking.weighmentData.netKg.toLocaleString()} kg</strong></div>
              </div>
            ) : (
              <div className="text-slate-400 italic">{t.qualityWeighbridgeSub}</div>
            )}
          </div>

          {/* Card 3: Payment */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-900 text-sm">{t.dbtBankTransferHeading}</span>
              {currentStep >= 8 ? <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">{t.paidToBankTag}</span> : currentStep >= 7 ? <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">{t.processingTag}</span> : <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">{t.calculatedTag}</span>}
            </div>
            <div className="text-2xl font-black text-emerald-800 font-mono">
              ₹{((activeBooking?.weighmentData?.netQuintals || expectedQty) * currentMspRate).toLocaleString('en-IN')}
            </div>
            {currentStep >= 7 ? (
              <div className="text-xs text-slate-600 font-medium space-y-2">
                <div>Ref: <strong className="font-mono text-slate-900">{activeBooking?.mspDetails?.paymentRef}</strong></div>
                <div className="text-emerald-700 font-bold">{t.transferredViaDbt}</div>
                
                <button
                  onClick={() => downloadProcurementPdfReceipt(activeBooking, farmerProfile)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] py-2 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadPdfReceiptBtn}</span>
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-500 font-medium">Rate: ₹{currentMspRate}/Quintal • {t.aadhaarVerifiedDesc}</div>
            )}
          </div>

        </div>
      </div>

      {/* Grievance Modal */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-700 font-black text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>{t.reportIssueTitle}</span>
              </div>
              <button onClick={() => setShowGrievanceModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {grievanceSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-emerald-900 text-sm">{t.grievanceRegisteredTitle}</h4>
                <p className="text-xs text-emerald-800 font-medium">{t.grievanceSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-4 text-xs">
                <p className="text-slate-600 font-medium leading-relaxed">
                  {t.grievanceDesc}
                </p>

                <div>
                  <label className="block font-black text-slate-900 uppercase tracking-wider mb-1">{t.farmerTokenIdLabel}</label>
                  <input type="text" disabled value={`${farmerProfile.farmerId} | Token: ${activeBooking?.tokenId}`} className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-800 font-black" />
                </div>

                <div>
                  <label className="block font-black text-slate-900 uppercase tracking-wider mb-1">{t.describeIssueLabel}</label>
                  <textarea rows="3" required value={grievanceText} onChange={(e) => setGrievanceText(e.target.value)} placeholder={t.grievanceDesc} className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-slate-800 outline-none focus:border-amber-500" />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowGrievanceModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">{t.cancelBtn}</button>
                  <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-black">{t.submitGrievanceBtn}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
