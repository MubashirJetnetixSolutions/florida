'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Trash2,
} from 'lucide-react';
import type { AppUser } from '@/data/users';
import type { Status } from '@/data/workOrders';
import { WORK_ORDERS } from '@/data/workOrders';

type Tab = 'All' | 'Completed' | 'On Hold' | 'In progress';

const TABS: Tab[] = ['All', 'Completed', 'On Hold', 'In progress'];

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

const UPCOMING = [
  {
    time: '02:00 am',
    items: [
      { title: 'Order #12548', time: '12:00 PM' },
      { title: 'Order #12548', time: '12:00 PM' },
    ],
  },
  {
    time: '08:00 am',
    items: [{ title: 'Order #12548', time: '12:00 PM' }],
  },
  {
    time: '12:00 am',
    items: [{ title: 'Order #12548', time: '12:00 PM' }],
  },
];

type UserViewProps = {
  user: AppUser;
};

export default function UserView({ user }: UserViewProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('All');
  const [selected, setSelected] = useState<string[]>([]);

  const orders = useMemo(() => {
    return WORK_ORDERS.filter((o) => tab === 'All' || o.status === tab);
  }, [tab]);

  const allSelected =
    orders.length > 0 && orders.every((o) => selected.includes(o.id));

  return (
    <div className="flex flex-col gap-4 pb-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top section — background image + header + 3 cards */}
      <div className="relative overflow-hidden rounded-[20px] p-4 bg-cover bg-center bg-[url(/backgroundImage.png)] border border-white/70">
        <div className="absolute inset-0 rounded-[20px] bg-white/70 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 px-1">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => router.push('/users')}
                className="size-8 rounded-[5px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center text-[#0B1B34] hover:bg-slate-50 cursor-pointer shrink-0"
                aria-label="Back to users"
              >
                <ChevronLeft size={20} />
              </button>
              <h1 className="text-xl font-normal text-[#0B1B34]">
                User ID: <span className="font-medium">{user.displayId}</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#0B1B34] cursor-pointer hover:bg-slate-50 shadow-sm"
              >
                <PencilLine size={18} />
                Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 h-[45px] w-[115px] pl-3.5 pr-5 rounded-[12px] border border-[#E6EAEF] bg-white text-sm text-[#EF4444] cursor-pointer hover:bg-rose-50 shadow-sm"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px]">
            {/* Profile card */}
            <div className="bg-white rounded-[11px] shadow-[0px_1px_25px_rgba(0,0,0,0.08)] px-[22px] pt-[22px] pb-6 min-h-[220px] flex items-center gap-4">
              <div className="relative size-[96px] rounded-[16px] overflow-hidden bg-slate-100 shrink-0 border border-[#EEF1F4]">
                <Image src={user.avatar} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[22px] font-medium text-[#0B1B34] leading-tight">
                    {user.name}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] bg-[#ECFDF3] text-[#039855] text-xs font-medium">
                    {user.status}
                  </span>
                </div>
                <p className="text-[15px] text-[#5B6878] mt-2">{user.role}</p>
                <p className="text-sm text-[#98A1AE] mt-1.5">Joined on {user.joinedOn}</p>
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-white rounded-[11px] shadow-[0px_1px_25px_rgba(0,0,0,0.08)] px-[22px] pt-[22px] pb-6 min-h-[220px] flex flex-col justify-center gap-5">
              <ContactRow icon={Mail} label="Email Address" value={user.email} />
              <ContactRow icon={Phone} label="Phone Number" value={user.phone} />
              <ContactRow icon={MapPin} label="Address" value={user.address} />
            </div>

            {/* Stats card */}
            <div className=" min-h-[220px] grid grid-cols-2 gap-3">
              <StatTile label="Total Orders" value={user.assignedOrders} />
              <StatTile label="Completed" value={user.completedOrders} />
              <StatTile label="InProgress" value={user.inProgressOrders} />
              <StatTile label="On Hold" value={user.onHoldOrders} />
            </div>
          </div>
        </div>
      </div>

      {/* Orders + upcoming */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        <div className="xl:col-span-8 space-y-4">
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

          <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#F7F9FF] border-y border-[#EEF1F4] text-[15px] font-normal text-[#5B6878]">
                    <th className="py-3.5 px-3 w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={(e) =>
                          setSelected(
                            e.target.checked ? orders.map((o) => o.id) : []
                          )
                        }
                        className="size-[18px] rounded-[5px] border border-[#CFD6DE] cursor-pointer"
                      />
                    </th>
                    <th className="py-3.5 px-3 font-normal">Order Number</th>
                    <th className="py-3.5 px-3 font-normal">Client Name</th>
                    <th className="py-3.5 px-3 font-normal">Address</th>
                    <th className="py-3.5 px-3 font-normal">Scheduled on</th>
                    <th className="py-3.5 px-3 font-normal">Status</th>
                    <th className="py-3.5 px-3 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
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
                        <td className="py-4 px-3 text-[#0B1B34]">
                          <Link
                            href={`/work-orders/${order.id}`}
                            className="hover:text-[#3C7FEC] hover:underline underline-offset-2"
                          >
                            {order.clientName}
                          </Link>
                        </td>
                        <td className="py-4 px-3 max-w-[220px]">{order.jobLocation}</td>
                        <td className="py-4 px-3 whitespace-nowrap">{order.scheduledOn}</td>
                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[13px] font-medium ${statusStyles[order.status]}`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${statusDot[order.status]}`}
                            />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              title="Edit"
                              className="size-[30px] rounded-md text-[#3C7FEC] hover:bg-blue-50 flex items-center justify-center cursor-pointer shadow-sm bg-white border border-slate-100"
                            >
                              <PencilLine size={14} />
                            </button>
                            <button
                              type="button"
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
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-5 h-full min-h-[480px] flex flex-col">
            <div className="pb-4 mb-1 border-b border-[#EEF1F4]">
              <h3 className="text-[18px] font-normal text-[#0B1B34] leading-[30px]">
                Upcoming Orders
              </h3>
            </div>
            <div className="flex items-center mb-3 px-1.5 py-1.5">
              <span className="text-xs font-normal text-[#98A1AE]">GMT + 5</span>
            </div>
            <div className="flex-1">
              {UPCOMING.map((slot, index) => (
                <div
                  key={slot.time}
                  className={`grid grid-cols-[76px_1fr] gap-2.5 py-4 ${
                    index !== UPCOMING.length - 1 ? 'border-b border-[#EEF1F4]' : ''
                  }`}
                >
                  <span className="text-[13px] font-normal text-[#98A1AE] pt-4 whitespace-nowrap text-center">
                    {slot.time}
                  </span>
                  <div className="flex gap-2 min-h-[58px]">
                    {slot.items.map((item, itemIndex) => (
                      <div
                        key={`${slot.time}-${itemIndex}`}
                        className="flex-1 bg-[#5182EA] hover:bg-[#3F73E0] text-white rounded-[8px] px-2 py-2 shadow-sm cursor-pointer transition-colors"
                      >
                        <p className="text-[12px] font-medium leading-tight truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-white/85 mt-2">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-9 rounded-[10px] bg-[#E8F1FF] flex items-center justify-center shrink-0">
        <Icon size={16} className="text-[#3C7FEC]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#98A1AE]">{label}</p>
        <p className="text-sm text-[#0B1B34] mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#EEF1F4] bg-[#F7F9FF] px-3 py-4 flex flex-col items-center justify-center text-center min-h-[88px]">
      <p className="text-xs text-[#98A1AE]">{label}</p>
      <p className="text-[28px] md:text-[32px] font-normal text-[#3C7FEC] leading-none mt-2">
        {value}
      </p>
    </div>
  );
}
