import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const AuthLayout = ({ className, children }: Props) => {
  return (
    <div className="relative py-12 sm:py-16 lg:pt-10 lg:pb-30 xl:pt-20 xl:pb-36 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 flex-col lg:flex-row lg:gap-20 items-center justify-center">
          <div className={`${className} max-w-md sm:max-w-xl w-full`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
