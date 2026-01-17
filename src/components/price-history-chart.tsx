'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { Property } from "@/lib/types";

interface PriceHistoryChartProps {
    priceHistory: Property['priceHistory'];
}

const chartConfig = {
    price: {
        label: "Price (₹)",
    },
};

export function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
    return (
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart data={priceHistory}>
                <defs>
                    <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis 
                    tickFormatter={(value) => `₹${Number(value) / 100000}L`}
                    tickLine={false} axisLine={false} tickMargin={8}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="price" type="natural" fill="url(#fillPrice)" stroke="hsl(var(--primary))" stackId="a" />
            </AreaChart>
        </ChartContainer>
    )
}
