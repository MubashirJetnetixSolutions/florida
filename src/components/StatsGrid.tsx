'use client';

import React from 'react';
import { ShoppingBag, CheckCircle2, AlertCircle, FilePlus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  barColor: string;
  barHeights: number[];
}

function StatCard({ title, value, icon, iconColor, iconBg, barColor, barHeights }: StatCardProps) {
  return (
    <div className="glass-card rounded-[24px] p-4 flex flex-col justify-between border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden min-w-0">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-7 h-7 rounded-lg bg-[#E5F2FF] text-[#3C7FEC] transition-transform duration-300 group-hover:scale-110 `}>
            {icon}
          </div>
          <div>


            <span className="text-[16px] font-normal text-[#0B1B34] tracking-tight truncate">{title}</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between mt-6">
        <div className='flex items-center justify-between w-full min-w-0 gap-2'>
          <span className="text-[32px] font-normal text-[#0B1B34] tracking-tight pt-2 shrink-0">{value}</span>
          {title === 'Active Orders' ?

            <svg className="w-[62px] h-[76px] shrink min-w-0" viewBox="0 0 82 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="6" height="12" rx="3" transform="matrix(-1 0 0 1 81.6001 84)" fill="#5897FF" /> <rect width="6" height="72" rx="3" transform="matrix(-1 0 0 1 70.8003 24)" fill="#5897FF" /> <rect width="6" height="40.2" rx="3" transform="matrix(-1 0 0 1 60.0005 55.8008)" fill="#5897FF" /> <rect width="6" height="60" rx="3" transform="matrix(-1 0 0 1 49.2002 36)" fill="#5897FF" /> <rect width="6" height="84" rx="3" transform="matrix(-1 0 0 1 38.4004 12)" fill="#5897FF" /> <rect width="6" height="48" rx="3" transform="matrix(-1 0 0 1 27.6001 48)" fill="#5897FF" /> <rect width="6" height="96" rx="3" transform="matrix(-1 0 0 1 16.8003 0)" fill="#5897FF" /> <rect width="6" height="24" rx="3" transform="matrix(-1 0 0 1 6.00049 72)" fill="#5897FF" /> </svg>
            : title === 'Completed' ?
              <svg className="w-[62px] h-[76px] shrink min-w-0" viewBox="0 0 82 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="6" height="12" rx="3" transform="matrix(-1 0 0 1 81.6001 84)" fill="#1DAAB8" /> <rect width="6" height="72" rx="3" transform="matrix(-1 0 0 1 70.8003 24)" fill="#1DAAB8" /> <rect width="6" height="40.2" rx="3" transform="matrix(-1 0 0 1 60.0005 55.8008)" fill="#1DAAB8" /> <rect width="6" height="60" rx="3" transform="matrix(-1 0 0 1 49.2002 36)" fill="#1DAAB8" /> <rect width="6" height="84" rx="3" transform="matrix(-1 0 0 1 38.4004 12)" fill="#1DAAB8" /> <rect width="6" height="48" rx="3" transform="matrix(-1 0 0 1 27.6001 48)" fill="#1DAAB8" /> <rect width="6" height="96" rx="3" transform="matrix(-1 0 0 1 16.8003 0)" fill="#1DAAB8" /> <rect width="6" height="24" rx="3" transform="matrix(-1 0 0 1 6.00049 72)" fill="#1DAAB8" /> </svg>
              : title === 'On Hold' ?
                <svg className="w-[62px] h-[76px] shrink min-w-0" viewBox="0 0 82 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="6" height="12" rx="3" transform="matrix(-1 0 0 1 81.6001 84)" fill="#8562F9" /> <rect width="6" height="72" rx="3" transform="matrix(-1 0 0 1 70.8003 24)" fill="#8562F9" /> <rect width="6" height="40.2" rx="3" transform="matrix(-1 0 0 1 60.0005 55.8008)" fill="#8562F9" /> <rect width="6" height="60" rx="3" transform="matrix(-1 0 0 1 49.2002 36)" fill="#8562F9" /> <rect width="6" height="84" rx="3" transform="matrix(-1 0 0 1 38.4004 12)" fill="#8562F9" /> <rect width="6" height="48" rx="3" transform="matrix(-1 0 0 1 27.6001 48)" fill="#8562F9" /> <rect width="6" height="96" rx="3" transform="matrix(-1 0 0 1 16.8003 0)" fill="#8562F9" /> <rect width="6" height="24" rx="3" transform="matrix(-1 0 0 1 6.00049 72)" fill="#8562F9" /> </svg>
                :
                <svg className="w-[62px] h-[76px] shrink min-w-0" viewBox="0 0 82 96" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="6" height="12" rx="3" transform="matrix(-1 0 0 1 81.6001 84)" fill="#12A150" /> <rect width="6" height="72" rx="3" transform="matrix(-1 0 0 1 70.8003 24)" fill="#12A150" /> <rect width="6" height="40.2" rx="3" transform="matrix(-1 0 0 1 60.0005 55.8008)" fill="#12A150" /> <rect width="6" height="60" rx="3" transform="matrix(-1 0 0 1 49.2002 36)" fill="#12A150" /> <rect width="6" height="84" rx="3" transform="matrix(-1 0 0 1 38.4004 12)" fill="#12A150" /> <rect width="6" height="48" rx="3" transform="matrix(-1 0 0 1 27.6001 48)" fill="#12A150" /> <rect width="6" height="96" rx="3" transform="matrix(-1 0 0 1 16.8003 0)" fill="#12A150" /> <rect width="6" height="24" rx="3" transform="matrix(-1 0 0 1 6.00049 72)" fill="#12A150" /> </svg>

          }

        </div>

        {/* Custom Mini SVG Sparkline Bars */}

      </div>
    </div>
  );
}

export default function StatsGrid() {
  const stats = [
    {
      title: 'Active Orders',
      value: '740K',
      icon: <ShoppingBag size={16} />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
      barColor: 'bg-gradient-to-t from-blue-500 to-blue-400',
      barHeights: [30, 45, 60, 90, 70, 100],
    },
    {
      title: 'Completed',
      value: '740K',
      icon: <CheckCircle2 size={16} />,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      barColor: 'bg-gradient-to-t from-emerald-500 to-emerald-400',
      barHeights: [40, 50, 75, 60, 85, 95],
    },
    {
      title: 'On Hold',
      value: '740K',
      icon: <AlertCircle size={16} />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
      barColor: 'bg-gradient-to-t from-purple-500 to-purple-400',
      barHeights: [30, 55, 45, 80, 65, 85],
    },
    {
      title: 'New Orders',
      value: '740K',
      icon: <FilePlus size={16} />,
      iconColor: 'text-teal-500',
      iconBg: 'bg-teal-50',
      barColor: 'bg-gradient-to-t from-teal-500 to-teal-400',
      barHeights: [25, 40, 60, 50, 80, 90],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 w-full">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
