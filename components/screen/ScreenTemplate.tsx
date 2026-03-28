import { cn } from "@/lib/utils";

interface ScreenTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export function ScreenTemplate({ children, className }: ScreenTemplateProps) {
  return (
    <div className={cn("min-h-screen bg-[#111012] w-full px-4 pt-24 pb-16", className)}>
      {children}
    </div>
  );
}
