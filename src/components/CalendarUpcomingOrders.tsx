'use client';

const SLOTS = [
  {
    time: '02:00 am',
    items: [
      { title: 'Order # 121548', time: '12:00 PM' },
      { title: 'Order # 121548', time: '12:00 PM' },
    ],
  },
  {
    time: '08:00 am',
    items: [{ title: 'Order # 121548', time: '12:00 PM' }],
  },
  {
    time: '12:00 am',
    items: [{ title: 'Order # 121548', time: '12:00 PM' }],
  },
];

export default function CalendarUpcomingOrders() {
  return (
    <div className="bg-white border border-[#ECEFF3] rounded-[18px] shadow-[0px_1px_50px_rgba(16,24,40,0.08)] p-5 h-full flex flex-col min-h-[640px] font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="pb-4 mb-1 border-b border-[#EEF1F4]">
        <h3 className="text-[18px] md:text-[20px] font-normal text-[#0B1B34] leading-[30px]">
          Upcoming Orders
        </h3>
      </div>

      <div className="flex items-center justify-between mb-3 px-1.5 py-1.5">
        <span className="text-xs font-normal text-[#98A1AE]">GMT + 5</span>
      </div>

      <div className="flex-1">
        {SLOTS.map((slot, index) => (
          <div
            key={slot.time}
            className={`grid grid-cols-[76px_1fr] gap-2.5 py-4 ${
              index !== SLOTS.length - 1 ? 'border-b border-[#EEF1F4]' : ''
            }`}
          >
            <span className="text-[13px] font-normal text-[#98A1AE] pt-4 whitespace-nowrap text-center">
              {slot.time}
            </span>

            <div className="flex gap-2 min-h-[58px]">
              {slot.items.map((item, itemIndex) => (
                <div
                  key={`${slot.time}-${itemIndex}`}
                  className="flex-1 bg-[#5182EA] hover:bg-[#3F73E0] text-white rounded-[8px] px-2 py-2 shadow-sm cursor-pointer transition-colors"
                >
                  <p className="text-[12px] font-medium leading-tight truncate">{item.title}</p>
                  <p className="text-[11px] text-white/85 mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
