import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  IndianRupee, 
  Clock, 
  Users, 
  Map, 
  ShieldAlert, 
  Download
} from 'lucide-react';
import { translations } from '../data/i18n';
import { districtHeatmapData } from '../data/mockData';

export default function MinistryAnalytics({ lang, isMobilePreview }) {
  const t = translations[lang] || translations.en;

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto px-2">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {t.ministryGovernanceBadge}
              </span>
              <span className="text-emerald-300 text-xs font-mono">{t.liveHarvestSeason}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {t.analyticsHeader}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              {t.analyticsSub}
            </p>
          </div>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-3 rounded-2xl flex items-center gap-2 transition shadow-lg shrink-0 cursor-pointer">
            <Download className="w-4 h-4" />
            <span>{t.exportMinistryReport}</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards (4 Cards) */}
      <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4 sm:gap-5`}>
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-emerald-600">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>{t.metricProcured}</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            1,42,500 <span className="text-xs font-sans text-slate-500 font-bold">Q</span>
          </div>
          <div className="text-xs text-emerald-700 font-black flex items-center gap-1">
            <span>↑ 18.4% vs last harvest season</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-amber-500">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>{t.metricDisbursed}</span>
            <IndianRupee className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ₹324.2 <span className="text-xs font-sans text-slate-500 font-bold">Cr</span>
          </div>
          <div className="text-xs text-amber-700 font-black">
            96.2% credited within 24 hours
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-emerald-500">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>{t.metricWaitTime}</span>
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            28 <span className="text-xs font-sans text-slate-500 font-bold">Mins</span>
          </div>
          <div className="text-xs text-emerald-700 font-black">
            ↓ Reduced from 4.5 hrs baseline
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-2 border-l-8 border-l-sky-500">
          <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
            <span>{t.metricFarmersServed}</span>
            <Users className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            14,820 <span className="text-xs font-sans text-slate-500 font-bold">Farmers</span>
          </div>
          <div className="text-xs text-sky-700 font-black">
            Zero physical bottlenecks reported
          </div>
        </div>
      </div>

      {/* Statewide District Mandi Congestion Heatmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {t.districtHeatmapTitle}
              </h2>
              <span className="text-xs text-slate-500 font-medium">{t.districtHeatmapSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> {t.optimalTag}
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> {t.moderateTag}
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-red-500" /> {t.congestedTag}
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className={`grid grid-cols-1 ${isMobilePreview ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-5`}>
          {districtHeatmapData.map((d, idx) => {
            const isHigh = d.status === "Congested" || d.status === "High Demand";
            const isOptimal = d.status === "Optimal" || d.status === "Low Queue";
            const statusLabel = isHigh ? t.congestedTag : isOptimal ? t.optimalTag : t.moderateTag;

            return (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
                  isHigh ? 'bg-amber-50/60 border-amber-300' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">{d.district} District</h3>
                    <div className="text-xs text-slate-500 font-bold">{d.activeMandis} Mandi Procurement Hubs</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                    isHigh ? 'bg-amber-100 text-amber-900 border-amber-300' : isOptimal ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-sky-100 text-sky-900 border-sky-300'
                  }`}>
                    {statusLabel}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>{t.capacityLabel}</span>
                    <span className="font-black text-slate-900 font-mono">{d.avgCapacity}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        isHigh ? 'bg-amber-500' : isOptimal ? 'bg-emerald-600' : 'bg-sky-500'
                      }`}
                      style={{ width: d.avgCapacity }}
                    />
                  </div>

                  <div className="flex justify-between text-slate-600 pt-1 text-xs font-medium">
                    <span>{t.estWaitLabel} <strong className="text-slate-900 font-black">{d.waitTime}</strong></span>
                    <span>Procured: <strong className="text-emerald-800 font-mono font-black">{d.totalProcured}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Transparency & Delayed Payment Escalation Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {t.paymentTransparencyTitle}
              </h2>
              <span className="text-xs text-slate-500 font-medium">Auto-escalated grievance monitoring for payment delay &gt; 3 days</span>
            </div>
          </div>

          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-black border border-emerald-200">
            {t.autoFlaggedCases}
          </span>
        </div>

        {/* Table of Grievances */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider">
                <th className="p-3.5 rounded-l-xl">{t.grievanceIdCol}</th>
                <th className="p-3.5">{t.farmerNameIdCol}</th>
                <th className="p-3.5">{t.mandiLocationCol}</th>
                <th className="p-3.5">{t.mspAmountCol}</th>
                <th className="p-3.5">{t.delayReasonCol}</th>
                <th className="p-3.5 rounded-r-xl">{t.escalationStatusCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-black text-amber-700">#GRV-8821</td>
                <td className="p-3.5">
                  <div className="font-black text-slate-900">Rameshwar Patil</div>
                  <div className="text-[10px] text-slate-400 font-mono">MH-FARM-99421</div>
                </td>
                <td className="p-3.5 font-bold">Nashik APMC Main Mandi</td>
                <td className="p-3.5 font-mono font-black text-emerald-800">₹5,87,040</td>
                <td className="p-3.5 text-slate-600 font-medium">Bank IFSC clearance delay</td>
                <td className="p-3.5">
                  <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-black text-[11px]">Auto-Escalated to DAO Nashik</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-black text-emerald-700">#GRV-8794</td>
                <td className="p-3.5">
                  <div className="font-black text-slate-900">Ganesh Eknath Shinde</div>
                  <div className="text-[10px] text-slate-400 font-mono">MH-FARM-11048</div>
                </td>
                <td className="p-3.5 font-bold">Latur APMC Mandi</td>
                <td className="p-3.5 font-mono font-black text-emerald-800">₹3,42,000</td>
                <td className="p-3.5 text-slate-600 font-medium">7/12 record name mismatch resolved</td>
                <td className="p-3.5">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-black text-[11px]">✓ Resolved & Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
