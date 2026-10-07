import HeaderBanner from '@/components/HeaderBanner';
import StatsGrid from '@/components/StatsGrid';
import OrdersChart from '@/components/OrdersChart';
import UpcomingOrders from '@/components/UpcomingOrders';
import CompletionRate from '@/components/CompletionRate';
import ActivityTimeline from '@/components/ActivityTimeline';
import RecentOrdersTable from '@/components/RecentOrdersTable';

export default function Home() {
  return (
    <>
      {/* Header Greeting Banner */}
      <HeaderBanner />

      {/* White Frosted Glass Panel Wrapper */}
      <div style={{ backgroundImage: "url('/dash.png')", backgroundSize: "cover", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}>
        <div className="glass-panel  p-3 md:p-3  bg-white/30 backdrop-blur-lg  p-5 " style={{ backdropFilter: "blur(20px)" }}>

          {/* Main 3-Column Stats & Schedule & Logs Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(360px,360px)] gap-6 items-stretch min-w-0">
            {/* Left Column */}
            <div className="min-w-0">
              <div className='grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,350px)] gap-6'>
                <StatsGrid />
                <UpcomingOrders />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-6'>
                <OrdersChart />
                <CompletionRate />
              </div>
            </div>

            <ActivityTimeline />
          </div>

          {/* Bottom Section: Full Width Recent Orders Table */}
          <div className='mt-6'>
            <RecentOrdersTable />
          </div>
        </div>
      </div>

    </>
  );
}