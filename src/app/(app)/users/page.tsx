'use client';

import { useState } from 'react';
import UsersHero from '@/components/UsersHero';
import UsersTable from '@/components/UsersTable';
import CreateUserDrawer from '@/components/CreateUserDrawer';

export default function UsersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <UsersHero onCreateUser={() => setDrawerOpen(true)} />
      <UsersTable />
      <CreateUserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
