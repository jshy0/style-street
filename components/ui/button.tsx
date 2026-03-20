import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-400 hover:text-white hover:shadow-[0_0_16px_rgba(200,200,200,0.12)]",
        chrome:
          "border border-zinc-500 bg-gradient-to-b from-zinc-200 to-zinc-400 text-zinc-950 font-semibold hover:from-white hover:to-zinc-300 shadow-[0_2px_12px_rgba(200,200,200,0.25)] hover:shadow-[0_4px_20px_rgba(200,200,200,0.35)]",
        outline:
          "border border-zinc-700 bg-transparent text-zinc-300 hover:border-zinc-400 hover:text-white hover:shadow-[0_0_14px_rgba(200,200,200,0.1)]",
        ghost:
          "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
      },
      size: {
        default: "h-10 px-6 py-2 text-sm rounded-md",
        sm: "h-8 px-4 text-xs rounded",
        lg: "h-12 px-8 text-base rounded-md",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
