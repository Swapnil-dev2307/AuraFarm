import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Smartphone, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sprout, 
  Lock, 
  Sparkles,
  TrendingUp,
  IndianRupee,
  Clock,
  Users,
  MapPin,
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Compass,
  Building,
  Calculator,
  CloudSun,
  Quote,
  Award,
  Zap,
  Percent,
  Check
} from 'lucide-react';
import { translations } from '../data/i18n';
import { mspRates, initialMandis } from '../data/mockData';

export default function LoginPortal({ onFarmerLogin, onStaffLogin, lang }) {
  const t = translations[lang] || translations.en;
  
  const [activeTab, setActiveTab] = useState('farmer'); // 'farmer' | 'staff'

  // Farmer Form State
  const [aadhaarNumber, setAadhaarNumber] = useState('9942 8821 4012');
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  // Staff Form State
  const [staffId, setStaffId] = useState('FCI-KHN-402');
  const [mandiBranch, setMandiBranch] = useState('Khanna Main Grain Mandi');
  const [password, setPassword] = useState('••••••••');
  const [targetRole, setTargetRole] = useState('staff');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // MSP Calculator State
  const [calcCrop, setCalcCrop] = useState('wheat');
  const [calcQuintals, setCalcQuintals] = useState(60);

  // Crop MSP Prices lookup
  const cropPrices = {
    wheat: { name: '🌾 Wheat (Kanak)', rate: 2275, traderRate: 1950 },
    paddy: { name: '🌾 Paddy Grade A (Paddy)', rate: 2300, traderRate: 1980 },
    mustard: { name: '🌻 Mustard (Sarson)', rate: 5650, traderRate: 4900 },
    gram: { name: '🫘 Gram (Chana)', rate: 5440, traderRate: 4750 },
    pulses: { name: '🫘 Pulses (Moong/Urad)', rate: 6425, traderRate: 5700 },
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setOtpError('Please enter a valid 10-digit Aadhaar-linked mobile number.');
      return;
    }
    setOtpError('');
    setOtpSent(true);
    setOtpCode('1234');
  };

  const handleFarmerAuth = (e) => {
    e.preventDefault();
    if (otpCode !== '1234' && otpCode.length !== 4) {
      setOtpError('Invalid OTP code. Please enter 1234.');
      return;
    }
    onFarmerLogin({
      farmerName: 'Gurpreet Singh',
      aadhaarMasked: `XXXX-XXXX-${aadhaarNumber.slice(-4)}`,
      mobile: mobileNumber
    });
  };

  const handleStaffAuth = (e) => {
    e.preventDefault();
    onStaffLogin({
      staffId,
      mandiBranch,
      targetRole
    });
  };

  const faqs = [
    {
      q: "How does Direct Benefit Transfer (DBT) credit MSP payment to my bank account?",
      a: "Upon completion of moisture grading and electronic weighment at the Mandi, the system auto-calculates the MSP bill and dispatches DBT funds via PFMS directly to your Aadhaar-linked bank account within 24 hours."
    },
    {
      q: "What if my primary Mandi is overbooked on my harvest date?",
      a: "AuraFarm's smart capacity load balancer automatically suggests nearby alternate procurement hubs with open slots, lower wait times, and free tractor parking."
    },
    {
      q: "Can I book a procurement slot using a basic keypad phone without internet?",
      a: "Yes! Farmers can dial our toll-free helpline 1800-180-1551 for automated IVR booking, send SMS 'BOOK <Aadhaar>' to 56767, or dial USSD code *99*456#."
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-12 max-w-7xl mx-auto px-2">
      
      {/* 1. Live MSP Ticker Bar */}
      <div className="bg-emerald-900 text-white rounded-2xl p-3 shadow-md flex items-center gap-3 overflow-x-auto text-xs">
        <span className="bg-emerald-700 text-emerald-100 font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
          <span>GOVT MSP 2026 RATES</span>
        </span>
        <div className="flex items-center gap-6 font-semibold shrink-0">
          <span>🌾 Wheat: <strong className="text-amber-300">₹2,275/Q</strong></span>
          <span>🌾 Paddy Grade A: <strong className="text-amber-300">₹2,300/Q</strong></span>
          <span>🌻 Mustard: <strong className="text-amber-300">₹5,650/Q</strong></span>
          <span>🫘 Gram: <strong className="text-amber-300">₹5,440/Q</strong></span>
          <span>🫘 Pulses: <strong className="text-amber-300">₹6,425/Q</strong></span>
        </div>
      </div>

      {/* 2. Hero Login Section with Liquid Glass Display over Sunrise Backdrop */}
      <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 rounded-[40px] overflow-hidden shadow-2xl border border-white/60">
        
        {/* Background Image of Golden Wheat Sunrise Landscape */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/login_bg_scenic.jpg" 
            alt="Golden Wheat Fields Sunrise Landscape" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-900/30" />
        </div>

        {/* macOS Liquid Glass Specular Card Container */}
        <div className="relative z-10 max-w-4xl w-full bg-white/20 backdrop-blur-3xl rounded-[36px] border-2 border-white/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden grid grid-cols-1 md:grid-cols-12 ring-1 ring-white/40">
          
          {/* Left Side: macOS Liquid Emerald Column (5 Cols) */}
          <div className="md:col-span-5 bg-emerald-950/40 backdrop-blur-3xl text-white p-8 flex flex-col justify-between relative border-r border-white/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-xl flex items-center justify-center text-white font-black shadow-xl border border-white/50">
                  <Sprout className="w-7 h-7 text-emerald-300" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white drop-shadow-md">{t.portalTitle}</h1>
                  <p className="text-xs text-emerald-100 font-bold drop-shadow">National MSP Procurement Portal</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start gap-3 bg-white/15 backdrop-blur-2xl p-4 rounded-2xl border border-white/30 shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-white drop-shadow">UIDAI Aadhaar Verified</div>
                    <div className="text-emerald-100 text-[11px] font-semibold mt-0.5 leading-relaxed drop-shadow-sm">Direct e-KYC integration with linked bank account for instant payouts.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/15 backdrop-blur-2xl p-4 rounded-2xl border border-white/30 shadow-lg">
                  <Smartphone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-white drop-shadow">SMS Queue Pass</div>
                    <div className="text-emerald-100 text-[11px] font-semibold mt-0.5 leading-relaxed drop-shadow-sm">Real-time digital token updates dispatches to mobile phone.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-emerald-100 font-bold border-t border-white/20 mt-6 drop-shadow">
              Government of India • Ministry of Consumer Affairs, Food & Public Distribution
            </div>
          </div>

          {/* Right Side: macOS Liquid Ice Glass Form (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-center bg-white/35 backdrop-blur-3xl">
            
            {/* Top Liquid Role Selector Tabs */}
            <div className="bg-slate-900/20 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/40 flex gap-2 shadow-inner">
              <button
                onClick={() => { setActiveTab('farmer'); setOtpSent(false); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'farmer'
                    ? 'bg-white/80 backdrop-blur-xl text-emerald-950 shadow-xl border border-white/90 scale-[1.02]'
                    : 'text-slate-900 font-bold hover:bg-white/30'
                }`}
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>Farmer Login</span>
              </button>

              <button
                onClick={() => setActiveTab('staff')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'staff'
                    ? 'bg-white/80 backdrop-blur-xl text-emerald-950 shadow-xl border border-white/90 scale-[1.02]'
                    : 'text-slate-900 font-bold hover:bg-white/30'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Admin / Staff Login</span>
              </button>
            </div>

            {/* TAB 1: FARMER LOGIN FORM */}
            {activeTab === 'farmer' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="text-xl font-black text-slate-950 drop-shadow-sm">
                    Farmer Aadhaar Authentication
                  </h2>
                  <p className="text-xs text-slate-900 font-extrabold">Enter your 12-digit Aadhaar number and registered mobile number</p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5 drop-shadow-sm">
                        12-Digit Aadhaar Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={14}
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(e.target.value)}
                          placeholder="e.g. 9942 8821 4012"
                          className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-xl p-3.5 font-mono font-black text-slate-950 outline-none focus:border-emerald-600 focus:bg-white/70 text-sm shadow-inner placeholder-slate-700"
                        />
                        <ShieldCheck className="absolute right-3.5 top-3.5 w-5 h-5 text-emerald-700" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5 drop-shadow-sm">
                        Aadhaar-Linked Mobile Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          maxLength={13}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-xl p-3.5 font-mono font-black text-slate-950 outline-none focus:border-emerald-600 focus:bg-white/70 text-sm shadow-inner placeholder-slate-700"
                        />
                        <Smartphone className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-700" />
                      </div>
                      <span className="text-[10px] text-slate-950 font-black mt-1 block drop-shadow-sm">
                        * OTP verification SMS will be dispatched to this mobile number
                      </span>
                    </div>

                    {otpError && (
                      <div className="p-3 bg-red-500/20 backdrop-blur-md border border-red-400 rounded-xl text-red-950 text-xs font-black">
                        {otpError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-emerald-600/90 hover:bg-emerald-700 backdrop-blur-md text-white font-black text-sm py-4 rounded-xl transition shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                    >
                      <span>Send Verification OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* Step 2: OTP Verification Form */
                  <form onSubmit={handleFarmerAuth} className="space-y-4 text-xs animate-fade-in">
                    <div className="bg-emerald-50/80 backdrop-blur-xl border border-emerald-300 p-4 rounded-2xl text-emerald-950 space-y-1 shadow-md">
                      <div className="font-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>OTP Sent to {mobileNumber}</span>
                      </div>
                      <div className="text-[11px] text-emerald-900 font-bold">Test Demo OTP: Enter <strong className="font-mono font-black">1234</strong> below.</div>
                    </div>

                    <div>
                      <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5">
                        Enter 4-Digit One-Time Password (OTP)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="1234"
                        className="w-full bg-white/60 backdrop-blur-xl border-2 border-emerald-600 rounded-xl p-3.5 font-mono font-black text-center text-2xl text-emerald-950 outline-none tracking-widest shadow-inner"
                      />
                    </div>

                    {otpError && (
                      <div className="p-3 bg-red-500/20 backdrop-blur border border-red-400 rounded-xl text-red-950 text-xs font-black">
                        {otpError}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="px-4 py-3.5 bg-white/50 backdrop-blur-md text-slate-900 rounded-xl font-black hover:bg-white/80"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-4 rounded-xl transition shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Verify & Enter Farmer Portal</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: ADMIN / STAFF LOGIN FORM */}
            {activeTab === 'staff' && (
              <form onSubmit={handleStaffAuth} className="space-y-4 text-xs animate-fade-in">
                <div>
                  <h2 className="text-xl font-black text-slate-950 drop-shadow-sm">
                    Mandi Staff & Government Admin Authentication
                  </h2>
                  <p className="text-xs text-slate-900 font-extrabold">Enter your FCI / State Agriculture Operator Credentials</p>
                </div>

                <div>
                  <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5">
                    Official Staff / Operator ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="e.g. FCI-KHN-402"
                      className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-xl p-3.5 font-mono font-black text-slate-950 outline-none focus:border-emerald-600 focus:bg-white/70 shadow-inner"
                    />
                    <Building2 className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-700" />
                  </div>
                </div>

                <div>
                  <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5">
                    Assigned Mandi Hub / Branch
                  </label>
                  <select
                    value={mandiBranch}
                    onChange={(e) => setMandiBranch(e.target.value)}
                    className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-xl p-3.5 font-black text-slate-950 outline-none focus:border-emerald-600 focus:bg-white/70 shadow-inner"
                  >
                    <option value="Khanna Main Grain Mandi">Khanna Main Grain Mandi (Ludhiana)</option>
                    <option value="Samrala Regional Hub">Samrala Regional Hub (Ludhiana)</option>
                    <option value="Karnal Central FCI Mandi">Karnal Central FCI Mandi (Haryana)</option>
                    <option value="Panipat Model Agri Mandi">Panipat Model Agri Mandi (Haryana)</option>
                    <option value="Bathinda APMC">Bathinda APMC (Punjab)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5">
                    Operator Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-xl p-3.5 font-mono font-black text-slate-950 outline-none focus:border-emerald-600 focus:bg-white/70 shadow-inner"
                    />
                    <Lock className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-700" />
                  </div>
                </div>

                <div>
                  <label className="block font-black text-slate-950 uppercase tracking-wider mb-1.5">
                    Select Landing Terminal
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetRole('staff')}
                      className={`p-3.5 rounded-xl border-2 font-black text-left transition flex items-center justify-between ${
                        targetRole === 'staff'
                          ? 'border-emerald-600 bg-white/80 backdrop-blur-xl text-emerald-950 shadow-md'
                          : 'border-white/60 bg-white/35 backdrop-blur-md text-slate-900'
                      }`}
                    >
                      <span>Mandi Operator Desk</span>
                      {targetRole === 'staff' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetRole('analytics')}
                      className={`p-3.5 rounded-xl border-2 font-black text-left transition flex items-center justify-between ${
                        targetRole === 'analytics'
                          ? 'border-emerald-600 bg-white/80 backdrop-blur-xl text-emerald-950 shadow-md'
                          : 'border-white/60 bg-white/35 backdrop-blur-md text-slate-900'
                      }`}
                    >
                      <span>Ministry Analytics</span>
                      {targetRole === 'analytics' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-black text-white font-black text-sm py-4 rounded-xl transition shadow-2xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Authenticate & Enter Staff Terminal</span>
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* 3. National Impact Metrics Section */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            SEASON STATISTICS
          </span>
          <h2 className="text-2xl font-black text-slate-900">National MSP Procurement Highlights</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time throughput metrics across FCI & state Mandi hubs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-emerald-600">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
              <span>Grain Procured Today</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              1,42,500 <span className="text-xs font-sans text-slate-500 font-bold">Quintals</span>
            </div>
            <div className="text-xs text-emerald-700 font-black">↑ 18.4% vs last harvest</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-amber-500">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
              <span>MSP Disbursed (DBT)</span>
              <IndianRupee className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              ₹324.2 <span className="text-xs font-sans text-slate-500 font-bold">Crores</span>
            </div>
            <div className="text-xs text-amber-700 font-black">96.2% paid in 24 hours</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-emerald-500">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
              <span>Avg Mandi Wait Time</span>
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              28 <span className="text-xs font-sans text-slate-500 font-bold">Mins</span>
            </div>
            <div className="text-xs text-emerald-700 font-black">↓ Down from 4.5 hrs</div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-sky-500">
            <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
              <span>Farmers Served Today</span>
              <Users className="w-5 h-5 text-sky-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 font-mono">
              14,820 <span className="text-xs font-sans text-slate-500 font-bold">Farmers</span>
            </div>
            <div className="text-xs text-sky-700 font-black">Zero gate congestion</div>
          </div>
        </div>
      </div>

      {/* 4. How It Works - 4 Easy Steps */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="text-center space-y-1">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
            SIMPLE WORKFLOW
          </span>
          <h2 className="text-2xl font-black text-slate-900">How AuraFarm Works for Farmers</h2>
          <p className="text-xs text-slate-500 font-medium">4 seamless steps from Aadhaar login to direct bank credit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg">
              1
            </div>
            <h3 className="font-black text-slate-900 text-sm">Aadhaar & Mobile Auth</h3>
            <p className="text-xs text-slate-600 font-medium">Log in with your 12-digit Aadhaar & mobile number via instant OTP verification.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg">
              2
            </div>
            <h3 className="font-black text-slate-900 text-sm">Reserve Procurement Slot</h3>
            <p className="text-xs text-slate-600 font-medium">Choose your harvest crop, quantity, date, and preferred Mandi hub with live capacity meters.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg">
              3
            </div>
            <h3 className="font-black text-slate-900 text-sm">Receive Digital Queue Token</h3>
            <p className="text-xs text-slate-600 font-medium">Get a digital queue pass ticket on screen and real-time SMS alerts dispatched to your phone.</p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg">
              4
            </div>
            <h3 className="font-black text-slate-900 text-sm">Weigh & Get Direct Bank Credit</h3>
            <p className="text-xs text-slate-600 font-medium">Pass moisture check, complete tractor weighment, and receive 100% MSP payment via DBT in 24h.</p>
          </div>
        </div>
      </div>

      {/* 5. Live Mandi Queue Density Checker Widget */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-black text-slate-900">
                Live Mandi Capacity & Queue Density Checker
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Check Mandi availability and wait times live before booking your slot</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
            LIVE MONITORING
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {initialMandis.slice(0, 3).map((m) => {
            const pct = Math.round((m.bookedQuintals / m.dailyCapacityQuintals) * 100);
            const isFull = pct > 85;

            return (
              <div key={m.id} className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">{m.name}</h3>
                    <div className="text-xs text-slate-500 font-medium">{m.district} • {m.distanceKm} km</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    isFull ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {pct}% Full
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Capacity:</span>
                    <span className="font-mono text-slate-900">{m.bookedQuintals} / {m.dailyCapacityQuintals} Q</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isFull ? 'bg-red-500' : 'bg-emerald-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 font-bold pt-1">
                    Estimated Wait: <strong className="text-slate-900">{m.avgWaitMins} mins</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Interactive MSP Payout & Distress Sale Protection Calculator */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 shadow-2xl border border-emerald-500/30 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>FARMER PAYOUT CALCULATOR</span>
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-2">
              Estimate Guaranteed MSP Earnings & Savings
            </h2>
            <p className="text-xs text-emerald-200 font-medium">
              Compare official government guaranteed MSP pricing against unorganized trader distress rates
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-right shrink-0">
            <div className="text-[10px] text-emerald-300 font-extrabold uppercase">DBT Processing Time</div>
            <div className="text-sm font-black text-amber-300 flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" /> Direct Transfer &lt; 24h
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pt-2">
          
          {/* Left Column: Crop Selection & Quantity Slider (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Crop Pills */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-emerald-200 mb-2">
                Select Harvest Crop:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(cropPrices).map(([key, crop]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCalcCrop(key)}
                    className={`p-3 rounded-2xl text-xs font-black transition-all flex items-center justify-between border cursor-pointer ${
                      calcCrop === key
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg scale-[1.02]'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                    }`}
                  >
                    <span>{crop.name.split(' ')[0]} {crop.name.split(' ')[1]}</span>
                    <span className="font-mono text-[11px] opacity-90">₹{crop.rate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Yield Slider */}
            <div className="space-y-3 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15">
              <div className="flex justify-between items-center text-xs">
                <label className="font-black uppercase tracking-wider text-emerald-200">
                  Estimated Harvest Volume (Quintals):
                </label>
                <span className="bg-amber-400 text-slate-950 font-black font-mono text-sm px-3 py-1 rounded-xl shadow">
                  {calcQuintals} Quintals ({Math.round(calcQuintals * 2)} Bags)
                </span>
              </div>

              <input 
                type="range"
                min={10}
                max={500}
                step={5}
                value={calcQuintals}
                onChange={(e) => setCalcQuintals(Number(e.target.value))}
                className="w-full h-3 bg-emerald-950/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] text-emerald-200/80 font-bold pt-1">
                <span>10 Q (Small Farm)</span>
                <span>100 Q (Tractor Trolley)</span>
                <span>500 Q (Bulk Harvest)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Payout Card (5 cols) */}
          <div className="lg:col-span-5 bg-white/15 backdrop-blur-2xl p-6 rounded-3xl border-2 border-amber-400/60 shadow-2xl space-y-5 text-white">
            
            <div className="space-y-1">
              <div className="text-[11px] text-emerald-200 font-extrabold uppercase tracking-wider">
                Guaranteed Government Payout
              </div>
              <div className="text-3xl font-black text-amber-300 font-mono tracking-tight flex items-baseline gap-1">
                ₹{(calcQuintals * cropPrices[calcCrop].rate).toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-100 font-medium">
                Calculated at official Govt MSP rate of ₹{cropPrices[calcCrop].rate}/Quintal
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-emerald-200 font-bold">Unorganized Trader Rate:</span>
                <span className="font-mono text-slate-300 line-through">₹{(calcQuintals * cropPrices[calcCrop].traderRate).toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-emerald-500/30 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-400/40 text-xs font-black flex items-center justify-between text-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Protected Middleman Savings:</span>
                </div>
                <span className="text-amber-300 font-mono text-sm">+₹{(calcQuintals * (cropPrices[calcCrop].rate - cropPrices[calcCrop].traderRate)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="text-[11px] text-emerald-100/90 font-medium leading-relaxed bg-black/20 p-3 rounded-xl border border-white/10">
              ✨ 100% Direct Benefit Transfer (DBT) credited directly into your Aadhaar-linked bank account within 24 hours of weighment. Zero commission deductions!
            </div>
          </div>

        </div>
      </div>

      {/* 7. Verified Farmer Success Stories & DBT Proof */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="text-center space-y-1">
          <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
            REAL FARMER EXPERIENCES
          </span>
          <h2 className="text-2xl font-black text-slate-900">Verified Direct Benefit Transfer (DBT) Stories</h2>
          <p className="text-xs text-slate-500 font-medium">Hear from farmers who experienced zero mandi line waiting and instant payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed italic">
                "Booked my slot at 8 AM from mobile. Reached Khanna Mandi at 10 AM, completed moisture test by 10:30 AM. ₹1,36,500 was credited directly to my SBI account by next morning!"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <img src="/farmer_aadhaar_profile.jpg" alt="Farmer Sardar Gurpreet Singh" className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow" />
              <div>
                <div className="font-black text-slate-900 text-xs">Sardar Gurpreet Singh</div>
                <div className="text-[11px] text-slate-500 font-medium">Ludhiana, Punjab • 60 Q Wheat</div>
                <div className="text-[10px] text-emerald-700 font-black flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Aadhaar DBT Verified
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed italic">
                "In previous years, I had to sleep overnight in my tractor trolley outside the Mandi gate. With AuraFarm digital queue token, my total wait time was only 25 minutes!"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white font-black text-lg flex items-center justify-center border-2 border-amber-700 shadow">
                RS
              </div>
              <div>
                <div className="font-black text-slate-900 text-xs">Rameshwar Sharma</div>
                <div className="text-[11px] text-slate-500 font-medium">Karnal, Haryana • 85 Q Paddy</div>
                <div className="text-[10px] text-emerald-700 font-black flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Aadhaar DBT Verified
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed italic">
                "I don't have a smartphone, but I received SMS updates on my basic phone. When the Mandi staff scanned my receipt QR code, everything was fast and transparent."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-black text-lg flex items-center justify-center border-2 border-emerald-800 shadow">
                BK
              </div>
              <div>
                <div className="font-black text-slate-900 text-xs">Baljit Kaur</div>
                <div className="text-[11px] text-slate-500 font-medium">Bathinda, Punjab • 45 Q Mustard</div>
                <div className="text-[10px] text-emerald-700 font-black flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Aadhaar DBT Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FAQ & Government Helpline Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: FAQ Accordion (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-black text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left font-black text-slate-900 text-xs flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="p-4 text-xs text-slate-600 font-medium leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Government Helpline & Offline Channels (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              24/7 FARMER ASSISTANCE
            </span>
            <h2 className="text-xl font-black tracking-tight">Government Helpline & Offline Channels</h2>
            <p className="text-xs text-emerald-100 font-medium">Free support for non-smartphone users & USSD booking</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <div className="font-extrabold text-amber-300 flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>Toll-Free Helpline: 1800-180-1551</span>
              </div>
              <div className="text-emerald-100 text-[11px]">Dial anytime for IVR automated slot booking in Hindi/Punjabi/English.</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
              <div className="font-extrabold text-emerald-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>SMS Booking: Send 'BOOK &lt;Aadhaar&gt;' to 56767</span>
              </div>
              <div className="text-emerald-100 text-[11px]">Receive slot confirmation and digital token pass directly on basic keypad phones.</div>
            </div>
          </div>
        </div>

      </div>

      {/* 9. Official Trust & Integration Badges Footer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-4 border border-slate-800 text-center">
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Integrated with Official Government Agriculture & Financial Infrastructure
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-black text-slate-300">
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>UIDAI Aadhaar e-KYC</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>PFMS Direct Benefit Transfer</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Building className="w-4 h-4 text-sky-400" />
            <span>Food Corporation of India (FCI)</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>e-NAM National Agri Market</span>
          </div>
        </div>
      </div>

    </div>
  );
}
