'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function UpcomingOrders() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = ['Today', 'Tomorrow', 'This Week', 'This Month'];

  const slots = [
    {
      time: '02:00 am',
      items: [
        { title: 'Order #121548', subtitle: '12:00 PM' },
        { title: 'Order #121548', subtitle: '12:00 PM' }
      ]
    },
    {
      time: '08:00 am',
      items: [
        { title: 'Order #121548', subtitle: '12:00 PM' }
      ]
    },
    {
      time: '12:00 am',
      items: [
        { title: 'Order #121548', subtitle: '12:00 PM' }
      ]
    }
  ];

  return (
    <div className="glass-card rounded-[24px] p-6 border border-white/50 shadow-sm flex flex-col relative h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[17px] font-normal text-[#3F434D] ">Upcoming Orders</h3>

        {/* Dropdown Filter */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4 px-4 py-2 rounded-xl text-sm font-medium text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200"
          >
            {selectedDay}
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-slate-100 shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GMT Label */}
      <div className="border-t border-slate-100 pt-3 mb-3">
        <span className="text-xs font-medium text-slate-400">GMT + 5</span>
      </div>

      {/* Schedule Items Scroll Area */}
      <div className="flex-1 overflow-y-auto h-[250px] pr-1 scrollbar-none">
        {slots.map((slot, idx) => (
          <div key={idx} className="border-t border-slate-100 py-4 flex items-start gap-4">
            {/* Time */}
            <div className="w-[72px] shrink-0 pt-1">
              <span className="text-[13px] font-semibold text-slate-400">{slot.time}</span>
            </div>

            {/* Order Cards */}
            <div className="flex gap-2.5 flex-1 min-w-0">
              {slot.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`flex flex-col bg-accent-blue hover:bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/10 cursor-pointer transition-colors ${slot.items.length === 1 ? 'flex-1' : 'flex-1 min-w-0'
                    }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-xs text-white/70 font-medium mt-1">{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
