import { notFound } from 'next/navigation';
import OrderView from '@/components/OrderView';
import { ARCHIVED_ORDERS, getArchivedOrder } from '@/data/archivedOrders';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ARCHIVED_ORDERS.map((order) => ({ id: order.id }));
}

export default async function ArchivedOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = ARCHIVED_ORDERS.find((o) => o.id === id);

  if (!order) {
    notFound();
  }

  return <OrderView order={getArchivedOrder(id)} variant="archived" />;
}
