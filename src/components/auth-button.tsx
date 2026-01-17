git init
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from 'lucide-react';

export function AuthButton() {
  // In a real app, you'd use a hook like useUser() from an auth provider
  const isLoggedIn = false; 

  if (isLoggedIn) {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/my-properties">
          <User />
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Log In</Link>
      </Button>
      <Button asChild className='bg-accent hover:bg-accent/90 text-accent-foreground'>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
