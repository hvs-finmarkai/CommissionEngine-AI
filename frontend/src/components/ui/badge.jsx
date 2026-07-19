import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#7C6BFF]/10 text-[#7C6BFF]",
        success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
        warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
        danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        outline: "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge, badgeVariants };
