'use client';

import { useState } from 'react';
import InventoryHero from '@/components/InventoryHero';
import InventoryTable from '@/components/InventoryTable';
import CreateInventoryDrawer from '@/components/CreateInventoryDrawer';

export default function InventoryPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <InventoryHero onAddItem={() => setDrawerOpen(true)} />
      <InventoryTable />
      <CreateInventoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
