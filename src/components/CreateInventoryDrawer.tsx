'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { Layers, X } from 'lucide-react';

type CreateInventoryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const fieldClass =
  'w-full h-12 px-[17px] rounded-[13px] bg-[#FBFCFB] border border-[#E9EFEB] text-[14.5px] text-[#262831] font-normal outline-none focus:border-[#5897FF]/60 focus:ring-1 focus:ring-[#5897FF]/30';

const labelClass = 'text-[12.5px] font-normal text-[#8A8F97] leading-normal';

export default function CreateInventoryDrawer({ open, onClose }: CreateInventoryDrawerProps) {
  const titleId = useId();
  const [itemName, setItemName] = useState('Window');
  const [lotNumber, setLotNumber] = useState('EO-0058');
  const [quantity, setQuantity] = useState('50');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close drawer overlay"
        className="absolute inset-0 bg-[rgba(16,24,40,0.6)] cursor-pointer border-0"
        onClick={onClose}
      />

      <aside className="relative z-10 flex h-full w-full max-w-[534px] flex-col gap-4 bg-[#FDFEFD] border-l border-[#E6ECE8] pl-[27px] pr-[26px] py-[22px] shadow-[-8px_0_40px_rgba(16,24,40,0.12)]">
        <div className="flex items-center gap-4 border-b border-[#EDF1EF] pb-[21px]">
          <div className="flex flex-1 items-center gap-2.5 min-w-0">
            <div className="size-12 rounded-[12px] bg-[#F2F5F8] flex items-center justify-center shrink-0">
              <Layers size={18} className="text-[#5B6878]" strokeWidth={1.75} />
            </div>
            <h2 id={titleId} className="text-[20px] font-normal text-[#0B1B34] leading-[30px]">
              Add New Item
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="size-[18px] flex items-center justify-center text-[#5B6878] hover:text-[#0B1B34] cursor-pointer"
          >
            <X size={18} strokeWidth={2.25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          <Field label="Item Name">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={fieldClass}
            />
          </Field>
          <Field label="Lot Number">
            <input
              type="text"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              className={fieldClass}
            />
          </Field>
          <Field label="Quantity">
            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={fieldClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-2 pt-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-[8px] border border-[#5897FF] text-[14.5px] text-white font-normal shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer"
            style={{
              backgroundImage:
                'linear-gradient(101deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
            }}
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-[8px] bg-[#FBFDFC] border border-[#E8EAEE] text-[14.5px] text-[#3D404A] font-normal shadow-[0px_4px_12px_rgba(0,0,0,0.08)] cursor-pointer hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className={labelClass}>{label}</span>
      {children}
    </div>
  );
}
