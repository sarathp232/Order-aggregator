"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Captcha } from "@/components/captcha"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [captchaValue, setCaptchaValue] = React.useState("")
  const [captchaNumbers, setCaptchaNumbers] = React.useState({ num1: 0, num2: 0 })

  React.useEffect(() => {
    // Generate numbers on client-side to avoid hydration mismatch
    setCaptchaNumbers({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
    })
  }, [])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    
    const expectedAnswer = captchaNumbers.num1 + captchaNumbers.num2;
    if (parseInt(captchaValue, 10) !== expectedAnswer) {
      toast({
        variant: "destructive",
        title: "Invalid CAPTCHA",
        description: "Please solve the math problem correctly.",
      });
      // Regenerate numbers
      setCaptchaNumbers({
        num1: Math.floor(Math.random() * 10) + 1,
        num2: Math.floor(Math.random() * 10) + 1,
      });
      setCaptchaValue("");
      return;
    }

    // Mock sign in and redirect
    router.push("/dashboard/accounts")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <div className="absolute top-4 left-4">
        <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-foreground"
          >
            <Package2 className="h-6 w-6 text-primary" />
            <span className="sr-only">Order Aggregator</span>
          </Link>
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Captcha
              num1={captchaNumbers.num1}
              num2={captchaNumbers.num2}
              value={captchaValue}
              onChange={(e) => setCaptchaValue(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
