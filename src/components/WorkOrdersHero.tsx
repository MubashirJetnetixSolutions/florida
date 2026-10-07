'use client';

import { Layers, Plus } from 'lucide-react';

type StatCard = {
  title: string;
  value: string;
  heights: number[];
  barColor: string;
  barColorMuted: string;
  highlightIndex: number;
};

const STATS: StatCard[] = [
  {
    title: 'Completion Rate',
    value: '74.2%',
    heights: [20, 40, 67, 140, 100, 80, 160, 120],
    barColor: '#84d17a',
    barColorMuted: 'rgba(132,209,122,0.5)',
    highlightIndex: 6,
  },
  {
    title: 'Active Orders',
    value: '740K',
    heights: [67, 20, 40, 120, 160, 80, 100, 140],
    barColor: '#84d17a',
    barColorMuted: 'rgba(132,209,122,0.5)',
    highlightIndex: 4,
  },
  {
    title: 'New Orders',
    value: '740K',
    heights: [20, 120, 67, 100, 140, 80, 160, 40],
    barColor: '#ff3535',
    barColorMuted: 'rgba(248,52,52,0.5)',
    highlightIndex: 2,
  },
];

/** Straight capsule bars — rounded top + bottom, matching Figma (not Apex spike columns). */
function CapsuleBars({
  heights,
  barColor,
  barColorMuted,
  highlightIndex,
}: {
  heights: number[];
  barColor: string;
  barColorMuted: string;
  highlightIndex: number;
}) {
  return (
    <div className="flex items-end gap-2 h-[160px] w-[136px] shrink-0" aria-hidden>
      {heights.map((height, idx) => (
        <div
          key={idx}
          className="w-2.5 rounded-[100px] shrink-0"
          style={{
            height: `${height}px`,
            backgroundColor: idx === highlightIndex ? barColor : barColorMuted,
          }}
        />
      ))}
    </div>
  );
}

type WorkOrdersHeroProps = {
  onNewOrder?: () => void;
};

export default function WorkOrdersHero({ onNewOrder }: WorkOrdersHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[21px] px-[21px] py-6 md:pl-[45px] md:pr-[21px] md:py-6 bg-cover bg-center bg-[url(/backgroundImage.png)] border border-white/70 shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="absolute inset-0 rounded-[21px] bg-white/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row gap-[18px] items-stretch">
        <div className="flex flex-col justify-between pt-[30px] pb-2 min-w-0 xl:flex-1 xl:max-w-[340px]">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#0B1B34] tracking-[-1px] leading-[52px]">
              Hello, Colton!
            </h1>
            <div className="relative mt-1">
              <p className="text-[32px] md:text-[40px] font-normal text-[#286AB8] tracking-[-1px] leading-[52px]">
                Explore your
                <br />
                Orders
                <span className="inline-flex align-middle ml-2 items-center justify-center min-w-[39px] h-[32px] px-2 rounded-[6px] bg-white text-[19px] font-normal text-[#5B6878] tracking-[-1px] leading-none">
                  76
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNewOrder}
            className="mt-8 inline-flex items-center w-fit gap-2.5 h-14 pl-3.5 pr-6 rounded-[12px] text-white text-base font-medium transition-all duration-300 hover:shadow-lg cursor-pointer active:scale-[0.98]"
            style={{
              backgroundImage:
                'linear-gradient(93deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
            }}
          >
            <Plus size={24} strokeWidth={2} />
            New Order
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] flex-1 min-w-0">
          {STATS.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_0px_rgba(0,0,0,0.08)] p-[25px] flex flex-col min-h-[280px] xl:h-[324px] xl:min-w-0"
            >
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="size-12 rounded-[12px] bg-[#F2F5F8] flex items-center justify-center shrink-0">
                  <Layers size={18} className="text-[#5B6878]" strokeWidth={1.75} />
                </div>
                <span className="text-[20px] font-normal text-[#0B1B34] leading-[30px]">
                  {stat.title}
                </span>
              </div>

              <div className="flex flex-1 items-center justify-between gap-3 min-h-0">
                <span className="text-[40px] xl:text-[52px] font-normal text-[#0B1B34] tracking-[-2px] leading-[52px] shrink-0">
                  {stat.value}
                </span>
                <CapsuleBars
                  heights={stat.heights}
                  barColor={stat.barColor}
                  barColorMuted={stat.barColorMuted}
                  highlightIndex={stat.highlightIndex}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
