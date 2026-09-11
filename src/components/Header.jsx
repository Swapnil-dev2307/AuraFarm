import React from 'react';
import { 
  Sprout, 
  Building2, 
  BarChart3, 
  User, 
  Globe, 
  PhoneCall, 
  MessageSquareText, 
  ShieldCheck, 
  Smartphone,
  Monitor,
  LogOut
} from 'lucide-react';
import { translations } from '../data/i18n';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  lang, 
  setLang, 
  smsCount, 
  toggleSmsDrawer,
  toggleUssdModal,
  isMobilePreview,
  setIsMobilePreview,
  authenticatedUser,
  onLogout
}) {
  const t = translations[lang] || translations.en;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-ux">
      {/* Top Thin Govt & Helpline Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-200">{t.govtDept}</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleUssdModal} 
            className="hover:underline flex items-center gap-1.5 text-amber-300 font-semibold bg-slate-800 px-2 py-0.5 rounded text-[11px] transition"
          >
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span>{t.ussdIVR}</span>
          </button>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden sm:inline font-mono text-emerald-300">{t.hotline}</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Sprout className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                {t.portalTitle}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                {t.mspProcurementBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Center Role Navigation Switcher Pills (If Authenticated) */}
        {authenticatedUser ? (
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 self-start md:self-auto shadow-inner">
            {authenticatedUser.userType === 'farmer' ? (
              <button
                onClick={() => setCurrentRole('farmer')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-white text-emerald-800 shadow-md border border-slate-200"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>{t.farmerView}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCurrentRole('staff')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-ux ${
                    currentRole === 'staff'
                      ? 'bg-white text-emerald-800 shadow-md border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.staffView}</span>
                </button>

                <button
                  onClick={() => setCurrentRole('analytics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-ux ${
                    currentRole === 'analytics'
                      ? 'bg-white text-emerald-800 shadow-md border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>{t.analyticsView}</span>
                </button>
              </>
            )}
          </div>
        ) : null}

        {/* Right Tools: Language Picker, Mobile Frame Toggle & Logout/Session Info */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Preview Frame Switcher */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
              isMobilePreview
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Smartphone Preview Frame for testing Farmer Mobile UX"
          >
            {isMobilePreview ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMobilePreview ? t.mobileMode : t.desktopGrid}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs shadow-sm">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer pr-1 text-xs"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          {/* SMS Logs Drawer Button */}
          <button
            onClick={toggleSmsDrawer}
            className="relative flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm"
          >
            <MessageSquareText className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">{t.smsLogs}</span>
            {smsCount > 0 && (
              <span className="bg-emerald-600 text-white font-mono text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {smsCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          {authenticatedUser && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 border border-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
              title="Log out and return to Login Screen"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.logOut}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
