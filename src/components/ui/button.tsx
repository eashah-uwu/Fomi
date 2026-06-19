import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap border-0 text-sm font-semibold outline-none transition-[background,box-shadow,color,transform] duration-200 disabled:pointer-events-none disabled:opacity-70 focus-visible:ring-4 focus-visible:ring-accent/20 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-accent-button text-surface shadow-accent-button hover:bg-accent-strong",
        ghost: "bg-transparent text-foreground hover:bg-accent/10",
        soft: "bg-surface/80 text-control shadow-control hover:bg-surface",
        white: "bg-surface text-copy shadow-control-raised hover:bg-surface/90",
      },
      size: {
        default: "h-10 px-4",
        icon: "size-8 p-0",
        nav: "min-h-8 rounded-full p-0",
        chip: "h-[26px] rounded-full px-2 text-[9px]",
        pill: "h-[33px] rounded-full px-5 text-sm",
      },
      radius: {
        sm: "rounded-lg",
        md: "rounded-xl",
        pill: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "pill",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, radius, className }));

    if (asChild) {
      return <Slot.Root className={classes} ref={ref} {...props} />;
    }

    return <button className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
