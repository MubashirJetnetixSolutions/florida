'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GaugeChartInner = dynamic(() => import('./CompletionRateChart'), { ssr: false });

export default function CompletionRate() {
  return (
    <div className="glass-card rounded-[24px] p-6 border border-white/50 shadow-sm flex flex-col justify-between h-[340px]">
      <div>
        <h3 className="text-sm font-normal text-[#3F434D] tracking-tight">Completion Rate</h3>
      </div>

      {/* Chart container */}
      <div className="flex-1 flex items-center justify-center">
        <GaugeChartInner />
      </div>

      {/* Grid values under gauge */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-[#F0F4FA] rounded-xl py-3 px-4 space-y-1">
          <span className="text-xs font-medium text-slate-400 block">Active</span>
          <span className="text-xl font-bold text-slate-900">168</span>
        </div>
        <div className="bg-[#F0F4FA] rounded-xl py-3 px-4 space-y-1">
          <span className="text-xs font-medium text-slate-400 block">Completed</span>
          <span className="text-xl font-bold text-slate-900">100</span>
        </div>
      </div>
    </div>
  );
}
