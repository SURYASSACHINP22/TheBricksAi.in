import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BrainCircuit, Info } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";

export default function AIHousePlanningPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div>
          <CardHeader className="px-0">
            <CardTitle className="font-headline text-4xl font-bold flex items-center gap-3"><BrainCircuit className="w-10 h-10 text-primary" /> AI House Planning</CardTitle>
            <CardDescription>Get a conceptual layout for your dream home based on your requirements.
            </CardDescription>
          </CardHeader>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="property">Property</Label>
                        <Select>
                            <SelectTrigger id="property"><SelectValue placeholder="Select your property" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="p002">p002 - Marunji, Pune</SelectItem>
                                <SelectItem value="p003">p003 - Charholi, Pune</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose</Label>
                         <Select>
                            <SelectTrigger id="purpose"><SelectValue placeholder="Self-use or Rental?" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="self-use">Self-Use</SelectItem>
                                <SelectItem value="rental">Rental</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="floors">Floors</Label>
                        <Input id="floors" type="number" placeholder="e.g., 2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rooms">Rooms (BHK)</Label>
                        <Input id="rooms" type="number" placeholder="e.g., 3 for 3BHK" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select>
                            <SelectTrigger id="budget"><SelectValue placeholder="Select budget" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="50L">₹30L - ₹50L</SelectItem>
                                <SelectItem value="75L">₹50L - ₹75L</SelectItem>
                                <SelectItem value="1Cr">₹75L - ₹1Cr</SelectItem>
                                <SelectItem value="1Cr+">Above ₹1Cr</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="style">Style Preference (Optional)</Label>
                        <Input id="style" placeholder="Modern, Traditional, etc." />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="vastu">Vastu Preference (Optional)</Label>
                        <Select>
                            <SelectTrigger id="vastu"><SelectValue placeholder="Select preference" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="strict">Strict</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                                <SelectItem value="none">Not Important</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Generate AI Plan</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 lg:mt-0">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline">Conceptual Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <Image 
                        src={placeholderImages['ai-plan-2'].imageUrl}
                        alt="AI generated house plan"
                        width={800}
                        height={600}
                        className="rounded-lg border bg-muted"
                        data-ai-hint={placeholderImages['ai-plan-2'].imageHint}
                    />
                    <div className="text-left space-y-4 pt-4">
                        <h4 className="font-semibold">Key Features:</h4>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                            <li>3 BHK layout with attached bathrooms.</li>
                            <li>East-facing entrance as per Vastu.</li>
                            <li>Open kitchen and living area for modern feel.</li>
                            <li>Dedicated parking space.</li>
                        </ul>
                    </div>
                     <Alert variant="destructive" className="mt-6">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important Disclaimer</AlertTitle>
                        <AlertDescription>
                        This is a concept design generated by AI. Final approval and detailed plans are required from licensed professionals like architects and civil engineers.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}

    