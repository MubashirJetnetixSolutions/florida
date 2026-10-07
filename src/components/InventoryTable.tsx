'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Upload,
  SlidersHorizontal,
  Trash2,
  PencilLine,
  ChevronDown,
  X,
} from 'lucide-react';
import { INVENTORY_ITEMS, type InventoryItem } from '@/data/inventory';

const QUANTITY_BUCKETS = ['0-30', '30-60', '60+'] as const;

const ITEM_NAME_OPTIONS = Array.from(
  new Set(INVENTORY_ITEMS.map((item) => item.itemName))
);

const LOT_OPTIONS = Array.from(
  new Set(INVENTORY_ITEMS.map((item) => item.lotNumber))
);

type AppliedFilters = {
  itemNames: string[];
  lotNumbers: string[];
  quantityBuckets: string[];
};

const EMPTY_FILTERS: AppliedFilters = {
  itemNames: [],
  lotNumbers: [],
  quantityBuckets: [],
};

function inBucket(value: number, bucket: string) {
  if (bucket === '0-30') return value >= 0 && value <= 30;
  if (bucket === '30-60') return value > 30 && value <= 60;
  if (bucket === '60+') return value > 60;
  return true;
}

export default function InventoryTable() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftNames, setDraftNames] = useState<string[]>([
    'Casement Window',
    'Sliding Window',
  ]);
  const [draftLots, setDraftLots] = useState<string[]>(['EO-0058']);
  const [draftQuantity, setDraftQuantity] = useState<string[]>(['30-60', '60+']);
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
    return INVENTORY_ITEMS.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        item.itemId.includes(q) ||
        item.itemName.toLowerCase().includes(q) ||
        item.lotNumber.toLowerCase().includes(q) ||
        String(item.quantity).includes(q);

      const matchesName =
        applied.itemNames.length === 0 ||
        applied.itemNames.some(
          (n) => n.toLowerCase() === item.itemName.toLowerCase()
        );
      const matchesLot =
        applied.lotNumbers.length === 0 ||
        applied.lotNumbers.includes(item.lotNumber);
      const matchesQuantity =
        applied.quantityBuckets.length === 0 ||
        applied.quantityBuckets.some((b) => inBucket(item.quantity, b));

      return matchesSearch && matchesName && matchesLot && matchesQuantity;
    });
  }, [search, applied]);

  const hasFilters =
    applied.itemNames.length > 0 ||
    applied.lotNumbers.length > 0 ||
    applied.quantityBuckets.length > 0 ||
    chips.length > 0;

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((item) => selected.includes(item.id));

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(Array.from(new Set([...selected, ...filtered.map((i) => i.id)])));
    } else {
      const ids = new Set(filtered.map((i) => i.id));
      setSelected(selected.filter((id) => !ids.has(id)));
    }
  };

  const toggleInList = (
    setList: (v: string[] | ((p: string[]) => string[])) => void,
    value: string
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((n) => n !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    const next: AppliedFilters = {
      itemNames: draftNames,
      lotNumbers: draftLots,
      quantityBuckets: draftQuantity,
    };
    setApplied(next);
    setChips([...next.quantityBuckets, ...next.lotNumbers, ...next.itemNames]);
    setFilterOpen(false);
  };

  const clearAllFilters = () => {
    setApplied(EMPTY_FILTERS);
    setChips([]);
    setDraftNames([]);
    setDraftLots([]);
    setDraftQuantity([]);
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
    setApplied((prev) => {
      if (prev.quantityBuckets.includes(chip)) {
        return {
          ...prev,
          quantityBuckets: prev.quantityBuckets.filter((b) => b !== chip),
        };
      }
      if (prev.lotNumbers.includes(chip)) {
        return {
          ...prev,
          lotNumbers: prev.lotNumbers.filter((l) => l !== chip),
        };
      }
      return {
        ...prev,
        itemNames: prev.itemNames.filter(
          (n) => n.toLowerCase() !== chip.toLowerCase()
        ),
      };
    });
    setDraftNames((prev) =>
      prev.filter((n) => n.toLowerCase() !== chip.toLowerCase())
    );
    setDraftLots((prev) => prev.filter((l) => l !== chip));
    setDraftQuantity((prev) => prev.filter((b) => b !== chip));
  };

  return (
    <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_0px_rgba(16,24,40,0.08)] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-5">
        <div className="relative shrink-0">
          <Search
            size={18}
            className="absolute left-[17px] top-1/2 -translate-y-1/2 text-[#98A1AE]"
          />
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
                  <MultiSelectField
                    label="Item Name"
                    count={draftNames.length}
                    options={ITEM_NAME_OPTIONS}
                    selected={draftNames}
                    onToggle={(name) => toggleInList(setDraftNames, name)}
                  />

                  <MultiSelectField
                    label="Lot Number"
                    count={draftLots.length}
                    options={LOT_OPTIONS}
                    selected={draftLots}
                    onToggle={(lot) => toggleInList(setDraftLots, lot)}
                  />

                  <MultiSelectField
                    label="Quantity"
                    count={draftQuantity.length}
                    options={[...QUANTITY_BUCKETS]}
                    selected={draftQuantity}
                    onToggle={(bucket) => toggleInList(setDraftQuantity, bucket)}
                  />

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

                {(chips.length > 0 ||
                  draftNames.length > 0 ||
                  draftLots.length > 0 ||
                  draftQuantity.length > 0) && (
                  <div className="bg-[#EDF1FA] rounded-[8px] pl-2 pr-4 py-2 flex flex-wrap items-center gap-3.5">
                    <div className="flex flex-1 flex-wrap gap-2.5 min-w-0">
                      {(chips.length > 0
                        ? chips
                        : [...draftQuantity, ...draftLots, ...draftNames]
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
                        setDraftLots([]);
                        setDraftQuantity([]);
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
            Hm. Seems like you have no inventory items yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
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
                <th className="py-3.5 px-3 font-normal">Item ID</th>
                <th className="py-3.5 px-3 font-normal">Item Name</th>
                <th className="py-3.5 px-3 font-normal">Lot Number</th>
                <th className="py-3.5 px-3 font-normal">Quantity</th>
                <th className="py-3.5 px-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <InventoryRow
                  key={item.id}
                  item={item}
                  index={index}
                  selected={selected.includes(item.id)}
                  onToggle={(checked) =>
                    setSelected((prev) =>
                      checked
                        ? [...prev, item.id]
                        : prev.filter((id) => id !== item.id)
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

function InventoryRow({
  item,
  index,
  selected,
  onToggle,
}: {
  item: InventoryItem;
  index: number;
  selected: boolean;
  onToggle: (checked: boolean) => void;
}) {
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
      <td className="py-4 px-3 font-normal text-[#5B6878] whitespace-nowrap">
        {item.itemId}
      </td>
      <td className="py-4 px-3 font-normal text-[#0B1B34] whitespace-nowrap">
        {item.itemName}
      </td>
      <td className="py-4 px-3 text-[#5B6878] whitespace-nowrap">{item.lotNumber}</td>
      <td className="py-4 px-3 text-[#0B1B34]">{item.quantity}</td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit item"
            className="size-[30px] rounded-md text-[#3C7FEC] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
          >
            <PencilLine size={14} />
          </button>
          <button
            type="button"
            title="Delete item"
            className="size-[30px] rounded-md text-[#EF4444] hover:bg-rose-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
