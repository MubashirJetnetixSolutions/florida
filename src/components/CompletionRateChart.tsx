'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function CompletionRateChart() {
  const percentage = 62.3;
  const remaining = 100 - percentage;

  // Create multiple small segments for the filled portion to get the "pill" look
  const segmentCount = 15;
  const segmentValue = percentage / segmentCount;
  const filledSegments = Array(segmentCount).fill(segmentValue);

  const data = {
    datasets: [
      {
        data: [...filledSegments, remaining],
        backgroundColor: [
          ...Array(segmentCount).fill('#4A8AEB'),
          '#EAECF0',
        ],
        borderWidth: 0,
        spacing: 4,
        borderRadius: 20,
        circumference: 180,
        rotation: -90,
        cutout: '70%',
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  // Center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart: any) {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.font = "700 28px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = '#0F2B5B';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}%`, width / 2, height * 0.68);
      ctx.restore();
    },
  };

  return (
    <div style={{ width: '220px', height: '130px', position: 'relative' }}>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}
