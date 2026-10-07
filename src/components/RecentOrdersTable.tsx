'use client';

import React, { useState } from 'react';
import { PencilLine, Trash2 } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  clientName: string;
  jobLocation: string;
  scheduledOn: string;
  assignedTo: string;
  status: 'In progress' | 'Completed' | 'On hold' | 'Pending';
}

export default function RecentOrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '003423',
      clientName: 'Chris Glasser',
      jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
      scheduledOn: 'Mar 18, 2025',
      assignedTo: 'Joshua Jones',
      status: 'In progress',
    },
    {
      id: '2',
      orderNumber: '003423',
      clientName: 'Chris Glasser',
      jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
      scheduledOn: 'Mar 18, 2025',
      assignedTo: 'Joshua Jones',
      status: 'In progress',
    },
    {
      id: '3',
      orderNumber: '004351',
      clientName: 'Bradley Lawlor',
      jobLocation: '417 Bicetown Road, New York, NY 10018',
      scheduledOn: 'Mar 28, 2025',
      assignedTo: 'Kathy Pacheco',
      status: 'In progress',
    },
    {
      id: '4',
      orderNumber: '004351',
      clientName: 'Bradley Lawlor',
      jobLocation: '417 Bicetown Road, New York, NY 10018',
      scheduledOn: 'Mar 28, 2025',
      assignedTo: 'Kathy Pacheco',
      status: 'In progress',
    },
    {
      id: '5',
      orderNumber: '003423',
      clientName: 'Chris Glasser',
      jobLocation: '1949 Linda Street, West Brunswick Twp, PA 19549',
      scheduledOn: 'Mar 18, 2025',
      assignedTo: 'Joshua Jones',
      status: 'In progress',
    },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((o) => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, id]);
    } else {
      setSelectedOrders(selectedOrders.filter((item) => item !== id));
    }
  };

  return (
    <div className="glass-card rounded-[24px] p-6 border border-white/50 shadow-sm flex flex-col w-full space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-[15px] font-normal text-[#3F434D]">Recent orders</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="w-full text-left border-collapse">
          <thead className='bg-[#F7F9FF] rounded-[12px]'>
            <tr className="border-b border-slate-100  text-[12px] font-medium text-[#9CA3AF]">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedOrders.length === orders.length}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-accent-blue focus:ring-accent-blue/20 cursor-pointer"
                />
              </th>
              <th className="py-3 px-4 font-medium">Order Number</th>
              <th className="py-3 px-4 font-medium">Client Name</th>
              <th className="py-3 px-4 font-medium">Job Location</th>
              <th className="py-3 px-4 font-medium">Scheduled on</th>
              <th className="py-3 px-4 font-medium">Assigned to</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-[13px] text-[#4B5563]">
            {orders.map((order) => {
              const isSelected = selectedOrders.includes(order.id);
              return (
                <tr
                  key={order.id}
                  className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors duration-150 ${isSelected ? 'bg-blue-50/20' : ''}`}
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-accent-blue focus:ring-accent-blue/20 cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-[#1F2937]">{order.orderNumber}</td>
                  <td className="py-4 px-4 font-medium text-[#1F2937]">{order.clientName}</td>
                  <td className="py-4 px-4 font-normal text-[#6B7280] max-w-[300px] truncate">{order.jobLocation}</td>
                  <td className="py-4 px-4 font-normal text-[#6B7280]">{order.scheduledOn}</td>
                  <td className="py-4 px-4 font-normal text-[#4B5563]">{order.assignedTo}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#F97316]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Edit Order"
                        className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-accent-blue hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        <PencilLine size={15} />
                      </button>
                      <button
                        title="Delete Order"
                        className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} />
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
  );
}
