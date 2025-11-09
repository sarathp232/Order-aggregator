"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function SignUpPage() {
    const router = useRouter()

    const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault()
      // Mock sign up and redirect
      router.push("/dashboard")
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
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
            Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
                </div>
            </div>
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
                Create an account
            </Button>
            <Button variant="outline" className="w-full" type="button">
                Sign up with Google
            </Button>
            </form>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
                Sign in
            </Link>
            </div>
        </CardContent>
        </Card>
     </div>
  )
}
