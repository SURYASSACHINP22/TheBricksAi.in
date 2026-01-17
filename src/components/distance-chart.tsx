'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Amenity } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';


export function DistanceChart({ amenities }: { amenities: Amenity[] }) {
  const chartData = amenities.map(a => ({ name: a.name, distance: a.distance, fill: 'hsl(var(--primary))' }));

  return (
    <Card>
        <CardHeader>
            <CardTitle className='font-headline'>Nearby Amenities</CardTitle>
            <CardDescription>Distances in kilometers (km)</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--background))' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="distance" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
