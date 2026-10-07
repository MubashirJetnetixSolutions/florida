'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Upload,
  SlidersHorizontal,
  Trash2,
  Check,
  PencilLine,
  ChevronDown,
  X,
} from 'lucide-react';
import { WORK_ORDERS, type JobType, type Status } from '@/data/workOrders';

type Tab = 'All' | 'Completed' | 'On Hold' | 'In progress';

const TABS: Tab[] = ['All', 'Completed', 'On Hold', 'In progress'];

const SCHEDULE_OPTIONS = [
  'Mar 18, 2025',
  'Mar 21, 2025',
  'Mar 23, 2025',
  'Mar 25, 2025',
  'Mar 28, 2025',
  'Mar 30, 2025',
];

const ASSIGNEE_OPTIONS = Array.from(
  new Set([...WORK_ORDERS.map((o) => o.assignedTo), 'Imran khan', 'Mohsin'])
);

const STATUS_OPTIONS: Status[] = ['Completed', 'On Hold', 'In progress'];

const jobTypeStyles: Record<JobType, string> = {
  Service: 'bg-[#F3E8FF] text-[#7C3AED]',
  Installation: 'bg-[#E8F1FF] text-[#3C7FEC]',
};

const jobTypeDot: Record<JobType, string> = {
  Service: 'bg-[#8B5CF6]',
  Installation: 'bg-[#3C7FEC]',
};

const statusStyles: Record<Status, string> = {
  Completed: 'bg-[#ECFDF3] text-[#039855]',
  'In progress': 'bg-[#FFF4E5] text-[#B7791F]',
  'On Hold': 'bg-[#E8F1FF] text-[#3C7FEC]',
};

const statusDot: Record<Status, string> = {
  Completed: 'bg-[#12B76A]',
  'In progress': 'bg-[#F5A524]',
  'On Hold': 'bg-[#3C7FEC]',
};

type AppliedFilters = {
  scheduledOn: string;
  assignees: string[];
  status: Status | '';
};

const EMPTY_FILTERS: AppliedFilters = {
  scheduledOn: '',
  assignees: [],
  status: '',
};

export default function WorkOrdersTable() {
  const [tab, setTab] = useState<Tab>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftScheduled, setDraftScheduled] = useState('Mar 28, 2025');
  const [draftAssignees, setDraftAssignees] = useState<string[]>(['Imran khan', 'Mohsin']);
  const [draftStatus, setDraftStatus] = useState<Status | ''>('In progress');
  const [applied, setApplied] = useState<AppliedFilters>(EMPTY_FILTERS);
  const [chips, setChips] = useState<string[]>([]);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [filterOpen]);

  const filtered = useMemo(() => {
    return WORK_ORDERS.filter((order) => {
      const matchesTab = tab === 'All' || order.status === tab;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        order.orderNumber.includes(q) ||
        order.clientName.toLowerCase().includes(q) ||
        order.jobLocation.toLowerCase().includes(q) ||
        order.assignedTo.toLowerCase().includes(q);

      const matchesSchedule =
        !applied.scheduledOn || order.scheduledOn === applied.scheduledOn;
      const matchesAssignee =
        applied.assignees.length === 0 ||
        applied.assignees.some(
          (a) => a.toLowerCase() === order.assignedTo.toLowerCase()
        );
      const matchesStatus = !applied.status || order.status === applied.status;

      return (
        matchesTab &&
        matchesSearch &&
        matchesSchedule &&
        matchesAssignee &&
        matchesStatus
      );
    });
  }, [tab, search, applied]);

  const hasFilters =
    Boolean(applied.scheduledOn) ||
    applied.assignees.length > 0 ||
    Boolean(applied.status) ||
    chips.length > 0;

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((order) => selected.includes(order.id));

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(Array.from(new Set([...selected, ...filtered.map((o) => o.id)])));
    } else {
      const ids = new Set(filtered.map((o) => o.id));
      setSelected(selected.filter((id) => !ids.has(id)));
    }
  };

  const toggleDraftAssignee = (name: string) => {
    setDraftAssignees((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const applyFilters = () => {
    const next: AppliedFilters = {
      scheduledOn: draftScheduled,
      assignees: draftAssignees,
      status: draftStatus,
    };
    setApplied(next);
    const nextChips = [
      ...next.assignees,
      ...(next.status ? [next.status.toLowerCase()] : []),
    ];
    setChips(nextChips);
    setFilterOpen(false);
  };

  const clearAllFilters = () => {
    setApplied(EMPTY_FILTERS);
    setChips([]);
    setDraftScheduled('Mar 28, 2025');
    setDraftAssignees([]);
    setDraftStatus('');
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
    setApplied((prev) => {
      const isStatus = STATUS_OPTIONS.some((s) => s.toLowerCase() === chip.toLowerCase());
      if (isStatus) {
        return { ...prev, status: '' };
      }
      return {
        ...prev,
        assignees: prev.assignees.filter((a) => a.toLowerCase() !== chip.toLowerCase()),
      };
    });
    setDraftAssignees((prev) => prev.filter((a) => a.toLowerCase() !== chip.toLowerCase()));
    if (STATUS_OPTIONS.some((s) => s.toLowerCase() === chip.toLowerCase())) {
      setDraftStatus('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#EDF1FA] flex gap-3.5 items-start p-2 rounded-[8px] w-full overflow-x-auto">
        {TABS.map((item) => {
          const active = tab === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`h-12 min-w-[143px] px-4 rounded-[8px] text-[14.5px] font-normal text-[#3D404A] transition-all cursor-pointer shrink-0 ${
                active
                  ? 'bg-[#FBFDFC] border border-[#E8EAEE] shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
                  : 'bg-[rgba(251,253,252,0.5)] border border-[#E8EEEA]'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_0px_rgba(16,24,40,0.08)] overflow-hidden">
        {/* Toolbar — always visible, including empty search results */}
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-5">
          <div className="relative shrink-0">
            <Search size={18} className="absolute left-[17px] top-1/2 -translate-y-1/2 text-[#98A1AE]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaign..."
              className="w-full sm:w-[250px] h-11 pl-11 pr-4 text-[15px] text-[#0B1B34] bg-white border border-[#E6EAEF] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#5897FF]/40 focus:border-[#5897FF]/40 placeholder:text-[#98A1AE]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:gap-4 lg:ml-auto">
            {hasFilters ? (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center justify-center gap-1.5 h-[45px] pl-5 pr-3.5 rounded-[12px] border border-[#E6EAEF] bg-white text-[15px] font-normal text-[#0B1B34] hover:bg-slate-50 cursor-pointer"
              >
                Clear All Filters
                <X size={18} />
              </button>
            ) : null}

            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-[15px] font-normal text-[#0B1B34] hover:bg-slate-50 cursor-pointer"
            >
              <Upload size={18} />
              Export
            </button>

            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                className={`inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] text-[15px] font-normal text-[#0B1B34] cursor-pointer ${
                  filterOpen ? 'bg-[#F4F7FB]' : 'bg-white hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal size={18} />
                Filter
              </button>

              {filterOpen ? (
                <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-[min(901px,calc(100vw-3rem))] bg-[#FDFEFD] border border-[#E7E7E7] rounded-[10px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] px-[26.5px] py-[22.5px] flex flex-col gap-4">
                  <div className="flex items-center gap-4 border-b border-[#EDF1EF] pb-[21px]">
                    <div className="flex flex-1 items-center gap-2.5 min-w-0">
                      <div className="size-12 rounded-[12px] bg-[#F2F5F8] flex items-center justify-center shrink-0">
                        <SlidersHorizontal size={18} className="text-[#5B6878]" />
                      </div>
                      <h3 className="text-[20px] font-normal text-[#0B1B34] leading-[30px]">
                        Filters
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFilterOpen(false)}
                      aria-label="Close filters"
                      className="size-[18px] flex items-center justify-center text-[#5B6878] hover:text-[#0B1B34] cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-2.5 items-end">
                    <label className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
                      <span className="text-[12.5px] text-[#8A8F97]">Scheduled on</span>
                      <div className="relative">
                        <select
                          value={draftScheduled}
                          onChange={(e) => setDraftScheduled(e.target.value)}
                          className="w-full h-12 appearance-none rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] pr-10 text-[14.5px] text-[#262831] outline-none focus:border-[#5897FF]/50"
                        >
                          <option value="">Any date</option>
                          {SCHEDULE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="pointer-events-none absolute right-[17px] top-1/2 -translate-y-1/2 text-[#5B6878]"
                        />
                      </div>
                    </label>

                    <div className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
                      <span className="text-[12.5px] text-[#8A8F97]">Assigned to</span>
                      <details className="relative group">
                        <summary className="list-none flex items-center h-12 rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] text-[14.5px] text-[#262831] cursor-pointer [&::-webkit-details-marker]:hidden">
                          <span className="flex-1">
                            {draftAssignees.length === 0
                              ? 'Select assignees'
                              : `${draftAssignees.length} selected`}
                          </span>
                          <ChevronDown size={18} className="text-[#5B6878]" />
                        </summary>
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-48 overflow-y-auto rounded-[13px] border border-[#E9EFEB] bg-white shadow-lg p-2">
                          {ASSIGNEE_OPTIONS.map((name) => {
                            const checked = draftAssignees.includes(name);
                            return (
                              <label
                                key={name}
                                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#F7F9FF] cursor-pointer text-sm text-[#0B1B34]"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleDraftAssignee(name)}
                                  className="size-4 rounded border-[#CFD6DE]"
                                />
                                {name}
                              </label>
                            );
                          })}
                        </div>
                      </details>
                    </div>

                    <label className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
                      <span className="text-[12.5px] text-[#8A8F97]">Status</span>
                      <div className="relative">
                        <select
                          value={draftStatus}
                          onChange={(e) => setDraftStatus(e.target.value as Status | '')}
                          className="w-full h-12 appearance-none rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] pr-10 text-[14.5px] text-[#262831] outline-none focus:border-[#5897FF]/50"
                        >
                          <option value="">Any status</option>
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="pointer-events-none absolute right-[17px] top-1/2 -translate-y-1/2 text-[#5B6878]"
                        />
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={applyFilters}
                      className="h-12 w-full xl:flex-1 min-w-[100px] rounded-[8px] border border-[#5897FF] text-[14.5px] text-white font-normal shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer"
                      style={{
                        backgroundImage:
                          'linear-gradient(95deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  {(chips.length > 0 || draftAssignees.length > 0 || draftStatus) && (
                    <div className="bg-[#EDF1FA] rounded-[8px] pl-2 pr-4 py-2 flex flex-wrap items-center gap-3.5">
                      <div className="flex flex-1 flex-wrap gap-2.5 min-w-0">
                        {(chips.length > 0
                          ? chips
                          : [
                              ...draftAssignees,
                              ...(draftStatus ? [draftStatus.toLowerCase()] : []),
                            ]
                        ).map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-[6px] bg-white border border-[#E9EFEB] text-sm text-[#344054]"
                          >
                            {chip}
                            <button
                              type="button"
                              onClick={() => removeChip(chip)}
                              aria-label={`Remove ${chip}`}
                              className="size-3.5 flex items-center justify-center text-[#667085] hover:text-[#0B1B34] cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setChips([]);
                          setDraftAssignees([]);
                          setDraftStatus('');
                          setDraftScheduled('');
                        }}
                        className="text-[14.5px] font-medium text-[#4D8EF8] cursor-pointer hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-[15px] font-normal text-[#EF4444] hover:bg-rose-50 cursor-pointer"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 min-h-[360px] px-6 py-16 border-t border-[#EEF1F4]">
            <Image
              src="/EmptyStateOrdersSection.png"
              alt=""
              width={280}
              height={220}
              className="w-[240px] md:w-[280px] h-auto object-contain select-none pointer-events-none"
              priority
            />
            <p className="max-w-[360px] text-center text-[#99A4B0] text-[28px] md:text-[32px] font-normal tracking-[-1px] leading-[40px] md:leading-[52px]">
              Hm. Seems like you have no orders yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[980px]">
              <thead>
                <tr className="bg-[#F7F9FF] border-y border-[#EEF1F4] text-[15px] font-normal text-[#5B6878]">
                  <th className="py-3.5 px-3 w-10">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={(e) => toggleAll(e.target.checked)}
                      className="size-[18px] rounded-[5px] border border-[#CFD6DE] cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-3 font-normal">Order Number</th>
                  <th className="py-3.5 px-3 font-normal">Client Name</th>
                  <th className="py-3.5 px-3 font-normal">Job Location</th>
                  <th className="py-3.5 px-3 font-normal">Scheduled on</th>
                  <th className="py-3.5 px-3 font-normal">Assigned to</th>
                  <th className="py-3.5 px-3 font-normal">Job Type</th>
                  <th className="py-3.5 px-3 font-normal">Status</th>
                  <th className="py-3.5 px-3 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, index) => {
                  const isSelected = selected.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`text-[15px] text-[#5B6878] border-b border-[#EEF1F4] hover:bg-[#F7F9FF]/60 ${
                        index % 2 === 1 ? 'bg-[#FAFBFD]' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) =>
                            setSelected((prev) =>
                              e.target.checked
                                ? [...prev, order.id]
                                : prev.filter((id) => id !== order.id)
                            )
                          }
                          className="size-[18px] rounded-[5px] border border-[#CFD6DE] cursor-pointer"
                        />
                      </td>
                      <td className="py-4 px-3 font-normal text-[#0B1B34]">
                        <Link
                          href={`/work-orders/${order.id}`}
                          className="hover:text-[#3C7FEC] hover:underline underline-offset-2"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-4 px-3 font-normal text-[#0B1B34]">
                        <Link
                          href={`/work-orders/${order.id}`}
                          className="hover:text-[#3C7FEC] hover:underline underline-offset-2"
                        >
                          {order.clientName}
                        </Link>
                      </td>
                      <td className="py-4 px-3 text-[#5B6878] max-w-[260px]">
                        <Link
                          href={`/work-orders/${order.id}`}
                          className="hover:text-[#3C7FEC] hover:underline underline-offset-2"
                        >
                          {order.jobLocation}
                        </Link>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">{order.scheduledOn}</td>
                      <td className="py-4 px-3 text-[#0B1B34] whitespace-nowrap">
                        {order.assignedTo}
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[13px] font-medium ${jobTypeStyles[order.jobType]}`}
                        >
                          <span className={`size-1.5 rounded-full ${jobTypeDot[order.jobType]}`} />
                          {order.jobType}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[13px] font-medium ${statusStyles[order.status]}`}
                        >
                          <span className={`size-1.5 rounded-full ${statusDot[order.status]}`} />
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            title="Mark complete"
                            className="size-[30px] rounded-md text-[#12B76A] hover:bg-emerald-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
                          >
                            <Check size={15} strokeWidth={2.5} />
                          </button>
                          <button
                            title="Edit"
                            className="size-[30px] rounded-md text-[#3C7FEC] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
                          >
                            <PencilLine size={14} />
                          </button>
                          <button
                            title="Delete"
                            className="size-[30px] rounded-md text-[#EF4444] hover:bg-rose-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
