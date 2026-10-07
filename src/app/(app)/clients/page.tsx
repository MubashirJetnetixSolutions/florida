'use client';

import { useState } from 'react';
import ClientsHero from '@/components/ClientsHero';
import ClientsTable from '@/components/ClientsTable';
import CreateClientDrawer from '@/components/CreateClientDrawer';

export default function ClientsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ClientsHero onAddClient={() => setDrawerOpen(true)} />
      <ClientsTable />
      <CreateClientDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
