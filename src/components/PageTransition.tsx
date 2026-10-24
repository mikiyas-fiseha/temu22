import { forwardRef } from 'react';

export const PageTransition = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 w-full h-full bg-[#171717] z-[9990] pointer-events-none scale-y-0 origin-bottom flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-2 text-[#F5F3EE]">
        <span className="font-editorial text-2xl font-bold tracking-tight">PROLIQ</span>
        <span className="font-mono-subtle text-[10px] tracking-[0.3em] text-[#8A7E72] uppercase">
          STUDIO
        </span>
      </div>
    </div>
  );
});

PageTransition.displayName = 'PageTransition';
