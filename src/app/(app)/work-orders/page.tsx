'use client';

import { useState } from 'react';
import WorkOrdersHero from '@/components/WorkOrdersHero';
import WorkOrdersTable from '@/components/WorkOrdersTable';
import CreateOrderDrawer from '@/components/CreateOrderDrawer';

export default function WorkOrdersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <WorkOrdersHero onNewOrder={() => setDrawerOpen(true)} />
      <WorkOrdersTable />
      <CreateOrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
