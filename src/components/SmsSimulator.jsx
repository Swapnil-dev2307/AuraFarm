import React from 'react';
import { MessageSquareText, X, PhoneCall, CheckCheck, Smartphone } from 'lucide-react';
import { translations } from '../data/i18n';

export function SmsDrawer({ isOpen, onClose, smsLogs, lang }) {
  if (!isOpen) return null;
  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-down">
      {/* Drawer Header */}
      <div className="p-4 bg-emerald-800 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-5 h-5 text-emerald-300" />
          <div>
            <h3 className="font-extrabold text-sm leading-snug">{t.smsSimTitle}</h3>
            <p className="text-[10px] text-emerald-200">{t.smsSub}</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="text-emerald-200 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* SMS Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {smsLogs.map((sms) => (
          <div 
            key={sms.id} 
            className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-1.5 shadow-sm animate-fade-in"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-mono">
                <Smartphone className="w-3.5 h-3.5" />
                {sms.recipient}
              </span>
              <span>{sms.timestamp}</span>
            </div>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {sms.message}
            </p>
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-0.5 justify-end">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Delivered via Indian SMS Gateway</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500 font-medium">
        Ensuring 100% accessibility for non-smartphone feature phones via SMS & USSD.
      </div>
    </div>
  );
}

export function UssdModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;
  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
            <PhoneCall className="w-4 h-4 text-amber-600" />
            <span>Feature Phone Offline USSD (*99*456#)</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
        </div>

        <div className="bg-slate-900 text-emerald-400 font-mono p-4 rounded-xl space-y-2 text-xs shadow-inner">
          <div className="text-slate-400 text-[10px] font-sans border-b border-slate-800 pb-1">
            USSD Screen Mock (Dial *99*456#)
          </div>
          <div>Welcome to AuraFarm MSP Portal:</div>
          <div>1. Book Mandi Slot</div>
          <div>2. Check Token Queue Position</div>
          <div>3. Check DBT Payment Status</div>
          <div>4. Contact Mandi Administrator</div>
          <div className="text-amber-300 font-bold pt-2">Enter Option [1-4]: _</div>
        </div>

        <div className="text-xs text-slate-600 space-y-1">
          <div className="font-bold text-slate-800">IVR Automated Voice Booking:</div>
          <div className="text-[11px]">Dial <span className="font-mono font-bold text-emerald-800">1800-180-1551</span> from any basic keypad phone. Select language (Hindi/Punjabi/English) and follow interactive voice prompts.</div>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary justify-center text-xs"
        >
          Close USSD Guide
        </button>
      </div>
    </div>
  );
}
