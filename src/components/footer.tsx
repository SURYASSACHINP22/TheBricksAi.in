import { Logo } from "./logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Building trust in property transactions.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <p>&copy; {new Date().getFullYear()} BrickAi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
