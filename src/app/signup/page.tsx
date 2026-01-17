import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <Logo className="mb-4 justify-center" />
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join BrickAi to find or sell your property with trust.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Sign Up</Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
