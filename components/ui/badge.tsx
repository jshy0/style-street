import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider transition-colors border",
  {
    variants: {
      variant: {
        default: "border-zinc-700 bg-zinc-800 text-zinc-300",
        new: "border-zinc-500 bg-gradient-to-r from-zinc-700 to-zinc-600 text-zinc-100",
        hot: "border-orange-800/60 bg-orange-950/80 text-orange-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
