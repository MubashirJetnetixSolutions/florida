'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Archive,
  Users,
  UserSquare2,
  Boxes,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Updates have been made to your profile',
    body: 'You changed your profile',
    actions: true,
  },
  {
    id: '2',
    title: 'User Created',
    body: 'A new user have been created.',
  },
  {
    id: '3',
    title: 'Order Completed',
    body: 'Order number 1234 was marked completed by Amir Khan',
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notificationsOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNotificationsOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [notificationsOpen]);

  const menuItems = [
    { href: '/', name: 'Dashboard', icon: LayoutDashboard },
    { href: '/work-orders', name: 'Work Orders', icon: Briefcase, badge: 5 },
    { href: '/calendars', name: 'Calendars', icon: Calendar },
    { href: '/archived', name: 'Archived', icon: Archive },
    { href: '/users', name: 'Users', icon: Users },
    { href: '/clients', name: 'Clients', icon: UserSquare2 },
    { href: '/inventory', name: 'Inventory', icon: Boxes },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen gap-3 mt-4 pb-[30px] ml-4 transition-all duration-300 ease-in-out z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col glass-sidebar items-center justify-center p-5 border-b border-slate-100 rounded-[12px]">
        <div className="relative flex flex-col items-center justify-center w-full py-2 px-2 gap-2">
          <div className="flex flex-col items-center justify-center">
            <Image src="/logo.png" alt="Colton Logo" width={48} height={48} />
            {!collapsed && (
              <span className="font-medium text-md text-[#468CFC] tracking-wider mt-1">
                Florida Builders
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:shadow-sm transition-all duration-200 cursor-pointer shadow-sm"
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto glass-sidebar rounded-[12px]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center w-full gap-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                collapsed ? 'px-2 py-2' : 'px-3 py-3'
              } ${
                isActive
                  ? 'bg-white text-[#468CFC] font-thin'
                  : 'text-slate-500 font-thin'
              }`}
            >
              <span
                className={`rounded-lg ${
                  isActive ? 'bg-[#5897FF] p-2' : 'bg-white p-[10px]'
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-200 group-hover:scale-105 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-slate-500'
                  }`}
                />
              </span>

              {!collapsed && (
                <>
                  <span className="truncate flex-1">{item.name}</span>
                  {'badge' in item && item.badge ? (
                    <span className="ml-auto inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-slate-300/80 text-[10px] font-bold text-slate-600">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="relative p-4 border-t border-slate-100 glass-sidebar rounded-[12px]">
        <div
          className={`grid ${collapsed ? 'grid-cols-1 gap-3' : 'grid-cols-4 gap-2'}`}
        >
          <Link
            href="/settings"
            title="Settings"
            className={`w-10 h-10 mx-auto rounded-xl border flex items-center justify-center transition-all shadow-sm ${
              pathname === '/settings' || pathname.startsWith('/settings/')
                ? 'bg-[#5897FF] border-[#5897FF] text-white'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Settings size={16} />
          </Link>

          <div className="relative mx-auto" ref={notificationsRef}>
            <button
              title="Notifications"
              type="button"
              aria-expanded={notificationsOpen}
              aria-haspopup="dialog"
              onClick={() => setNotificationsOpen((open) => !open)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all relative cursor-pointer shadow-sm ${
                notificationsOpen
                  ? 'bg-[#5897FF] border-[#5897FF] text-white'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Bell size={16} />
              {!notificationsOpen ? (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent-orange" />
              ) : null}
            </button>

            {notificationsOpen ? (
              <div
                role="dialog"
                aria-label="Notifications"
                className={`absolute bottom-[calc(100%+12px)] z-50 w-[min(320px,calc(100vw-2rem))] bg-white border border-[#E6EAEF] rounded-[14px] shadow-[0px_12px_40px_rgba(16,24,40,0.14)] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] ${
                  collapsed
                    ? 'left-1/2 -translate-x-1/2'
                    : 'left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0'
                }`}
              >
                <div className="flex flex-col">
                  {NOTIFICATIONS.map((item, index) => (
                    <div
                      key={item.id}
                      className={`group px-4 py-3.5 bg-white hover:bg-[#EAF2FF] transition-colors ${
                        index < NOTIFICATIONS.length - 1
                          ? 'border-b border-[#EEF1F4]'
                          : ''
                      }`}
                    >
                      <p className="text-[14px] font-medium text-[#0B1B34] leading-5">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[13px] font-normal text-[#5B6878] leading-5">
                        {item.body}
                      </p>
                      {item.actions ? (
                        <div className="mt-3 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setNotificationsOpen(false)}
                            className="text-[13px] font-normal text-[#98A1AE] hover:text-[#5B6878] cursor-pointer"
                          >
                            Dismiss
                          </button>
                          <button
                            type="button"
                            className="text-[13px] font-medium text-[#3C7FEC] hover:underline cursor-pointer"
                          >
                            View changes
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-[#EEF1F4]">
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="w-full h-10 rounded-[10px] border border-[#E6EAEF] bg-[#F7F9FF] text-[14px] font-medium text-[#5B6878] hover:bg-[#EDF1FA] cursor-pointer"
                  >
                    View All
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button
            title="User Profile"
            type="button"
            className="w-10 h-10 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <User size={16} />
          </button>
          <Link
            href="/login"
            title="Logout"
            className="w-10 h-10 mx-auto rounded-xl bg-white border border-slate-200 flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer shadow-sm"
          >
            <LogOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
