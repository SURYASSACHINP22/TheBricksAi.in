import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Property } from '@/lib/types';
import { MapPin, Building, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationIconProps = {
  status: Property['verificationStatus'];
  className?: string;
};

function VerificationIcon({ status, className }: VerificationIconProps) {
  switch (status) {
    case 'VERIFIED':
      return <ShieldCheck className={cn("text-green-500", className)} />;
    case 'PARTIALLY_VERIFIED':
      return <ShieldAlert className={cn("text-yellow-500", className)} />;
    case 'USER_DECLARED':
      return <Shield className={cn("text-gray-400", className)} />;
    default:
      return null;
  }
}

function getVerificationBadgeVariant(status: Property['verificationStatus']): 'default' | 'secondary' | 'outline' | 'destructive' | null | undefined {
    switch (status) {
        case 'VERIFIED':
            return 'default';
        case 'PARTIALLY_VERIFIED':
            return 'secondary';
        case 'USER_DECLARED':
            return 'outline';
        default:
            return 'outline';
    }
}


export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.propertyId}`}>
            <Image
              src={property.imageUrl}
              alt={property.title}
              width={800}
              height={600}
              className="w-full h-48 object-cover"
              data-ai-hint={property.imageHint}
            />
        </Link>
        <Badge 
            variant={getVerificationBadgeVariant(property.verificationStatus)} 
            className="absolute top-3 right-3"
        >
          <VerificationIcon status={property.verificationStatus} className="mr-1 h-3 w-3" />
          {property.verificationStatus.replace('_', ' ')}
        </Badge>
         <Badge className="absolute top-3 left-3" variant="secondary">{property.source}</Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/properties/${property.propertyId}`}>
            <CardTitle className="font-headline text-lg mb-2 leading-tight hover:text-primary transition-colors">
              {property.title}
            </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground flex items-center mb-4">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{property.village}, {property.city}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{property.areaSqFt.toLocaleString()} sq. ft.</span>
            </div>
            <div className='text-sm text-muted-foreground'>
                <span className='font-semibold text-foreground'>₹{(property.pricePerSqFt).toFixed(0)}</span>/sq.ft.
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-background/50 flex items-center justify-between">
        <p className="text-xl font-bold font-headline text-foreground">
          ₹{(property.price / 100000).toFixed(2)} L
        </p>
        <Button asChild>
          <Link href={`/properties/${property.propertyId}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
