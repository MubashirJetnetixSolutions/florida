'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Upload,
  SlidersHorizontal,
  Trash2,
  PencilLine,
  ChevronDown,
  X,
} from 'lucide-react';
import { USERS, type AppUser } from '@/data/users';

const CREATION_DATE_OPTIONS = [
  'Mar 18, 2025',
  'Mar 21, 2025',
  'Mar 25, 2025',
  'Mar 28, 2025',
  'Mar 30, 2025',
];

const NAME_OPTIONS = Array.from(
  new Set([...USERS.map((u) => u.name), 'Imran khan', 'Mohsin'])
);

const ASSIGNED_BUCKETS = ['0-20', '20-50', '50+'] as const;
const COMPLETED_BUCKETS = ['0-20', '20-50', '50+'] as const;

type AppliedFilters = {
  names: string[];
  createdOn: string;
  assignedBuckets: string[];
  completedBuckets: string[];
};

const EMPTY_FILTERS: AppliedFilters = {
  names: [],
  createdOn: '',
  assignedBuckets: [],
  completedBuckets: [],
};

function inBucket(value: number, bucket: string) {
  if (bucket === '0-20') return value >= 0 && value <= 20;
  if (bucket === '20-50') return value > 20 && value <= 50;
  if (bucket === '50+') return value > 50;
  return true;
}

export default function UsersTable() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftNames, setDraftNames] = useState<string[]>(['Imran khan', 'Mohsin']);
  const [draftCreatedOn, setDraftCreatedOn] = useState('Mar 28, 2025');
  const [draftAssigned, setDraftAssigned] = useState<string[]>(['0-20', '20-50']);
  const [draftCompleted, setDraftCompleted] = useState<string[]>(['20-50']);
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
    return USERS.filter((user) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        user.userId.includes(q) ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q);

      const matchesName =
        applied.names.length === 0 ||
        applied.names.some((n) => n.toLowerCase() === user.name.toLowerCase());
      const matchesDate = !applied.createdOn || user.createdOn === applied.createdOn;
      const matchesAssigned =
        applied.assignedBuckets.length === 0 ||
        applied.assignedBuckets.some((b) => inBucket(user.assignedOrders, b));
      const matchesCompleted =
        applied.completedBuckets.length === 0 ||
        applied.completedBuckets.some((b) => inBucket(user.completedOrders, b));

      return (
        matchesSearch &&
        matchesName &&
        matchesDate &&
        matchesAssigned &&
        matchesCompleted
      );
    });
  }, [search, applied]);

  const hasFilters =
    applied.names.length > 0 ||
    Boolean(applied.createdOn) ||
    applied.assignedBuckets.length > 0 ||
    applied.completedBuckets.length > 0 ||
    chips.length > 0;

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((user) => selected.includes(user.id));

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(Array.from(new Set([...selected, ...filtered.map((u) => u.id)])));
    } else {
      const ids = new Set(filtered.map((u) => u.id));
      setSelected(selected.filter((id) => !ids.has(id)));
    }
  };

  const toggleInList = (
    list: string[],
    setList: (v: string[] | ((p: string[]) => string[])) => void,
    value: string
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((n) => n !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    const next: AppliedFilters = {
      names: draftNames,
      createdOn: draftCreatedOn,
      assignedBuckets: draftAssigned,
      completedBuckets: draftCompleted,
    };
    setApplied(next);
    setChips([
      ...next.assignedBuckets,
      ...(next.createdOn ? [next.createdOn] : []),
      ...next.names,
    ]);
    setFilterOpen(false);
  };

  const clearAllFilters = () => {
    setApplied(EMPTY_FILTERS);
    setChips([]);
    setDraftNames([]);
    setDraftCreatedOn('');
    setDraftAssigned([]);
    setDraftCompleted([]);
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
    setApplied((prev) => {
      if (prev.createdOn === chip) return { ...prev, createdOn: '' };
      if (prev.assignedBuckets.includes(chip)) {
        return {
          ...prev,
          assignedBuckets: prev.assignedBuckets.filter((b) => b !== chip),
        };
      }
      if (prev.completedBuckets.includes(chip)) {
        return {
          ...prev,
          completedBuckets: prev.completedBuckets.filter((b) => b !== chip),
        };
      }
      return {
        ...prev,
        names: prev.names.filter((n) => n.toLowerCase() !== chip.toLowerCase()),
      };
    });
    setDraftNames((prev) => prev.filter((n) => n.toLowerCase() !== chip.toLowerCase()));
    setDraftAssigned((prev) => prev.filter((b) => b !== chip));
    setDraftCompleted((prev) => prev.filter((b) => b !== chip));
    if (draftCreatedOn === chip) setDraftCreatedOn('');
  };

  return (
    <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_0px_rgba(16,24,40,0.08)] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
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
              <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-[min(980px,calc(100vw-3rem))] bg-[#FDFEFD] border border-[#E7E7E7] rounded-[10px] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] px-[26.5px] py-[22.5px] flex flex-col gap-4">
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
                  <MultiSelectField
                    label="User Name"
                    count={draftNames.length}
                    options={NAME_OPTIONS}
                    selected={draftNames}
                    onToggle={(name) => toggleInList(draftNames, setDraftNames, name)}
                  />

                  <label className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
                    <span className="text-[12.5px] text-[#8A8F97]">Creation Date</span>
                    <div className="relative">
                      <select
                        value={draftCreatedOn}
                        onChange={(e) => setDraftCreatedOn(e.target.value)}
                        className="w-full h-12 appearance-none rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] pr-10 text-[14.5px] text-[#262831] outline-none focus:border-[#5897FF]/50"
                      >
                        <option value="">Any date</option>
                        {CREATION_DATE_OPTIONS.map((opt) => (
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

                  <MultiSelectField
                    label="Assigned Orders"
                    count={draftAssigned.length}
                    options={[...ASSIGNED_BUCKETS]}
                    selected={draftAssigned}
                    onToggle={(v) => toggleInList(draftAssigned, setDraftAssigned, v)}
                  />

                  <label className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
                    <span className="text-[12.5px] text-[#8A8F97]">Completed Orders</span>
                    <div className="relative">
                      <select
                        value={draftCompleted[0] ?? ''}
                        onChange={(e) =>
                          setDraftCompleted(e.target.value ? [e.target.value] : [])
                        }
                        className="w-full h-12 appearance-none rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] pr-10 text-[14.5px] text-[#262831] outline-none focus:border-[#5897FF]/50"
                      >
                        <option value="">Any</option>
                        {COMPLETED_BUCKETS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt === '20-50' ? '20 - 50' : opt}
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
                    className="h-12 w-full xl:w-[120px] shrink-0 rounded-[8px] border border-[#5897FF] text-[14.5px] text-white font-normal shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer"
                    style={{
                      backgroundImage:
                        'linear-gradient(95deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
                    }}
                  >
                    Apply
                  </button>
                </div>

                {(chips.length > 0 ||
                  draftNames.length > 0 ||
                  draftAssigned.length > 0 ||
                  draftCreatedOn) && (
                  <div className="bg-[#EDF1FA] rounded-[8px] pl-2 pr-4 py-2 flex flex-wrap items-center gap-3.5">
                    <div className="flex flex-1 flex-wrap gap-2.5 min-w-0">
                      {(chips.length > 0
                        ? chips
                        : [
                            ...draftAssigned,
                            ...(draftCreatedOn ? [draftCreatedOn] : []),
                            ...draftNames,
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
                        setDraftNames([]);
                        setDraftAssigned([]);
                        setDraftCompleted([]);
                        setDraftCreatedOn('');
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
            Hm. Seems like you have no users yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1080px]">
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
                <th className="py-3.5 px-3 font-normal">User ID</th>
                <th className="py-3.5 px-3 font-normal">User Name</th>
                <th className="py-3.5 px-3 font-normal">Email Address</th>
                <th className="py-3.5 px-3 font-normal">Phone Number</th>
                <th className="py-3.5 px-3 font-normal">Assigned Orders</th>
                <th className="py-3.5 px-3 font-normal">Completed Orders</th>
                <th className="py-3.5 px-3 font-normal">Creation Date</th>
                <th className="py-3.5 px-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, index) => (
                <UserRow
                  key={user.id}
                  user={user}
                  index={index}
                  selected={selected.includes(user.id)}
                  onToggle={(checked) =>
                    setSelected((prev) =>
                      checked ? [...prev, user.id] : prev.filter((id) => id !== user.id)
                    )
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MultiSelectField({
  label,
  count,
  options,
  selected,
  onToggle,
}: {
  label: string;
  count: number;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 w-full min-w-0">
      <span className="text-[12.5px] text-[#8A8F97]">{label}</span>
      <details className="relative group">
        <summary className="list-none flex items-center h-12 rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] px-[17px] text-[14.5px] text-[#262831] cursor-pointer [&::-webkit-details-marker]:hidden">
          <span className="flex-1">
            {count === 0 ? 'Select' : `${count} selected`}
          </span>
          <ChevronDown size={18} className="text-[#5B6878]" />
        </summary>
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-48 overflow-y-auto rounded-[13px] border border-[#E9EFEB] bg-white shadow-lg p-2">
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#F7F9FF] cursor-pointer text-sm text-[#0B1B34]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt)}
                  className="size-4 rounded border-[#CFD6DE]"
                />
                {opt}
              </label>
            );
          })}
        </div>
      </details>
    </div>
  );
}

function UserRow({
  user,
  index,
  selected,
  onToggle,
}: {
  user: AppUser;
  index: number;
  selected: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const href = `/users/${user.id}`;

  return (
    <tr
      className={`text-[15px] text-[#5B6878] border-b border-[#EEF1F4] hover:bg-[#F7F9FF]/60 ${
        index % 2 === 1 ? 'bg-[#FAFBFD]' : 'bg-white'
      }`}
    >
      <td className="py-4 px-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onToggle(e.target.checked)}
          className="size-[18px] rounded-[5px] border border-[#CFD6DE] cursor-pointer"
        />
      </td>
      <td className="py-4 px-3 font-normal text-[#0B1B34]">
        <Link href={href} className="hover:text-[#3C7FEC] hover:underline underline-offset-2">
          {user.userId}
        </Link>
      </td>
      <td className="py-4 px-3 font-normal text-[#0B1B34]">
        <Link href={href} className="hover:text-[#3C7FEC] hover:underline underline-offset-2">
          {user.name}
        </Link>
      </td>
      <td className="py-4 px-3">
        <Link href={href} className="hover:text-[#3C7FEC] hover:underline underline-offset-2">
          {user.email}
        </Link>
      </td>
      <td className="py-4 px-3 whitespace-nowrap">
        <Link href={href} className="hover:text-[#3C7FEC] hover:underline underline-offset-2">
          {user.phone}
        </Link>
      </td>
      <td className="py-4 px-3 text-[#0B1B34]">{user.assignedOrders}</td>
      <td className="py-4 px-3 text-[#0B1B34]">{user.completedOrders}</td>
      <td className="py-4 px-3 whitespace-nowrap">{user.createdOn}</td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit user"
            className="size-[30px] rounded-md text-[#3C7FEC] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
          >
            <PencilLine size={14} />
          </button>
          <button
            type="button"
            title="Delete user"
            className="size-[30px] rounded-md text-[#EF4444] hover:bg-rose-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
