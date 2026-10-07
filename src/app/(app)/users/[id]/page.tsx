import { notFound } from 'next/navigation';
import UserView from '@/components/UserView';
import { USERS, getUser } from '@/data/users';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return USERS.map((user) => ({ id: user.id }));
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = USERS.find((u) => u.id === id);

  if (!user) {
    notFound();
  }

  return <UserView user={getUser(id)} />;
}
