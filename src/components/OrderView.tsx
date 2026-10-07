'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArchiveRestore,
  ChevronDown,
  ChevronLeft,
  Download,
  FileText,
  PencilLine,
  Trash2,
  Upload,
} from 'lucide-react';
import type { WorkOrder } from '@/data/workOrders';
import type { ArchivedOrder } from '@/data/archivedOrders';

type Tab = 'Overview' | 'Photos';

const NOTES = [
  'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
  'Took new photos of the site and the timber is bad.',
  'Took new photos of the site and the timber is bad.',
  'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please get this fixed.',
  'Took new photos of the site and the timber is bad.',
  'Took new photos of the site and the timber is bad.',
];

const PHOTO_CATEGORIES = [
  'All corners of the house',
  'Exterior/interior doors',
  'Sliding glass doors',
  'Other/Miscellaneous',
];

const PHOTO_SRC = '/dash.png';

type OrderViewProps = {
  order: WorkOrder | ArchivedOrder;
  variant?: 'work-order' | 'archived';
};

export default function OrderView({ order, variant = 'work-order' }: OrderViewProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('Overview');
  const [noteText, setNoteText] = useState('');
  const [jobStatus, setJobStatus] = useState(order.status === 'Completed' ? 'Completed' : 'Assigned');
  const isArchived = variant === 'archived';
  const backHref = isArchived ? '/archived' : '/work-orders';

  const jobTypeChip =
    order.jobType === 'Service'
      ? { bg: 'bg-[#F2E6F8]', text: 'text-[#7B12A1]', dot: 'bg-[#7B12A1]' }
      : { bg: 'bg-[#E8F1FF]', text: 'text-[#3C7FEC]', dot: 'bg-[#3C7FEC]' };

  const displayLocation =
    order.jobLocation || '9553 Railroad St undefined Lewisville Minnesota 42281 United States';

  const photos = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: 'Great product name goes here',
        by: 'Adam',
        date: '12-June-2026',
        src: PHOTO_SRC,
      })),
    []
  );

  return (
    <div className="flex flex-col gap-4 pb-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top header + info cards */}
      <div className="relative overflow-hidden rounded-[20px] p-4 bg-cover bg-center bg-[url(/backgroundImage.png)] border border-white/70">
        <div className="absolute inset-0 rounded-[20px] bg-white/70 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="bg-white rounded-[10px] shadow-[0px_1px_25px_rgba(0,0,0,0.08)] p-4 flex flex-col xl:flex-row xl:items-center gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => router.push(backHref)}
                className="size-8 rounded-[5px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-[#0B1B34] hover:bg-slate-50 cursor-pointer shrink-0"
                aria-label={isArchived ? 'Back to archived' : 'Back to work orders'}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <span className="text-xl font-normal text-[#6B7280] shrink-0">Job Location :</span>
                <span className="text-lg font-medium text-[#374151]">{displayLocation}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 xl:justify-end">
              {isArchived ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 h-[45px] min-w-[130px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer hover:bg-slate-50"
                  >
                    <ArchiveRestore size={18} className="text-[#3C7FEC]" />
                    Unarchive
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#EF4444] cursor-pointer hover:bg-rose-50"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <span className="text-base font-medium text-[#6B7280]">Assigned to:</span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 pl-5 pr-3.5 py-2.5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer"
                  >
                    {order.assignedTo}
                    <ChevronDown size={18} className="text-[#5B6878]" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer hover:bg-slate-50"
                  >
                    <PencilLine size={18} />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#EF4444] cursor-pointer hover:bg-rose-50"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]">
            <InfoCard title="Client Info:">
              <InfoRow label="Name:" value={order.clientName} />
              <InfoRow label="Email:" value={order.email} />
              <InfoRow label="Call:" value={order.phone} />
              <div className="flex items-start justify-between gap-4 text-base">
                <span className="text-[#6B7280] shrink-0">Job Location:</span>
                <span className="text-[#374151] text-right whitespace-pre-line">
                  {order.jobLocationShort}
                </span>
              </div>
            </InfoCard>

            <InfoCard title="Order Info:">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base text-[#6B7280]">Order Type:</span>
                <span
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] text-sm ${jobTypeChip.bg} ${jobTypeChip.text}`}
                >
                  <span className={`size-[7px] rounded-[3.5px] ${jobTypeChip.dot}`} />
                  {order.jobType}
                </span>
              </div>
              <InfoRow label="Order Date:" value={order.orderDate} />
              <InfoRow label="Completion Date:" value={order.completionDate} />
              <InfoRow label="Order Number:" value={`#${order.orderNumber}`} />
              <InfoRow label="Lot Number:" value={order.lotNumber} />
              <InfoRow label="Inventory:" value={order.inventory} />
            </InfoCard>

            <InfoCard title="Description / Scope:">
              <p className="text-base text-[#374151] leading-relaxed">{order.description}</p>
            </InfoCard>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#EDF1FA] flex gap-3.5 items-start p-2 rounded-[8px] w-full overflow-x-auto">
        {(['Overview', 'Photos'] as Tab[]).map((item) => {
          const active = tab === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`h-12 min-w-[143px] px-4 rounded-[8px] text-[14.5px] font-normal text-[#3D404A] transition-all cursor-pointer shrink-0 ${active
                ? 'bg-[#FBFDFC] border border-[#E8EAEE] shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
                : 'bg-[rgba(251,253,252,0.5)] border border-[#E8EEEA]'
                }`}
            >
              {item === 'Overview' ? 'Over view' : item}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 'Overview' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-[17px] min-h-[500px]">
            <h2 className="text-base font-normal text-[#0B1B34] mb-4">Activity Timeline</h2>
            <div className="relative pl-2">
              <TimelineItem
                step="03"
                title="Rental Agreement Setup"
                subtitle="Created new rental contract with"
                time="Now"
                showLine
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="size-6 rounded-full bg-[#E8EEF8] text-[10px] font-medium text-[#3C7FEC] flex items-center justify-center">
                    FA
                  </span>
                  <span className="text-xs text-[#0B1B34]">Foyez Ahmed</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-[#F5F7FA] px-3 py-2.5">
                  <div>
                    <p className="text-xs text-[#0B1B34]">Terms & conditions</p>
                    <p className="text-xs text-[#6B7280]">Document · PDF</p>
                  </div>
                  <div className="size-10 rounded bg-white border border-slate-200 flex items-center justify-center">
                    <FileText size={18} className="text-[#EF4444]" />
                  </div>
                </div>
              </TimelineItem>

              <TimelineItem
                step="02"
                title="Usage Tracking & Billing"
                subtitle="Generated usage report for rental period Sep 24–28"
                time="Today"
                showLine
              >
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <FileText size={14} className="text-[#3C7FEC]" />
                  <span>Invoice draft</span>
                  <Link href="#" className="text-[#3C7FEC] underline-offset-2 hover:underline">
                    #INV-2025
                  </Link>
                  <span>created</span>
                </div>
              </TimelineItem>

              <TimelineItem
                step="01"
                title="Usage Tracking & Billing"
                subtitle="Generated usage report for rental period Sep 24–28"
                time="Today"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <FileText size={14} className="text-[#3C7FEC]" />
                  <span>Invoice draft</span>
                  <Link href="#" className="text-[#3C7FEC] underline-offset-2 hover:underline">
                    #INV-2025
                  </Link>
                  <span>created</span>
                </div>
              </TimelineItem>
            </div>
          </div>

          <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-[17px] flex flex-col min-h-[434px]">
            <h2 className="text-base font-normal text-[#0B1B34]">Notes</h2>
            <div className="h-px bg-[#EEF1F4] my-3.5" />
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[281px]">
              {NOTES.map((note, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E8EEF8] text-[10px] font-medium text-[#3C7FEC] flex items-center justify-center">
                      FA
                    </span>
                    <span className="text-xs text-[#0B1B34]">Foyez Ahmed</span>
                  </div>
                  <p className="pl-[30px] text-xs text-[#5B6878] leading-4">{note}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Text"
              className="mt-4 h-12 w-full rounded-[8px] border border-[#E6EAEF] px-[17px] text-[14.5px] text-[#0B1B34] placeholder:text-[#98A1AE] outline-none focus:border-[#5897FF]/50"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {PHOTO_CATEGORIES.map((category) => (
            <div
              key={category}
              className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-normal text-[#0B1B34]">{category}</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 pl-3.5 pr-5 py-2.5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer hover:bg-slate-50"
                  >
                    <Download size={18} />
                    Download All
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 pl-3.5 pr-5 py-2.5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer hover:bg-slate-50"
                  >
                    <Upload size={18} />
                    Upload Photo
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <div
                    key={`${category}-${photo.id}`}
                    className="group relative aspect-[4/3] rounded-[10px] overflow-hidden bg-slate-100"
                  >
                    <Image src={photo.src} alt="" fill className="object-cover" sizes="200px" />
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        className="size-7 rounded-md bg-white/95 shadow flex items-center justify-center text-[#0B1B34] cursor-pointer"
                        aria-label="Download photo"
                      >
                        <Download size={14} />
                      </button>
                      <button
                        type="button"
                        className="size-7 rounded-md bg-white/95 shadow flex items-center justify-center text-[#EF4444] cursor-pointer"
                        aria-label="Delete photo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="absolute inset-x-0 bottom-[-40px] bg-white px-2.5 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-0">
                      <p className="text-[11px] text-[#0B1B34] font-medium truncate">{photo.title}</p>
                      <p className="text-[10px] text-[#6B7280]  ">
                        by: {photo.by} · {photo.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer status bar — work orders only */}
      {!isArchived ? (
        <div className="bg-white border border-[#ECEFF3] rounded-[12px] shadow-[0px_1px_25px_rgba(0,0,0,0.06)] h-[76px] px-6 flex items-center justify-between gap-4">
          <span className="text-base font-normal text-[#0B1B34]">Job Status</span>
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <select
                value={jobStatus}
                onChange={(e) => setJobStatus(e.target.value)}
                className="appearance-none h-[45px] min-w-[122px] pl-5 pr-10 rounded-[12px] border border-[#E6EAEF] bg-white text-[15px] text-[#0B1B34] cursor-pointer outline-none"
              >
                <option value="Assigned">Assigned</option>
                <option value="In progress">In progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6878]"
              />
            </div>
            <button
              type="button"
              className="h-12 min-w-[169px] px-4 rounded-[8px] border border-[#5897FF] text-[14.5px] text-white font-normal shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer"
              style={{
                backgroundImage:
                  'linear-gradient(101deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
              }}
            >
              Mark as Completed
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-[11px] shadow-[0px_1px_25px_rgba(0,0,0,0.08)] px-[22px] pt-[22px] pb-6 min-h-[274px] flex flex-col gap-6">
      <h3 className="text-lg font-normal text-[#111827]">{title}</h3>
      <div className="flex flex-col gap-4 flex-1 justify-between">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-base">
      <span className="text-[#6B7280] shrink-0">{label}</span>
      <span className="text-[#374151] text-right">{value}</span>
    </div>
  );
}

function TimelineItem({
  step,
  title,
  subtitle,
  time,
  showLine,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  time: string;
  showLine?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {showLine ? (
        <div className="absolute left-[17px] top-8 bottom-0 w-px bg-[#E5E7EB]" aria-hidden />
      ) : null}
      <div className="relative z-10 w-[34px] shrink-0 pt-3 text-xs font-medium text-[#6B7280] text-center">
        {step}
      </div>
      <div className="flex-1 min-w-0 pt-2.5">
        <p className="text-sm font-medium text-[#0B1B34]">{title}</p>
        <p className="text-xs text-[#6B7280] mt-1 mb-2">{subtitle}</p>
        {children}
        <p className="text-xs text-[#98A1AE] mt-2">{time}</p>
      </div>
    </div>
  );
}
