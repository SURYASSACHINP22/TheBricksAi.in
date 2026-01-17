import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Amenity, AmenityCategory } from '@/lib/types';
import { Hospital, School, Bus, ShoppingCart, PenSquare, Star, Clock, MapPin } from 'lucide-react';
import React from 'react';

const amenityIcons: Record<AmenityCategory, React.ElementType> = {
  Hospital: Hospital,
  School: School,
  Transport: Bus,
  Grocery: ShoppingCart,
  Stationery: PenSquare,
};

function AmenityItem({ amenity }: { amenity: Amenity }) {
  const Icon = amenityIcons[amenity.category];

  return (
    <li className="flex items-start gap-4 py-4">
      <div className="bg-primary/10 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold">{amenity.name}</h3>
            <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{amenity.rating.toFixed(1)}</span>
            </div>
        </div>
        <p className="text-sm text-muted-foreground">{amenity.category}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> {amenity.distance} km</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {amenity.travelTime} min drive</span>
        </div>
      </div>
    </li>
  );
}

export function AmenitiesList({ amenities }: { amenities: Amenity[] }) {
    const sortedAmenities = [...amenities].sort((a, b) => a.distance - b.distance);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>What's Nearby?</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {sortedAmenities.map((amenity) => (
            <AmenityItem key={amenity.name} amenity={amenity} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
