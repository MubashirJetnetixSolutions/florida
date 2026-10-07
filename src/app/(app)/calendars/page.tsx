'use client';

import { useState } from 'react';
import CalendarHero from '@/components/CalendarHero';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import CalendarUpcomingOrders from '@/components/CalendarUpcomingOrders';
import CalendarCreateOrderDrawer from '@/components/CalendarCreateOrderDrawer';

export default function CalendarsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <CalendarHero onNewOrder={() => setDrawerOpen(true)} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-8">
          <MonthlyCalendar />
        </div>
        <div className="xl:col-span-4">
          <CalendarUpcomingOrders />
        </div>
      </div>

      <CalendarCreateOrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
