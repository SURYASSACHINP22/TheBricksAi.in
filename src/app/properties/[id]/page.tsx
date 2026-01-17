import { properties } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ShieldCheck, ShieldAlert, Shield, MapPin, Building, Route, CheckCircle, XCircle, FileText, Download,
  Heart, GitCompareArrows, MessageSquare, Briefcase, User, Calendar, Tag, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { AmenitiesList } from "@/components/amenities-list";
import { DistanceChart } from "@/components/distance-chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CartesianGrid } from "recharts";

type VerificationProps = {
  status: Property['verificationStatus'];
  note: string;
};

const verificationConfig = {
    VERIFIED: {
        Icon: ShieldCheck,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        title: "Fully Verified Property"
    },
    PARTIALLY_VERIFIED: {
        Icon: ShieldAlert,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        title: "Partially Verified Property"
    },
    USER_DECLARED: {
        Icon: Shield,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        title: "User Declared Property"
    }
}

function VerificationCard({ status, note }: VerificationProps) {
  const { Icon, color, bgColor, borderColor, title } = verificationConfig[status];
  return (
    <Card className={cn(bgColor, borderColor)}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Icon className={cn("h-8 w-8", color)} />
        <CardTitle className={cn("font-headline", color)}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{note}</p>
        {status !== 'VERIFIED' && <p className="mt-2 text-xs text-muted-foreground">Disclaimer: Please conduct your own due diligence before making any decisions.</p>}
      </CardContent>
    </Card>
  );
}


export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.propertyId === params.id);

  if (!property) {
    notFound();
  }

  const chartConfig = {
    price: {
      label: "Price (₹)",
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Main Content */}
          <section>
            <h1 className="font-headline text-4xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="h-5 w-5" />
              <span>{`${property.village}, ${property.taluka}, ${property.city}, ${property.pincode}`}</span>
            </div>
            
            <Card className="overflow-hidden mb-8">
                <Image
                src={property.imageUrl}
                alt={property.title}
                width={1200}
                height={700}
                className="w-full h-auto object-cover max-h-[500px]"
                data-ai-hint={property.imageHint}
                priority
                />
            </Card>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader><CardTitle className="font-headline">Property Overview</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <VerificationCard status={property.verificationStatus} note={property.verificationNote} />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                        <div className="flex items-start gap-3"><Briefcase className="h-5 w-5 mt-0.5 text-primary" /><p><span className="font-semibold text-foreground">Source:</span> {property.source}</p></div>
                        <div className="flex items-start gap-3"><User className="h-5 w-5 mt-0.5 text-primary" /><p><span className="font-semibold text-foreground">Owner:</span> {property.ownerName}</p></div>
                        <div className="flex items-start gap-3"><Tag className="h-5 w-5 mt-0.5 text-primary" /><p><span className="font-semibold text-foreground">Land Type:</span> <Badge variant="secondary">{property.landType}</Badge></p></div>
                        <div className="flex items-start gap-3"><Building className="h-5 w-5 mt-0.5 text-primary" /><p><span className="font-semibold text-foreground">Area:</span> {property.areaSqFt.toLocaleString()} sq. ft.</p></div>
                        <div className="flex items-start gap-3"><Route className="h-5 w-5 mt-0.5 text-primary" /><p className="flex items-center gap-2"><span className="font-semibold text-foreground">Road Access:</span> {property.roadAccess ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</p></div>
                        <div className="flex items-start gap-3"><Info className="h-5 w-5 mt-0.5 text-primary" /><p className="flex items-center gap-2"><span className="font-semibold text-foreground">Corner Plot:</span> {property.cornerPlot ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}</p></div>
                    </div>
                     <Separator />
                     <p className="text-muted-foreground leading-relaxed">{property.boundaryDescription}</p>
                     <Separator />
                     <h3 className="font-headline text-lg font-semibold">Land Record Details</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <p><span className="font-medium text-muted-foreground">Survey No:</span> {property.surveyNumber}</p>
                        <p><span className="font-medium text-muted-foreground">GAT No:</span> {property.gatNumber}</p>
                        <p><span className="font-medium text-muted-foreground">Plot No:</span> {property.plotNumber}</p>
                     </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline">Uploaded Documents</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document Type</TableHead>
                                    <TableHead>Uploaded On</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {property.documents.map(doc => (
                                    <TableRow key={doc.documentId}>
                                        <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> {doc.documentType}</TableCell>
                                        <TableCell>{new Date(doc.uploadedAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6 space-y-6">
                <AmenitiesList amenities={property.amenities} />
                <DistanceChart amenities={property.amenities} />
              </TabsContent>

              <TabsContent value="market" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Price & Market Information</CardTitle>
                        <CardDescription>Historical price trend for this property. Prices are indicative.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                            <AreaChart data={property.priceHistory}>
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
                    </CardContent>
                 </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>

        <div className="lg:col-span-1">
          {/* Sticky Sidebar */}
          <div className="sticky top-24 space-y-6">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardDescription>Starting from</CardDescription>
                    <CardTitle className="font-headline text-4xl">₹{(property.price / 100000).toFixed(2)} Lakhs</CardTitle>
                    <p className="text-muted-foreground">(@ ₹{property.pricePerSqFt.toFixed(0)}/sq.ft)</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <MessageSquare className="mr-2 h-5 w-5" /> Send Enquiry
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full">
                            <Heart className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button variant="outline" className="w-full">
                            <GitCompareArrows className="mr-2 h-4 w-4" /> Compare
                        </Button>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Location on Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Map placeholder</p>
                    </div>
                     <Button variant="outline" className="w-full mt-4"><MapPin className="mr-2 h-4 w-4"/> View on Google Maps</Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

    