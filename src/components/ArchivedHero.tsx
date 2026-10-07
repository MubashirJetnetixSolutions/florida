'use client';

import Image from 'next/image';

export default function ArchivedHero() {
  return (
    <div className="relative overflow-hidden rounded-[21px] min-h-[264px] px-[21px]  md:pl-[45px] md:pr-[21px] bg-cover bg-center bg-[url(/backgroundImage.png)] border border-white/70 shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="absolute inset-0 rounded-[21px] bg-white/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 min-h-[216px]">
        <div className="flex flex-col justify-center pt-[30px] pb-2 min-w-0 max-w-xl">
          <h1 className="text-[32px] md:text-[40px] font-normal text-[#0B1B34] tracking-[-1px] leading-[52px]">
            Hello, Colton!
          </h1>
          <p className="mt-1 text-[18px] md:text-[22px] font-normal text-[#286AB8] tracking-[-0.5px] leading-[32px]">
            You can see all your archived orders here!
          </p>
        </div>

        <div className="relative hidden md:flex items-end justify-end flex-1 min-h-[200px] pointer-events-none select-none">
          <div className="relative w-[280px] lg:w-[340px] h-[220px] lg:h-[260px] top-[10px]">
            <Image
              src="/basket.png"
              alt=""
              fill
              className="object-contain object-bottom drop-shadow-[0_12px_40px_rgba(72,143,255,0.2)]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
