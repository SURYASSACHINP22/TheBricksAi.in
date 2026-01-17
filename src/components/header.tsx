import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, BrainCircuit } from 'lucide-react';
import { Logo } from './logo';
import { AuthButton } from './auth-button';

const navLinks = [
  { href: '/', label: 'Buy' },
  { href: '/sell', label: 'Sell' },
  { href: '/my-properties', label: 'My Properties' },
];

const aiToolsLinks = [
    { href: '/ai/planning', label: 'AI House Planning' },
    { href: '/ai/improvement', label: 'Plan Improvement' },
    { href: '/ai/estimation', label: 'Material Estimation' },
];


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground p-0 h-auto">
                  AI Tools <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {aiToolsLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>
                            <BrainCircuit className="mr-2 h-4 w-4" />
                            {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <AuthButton />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <p className="text-lg font-medium text-foreground">AI Tools</p>
                   <div className="flex flex-col gap-4 pl-4">
                    {aiToolsLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-muted-foreground">
                            {link.label}
                        </Link>
                    ))}
                   </div>
                </nav>
                <div className="mt-auto">
                    <AuthButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
