'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { Amenity } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  distance: {
    label: "Distance (km)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


export function DistanceChart({ amenities }: { amenities: Amenity[] }) {
  const chartData = amenities.map(a => ({ name: a.name, distance: a.distance, fill: 'hsl(var(--primary))' }));

  return (
    <Card>
        <CardHeader>
            <CardTitle className='font-headline'>Nearby Amenities</CardTitle>
            <CardDescription>Distances in kilometers (km)</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 15)}
                  className="[&>text]:fill-muted-foreground"
                />
                <XAxis dataKey="distance" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="distance" radius={5} />
              </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
}
