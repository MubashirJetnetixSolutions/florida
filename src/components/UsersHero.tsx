'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';

type UsersHeroProps = {
  onCreateUser?: () => void;
};

export default function UsersHero({ onCreateUser }: UsersHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[21px] min-h-[264px] px-[21px]  md:pl-[45px] md:pr-[21px] bg-cover bg-center bg-[url(/backgroundImage.png)] border border-white/70 shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="absolute inset-0 rounded-[21px] bg-white/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 min-h-[216px]">
        <div className="flex flex-col justify-between pt-[30px] pb-2 min-w-0 max-w-xl">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#0B1B34] tracking-[-1px] leading-[52px]">
              Hello, Colton!
            </h1>
            <p className="mt-1 text-[18px] md:text-[22px] font-normal text-[#286AB8] tracking-[-0.5px] leading-[32px]">
              Here you can manage your users!
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateUser}
            className="mt-8 inline-flex items-center w-fit gap-2.5 h-14 pl-3.5 pr-6 rounded-[12px] text-white text-base font-medium transition-all duration-300 hover:shadow-lg cursor-pointer active:scale-[0.98]"
            style={{
              backgroundImage:
                'linear-gradient(93deg, rgb(88, 151, 255) 1.1%, rgb(60, 127, 236) 47.8%, rgb(72, 142, 255) 95.2%)',
            }}
          >
            <Plus size={24} strokeWidth={2} />
            Create User
          </button>
        </div>

        <div className="relative hidden md:flex items-end justify-end flex-1 min-h-[200px] pointer-events-none select-none">
          <div className="relative w-[280px] lg:w-[340px] h-[220px] lg:h-[260px] top-[33px]" >
            <Image
              src="/userIcon.png"
              alt=""
              fill
              className="object-contain object-bottom drop-shadow-[0_12px_40px_rgba(72,143,255,0.2)] S"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
