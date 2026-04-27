
import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Input as ShadcnInput } from "@/components/ui/input";
import "@/components/ui/8bit/styles/retro.css";

export const inputVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

export interface BitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, BitInputProps>(function Input(props, ref) {
  const { className, font } = props;
  return (
    <div
      className={cn(
        "relative border-y-6 border-foreground dark:border-ring p-0! flex items-center",
        className
      )}
    >
      <ShadcnInput
        {...props}
        ref={ref}
        className={cn(
          "rounded-none ring-0 w-full!",
          font !== "normal" && "retro",
          className
        )}
      />
      <div
        className="absolute inset-0 border-x-6 -mx-1.5 border-foreground dark:border-ring pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
});

export { Input };
