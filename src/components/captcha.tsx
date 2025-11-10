"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CaptchaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  num1: number
  num2: number
}

export const Captcha = React.forwardRef<HTMLInputElement, CaptchaProps>(
  ({ className, num1, num2, ...props }, ref) => {
    return (
      <div className={cn("grid gap-2", className)}>
        <Label htmlFor="captcha">
          Solve: {num1} + {num2} = ?
        </Label>
        <Input
          id="captcha"
          ref={ref}
          type="number"
          placeholder="Your answer"
          required
          {...props}
        />
      </div>
    )
  }
)

Captcha.displayName = "Captcha"
