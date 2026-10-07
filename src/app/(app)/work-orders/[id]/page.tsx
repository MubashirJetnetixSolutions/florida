import { notFound } from 'next/navigation';
import OrderView from '@/components/OrderView';
import { getWorkOrder, WORK_ORDERS } from '@/data/workOrders';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return WORK_ORDERS.map((order) => ({ id: order.id }));
}

export default async function WorkOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = WORK_ORDERS.find((o) => o.id === id);

  if (!order) {
    notFound();
  }

  return <OrderView order={getWorkOrder(id)} />;
}
