'use client';

import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';

interface TimelineAttachment {
  name: string;
  type: 'pdf' | 'excel';
  label: string;
}

interface TimelineInvoice {
  label: string;
  code: string;
}

interface TimelineAvatar {
  initials: string;
  name: string;
  color: string;
}

interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  time: string;
  avatar?: TimelineAvatar;
  attachment?: TimelineAttachment;
  invoice?: TimelineInvoice;
  isLast?: boolean;
}

function TimelineItem({ number, title, description, time, avatar, attachment, invoice, isLast }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-2">
      {/* Left: Number + Line */}
      <div className="flex flex-col items-center shrink-0">
        <span className="text-[13px] font-normal text-[#9CA3AF] w-6 text-right">{number}</span>
        {!isLast && (
          <div className="w-[2px] bg-accent-blue/20 flex-1 mt-2 rounded-full" />
        )}
      </div>

      {/* Right: Content */}
      <div className={`flex-1 min-w-0 -mt-0.5 space-y-2 ${number === '05' ? 'bg-[#F0F1FA] p-3 rounded-[8px]' : ''}`}>
        {/* Title */}
        <h4 className="text-[15px] font-normal text-[#1F2937] leading-snug">{title}</h4>

        {/* Description */}
        <p className="text-[13px] text-[#4B5563] leading-relaxed">{description}</p>

        {/* Avatar */}
        {avatar && (
          <div className="flex items-center gap-2 pt-0.5">
            <div
              className="w-6 h-6 bg-[#D3E1FD] rounded-full flex items-center justify-center text-[9px] font-normal text-[#286CD1]"

            >
              {avatar.initials}
            </div>
            <span className="text-[13px] font-normal text-[#286CD1]">{avatar.name}</span>
          </div>
        )}

        {/* Attachment Card */}
        {attachment && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 max-w-xs">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-normal text-[#1F2937]">{attachment.name}</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">{attachment.label}</p>
            </div>
            <div className="shrink-0">
              {attachment.type === 'pdf' ? (
                <svg width="43" height="48" viewBox="0 0 43 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_188_16937)"> <path d="M7 4C7 1.79086 8.79086 0 11 0H27C27.3201 0 27.6272 0.127177 27.8536 0.353553L38.6464 11.1464C38.8728 11.3728 39 11.6799 39 12V36C39 38.2091 37.2091 40 35 40H11C8.79086 40 7 38.2091 7 36V4Z" fill="#FFF0F0" /> <path d="M11 0.75H27C27.1212 0.75 27.2375 0.798088 27.3232 0.883789L38.1162 11.6768C38.2019 11.7625 38.25 11.8788 38.25 12V36C38.25 37.7949 36.7949 39.25 35 39.25H11C9.20507 39.25 7.75 37.7949 7.75 36V4C7.75 2.20507 9.20508 0.75 11 0.75Z" stroke="#D0D5DD" strokeWidth="1.5" /> </g> <path d="M27 0.5V8C27 10.2091 28.7909 12 31 12H38.5" stroke="#D0D5DD" strokeWidth="1.5" /> <rect x="1" y="17.5" width="26" height="17" rx="2" fill="#D92D20" /> <path d="M4.84695 30.5V23.05H7.62695C8.13362 23.05 8.58029 23.1433 8.96695 23.33C9.36029 23.51 9.66695 23.7767 9.88695 24.13C10.107 24.4767 10.217 24.9 10.217 25.4C10.217 25.8933 10.1036 26.3167 9.87695 26.67C9.65695 27.0167 9.35362 27.2833 8.96695 27.47C8.58029 27.6567 8.13362 27.75 7.62695 27.75H6.20695V30.5H4.84695ZM6.20695 26.55H7.64695C7.89362 26.55 8.10695 26.5033 8.28695 26.41C8.46695 26.31 8.60695 26.1733 8.70695 26C8.80695 25.8267 8.85695 25.6267 8.85695 25.4C8.85695 25.1667 8.80695 24.9667 8.70695 24.8C8.60695 24.6267 8.46695 24.4933 8.28695 24.4C8.10695 24.3 7.89362 24.25 7.64695 24.25H6.20695V26.55ZM11.3313 30.5V23.05H13.7613C14.548 23.05 15.2313 23.21 15.8113 23.53C16.398 23.8433 16.8513 24.28 17.1713 24.84C17.4913 25.3933 17.6513 26.0367 17.6513 26.77C17.6513 27.4967 17.4913 28.1433 17.1713 28.71C16.8513 29.27 16.398 29.71 15.8113 30.03C15.2313 30.3433 14.548 30.5 13.7613 30.5H11.3313ZM12.6913 29.3H13.7913C14.298 29.3 14.7347 29.1967 15.1013 28.99C15.4747 28.7767 15.7647 28.4833 15.9713 28.11C16.178 27.73 16.2813 27.2833 16.2813 26.77C16.2813 26.25 16.178 25.8033 15.9713 25.43C15.7647 25.0567 15.4747 24.7667 15.1013 24.56C14.7347 24.3533 14.298 24.25 13.7913 24.25H12.6913V29.3ZM18.7337 30.5V23.05H23.7037V24.25H20.0937V26.31H23.2537V27.51H20.0937V30.5H18.7337Z" fill="white" /> <defs> <filter id="filter0_d_188_16937" x="3" y="0" width="40" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_188_16937" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_188_16937" result="shape" /> </filter> </defs> </svg>
              ) : (
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <FileSpreadsheet size={16} className="text-emerald-500" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invoice Reference */}
        {invoice && (
          <div className="flex items-center gap-2 pt-0.5">
            <FileText size={14} className="text-slate-400 shrink-0" />
            <span className="text-[12px] text-slate-500">
              {invoice.label} <span className="font-bold text-accent-blue">{invoice.code}</span> created
            </span>
          </div>
        )}

        {/* Timestamp */}
        <p className="text-[12px] font-medium text-accent-blue pt-0.5">{time}</p>
      </div>
    </div>
  );
}

export default function ActivityTimeline() {
  const activities: TimelineItemProps[] = [
    {
      number: '05',
      title: 'Rental Agreement Setup',
      description: 'Created new rental contract with',
      time: 'Now',
      avatar: { initials: 'FA', name: 'Foyez Ahmed', color: '#3A86C8' },
      attachment: { name: 'Terms & conditions', type: 'pdf', label: 'Document · PDF' },
    },
    {
      number: '04',
      title: 'Usage Tracking & Billing',
      description: 'Generated usage report for rental period\nSep 24–28',
      time: 'Today',
      invoice: { label: 'Invoice draft', code: '#INV-2025' },
    },
    {
      number: '03',
      title: 'Usage Tracking & Billing',
      description: 'Generated usage report for rental period\nSep 24–28',
      time: 'Today',
      invoice: { label: 'Invoice draft', code: '#INV-2025' },
    },
    {
      number: '02',
      title: 'Usage Tracking & Billing',
      description: 'Generated usage report for rental period\nSep 24–28',
      time: 'Today',
      invoice: { label: 'Invoice draft', code: '#INV-2025' },
    },
    {
      number: '01',
      title: 'Usage Tracking & Billing',
      description: 'Generated usage report for rental period\nSep 24–28',
      time: 'Today',
      invoice: { label: 'Invoice draft', code: '#INV-2025' },
      isLast: true,
    },
  ];

  return (
    <div className="glass-card rounded-[24px] p-6 border border-white/50 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="mb-6">
        <h3 className="text-[17px] font-normal text-[#3F434D]">Activity Timeline</h3>
      </div>

      {/* Scrollable Container */}
      <div className="h-[560px] overflow-y-auto pr-1 scrollbar-none">
        {activities.map((act, idx) => (
          <TimelineItem key={idx} {...act} />
        ))}
      </div>
    </div>
  );
}
