'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function OrdersChart() {
  const chartOptions: any = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '80%',
        distributed: true,
      },
    },
    colors: [
      '#e2e8f0', // Jan
      '#e2e8f0', // Feb
      '#e2e8f0', // Mar
      '#e2e8f0', // Apr
      '#e2e8f0', // May
      '#e2e8f0', // Jun
      '#e2e8f0', // Jul
      '#e2e8f0', // Aug
      '#e2e8f0', // Sep
      '#3E82EF', // Oct (Active month highlighted in bright blue)
      '#e2e8f0', // Nov
      '#e2e8f0', // Dec
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '11px',
          fontWeight: 600,
        },
      },

    },
    yaxis: {
      show: false,
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function (val: number) {
          return val + " orders";
        }
      }
    }
  };

  const chartSeries = [{
    name: 'Orders',
    data: [35, 45, 30, 60, 50, 40, 55, 75, 45, 95, 60, 50]
  }];

  return (
    <div className="glass-card rounded-[24px] p-6 border border-white/50 shadow-sm flex flex-col justify-between h-[340px]">
      <div>
        <h3 className="text-sm font-normal text-[#3F434D] tracking-tight">Orders per month</h3>
      </div>
      <div className="flex-1 w-full mt-4 min-h-[220px]">
        {/* Render ApexCharts inside dynamic component wrapper */}
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
