import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 relative overflow-hidden group cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-gradient-to-br from-teal-900 to-black  hover:text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
        secondary: "bg-black text-white hover:bg-gradient-to-br from-teal-900 to-black  hover:text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      },
      size: {
        sm: "h-8 px-4 py-2 text-xs",
        default: "h-10 px-6 py-3 text-xs",
        lg: "h-12 px-8 py-4 text-sm",
        xl: "h-14 px-10 py-5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  onClick,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      {...props}
    >
      {children}
      
    </Comp>
  );
}

export { Button, buttonVariants }