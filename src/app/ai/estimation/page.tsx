'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BrainCircuit, Info, Calculator, ToyBrick, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { estimateMaterials } from "@/ai/flows/material-estimation";
import type { MaterialEstimationInput, MaterialEstimationOutput } from "@/ai/flows/material-estimation.types";


async function estimateMaterialsAction(input: MaterialEstimationInput): Promise<MaterialEstimationOutput | { error: string }> {
  try {
    const result = await estimateMaterials(input);
    return result;
  } catch (e: any) {
    console.error("AI material estimation failed:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}


export default function MaterialEstimationPage() {
    const [builtUpArea, setBuiltUpArea] = useState<number | ''>(2000);
    const [floors, setFloors] = useState<number | ''>(2);
    const [result, setResult] = useState<MaterialEstimationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!builtUpArea || !floors) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide both built-up area and number of floors.',
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        const response = await estimateMaterialsAction({
            builtUpArea: Number(builtUpArea),
            floors: Number(floors),
        });

        if ('error' in response) {
            toast({
                variant: 'destructive',
                title: 'Estimation Failed',
                description: response.error,
            });
        } else {
            setResult(response);
        }
        setIsLoading(false);
    }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
          <CardHeader className="text-center px-0">
            <CardTitle className="font-headline text-4xl font-bold flex items-center gap-3 justify-center"><BrainCircuit className="w-10 h-10 text-primary" /> Material Estimation</CardTitle>
            <CardDescription>Get approximate quantities of key materials for your construction project.</CardDescription>
          </CardHeader>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="built-up-area">Built-up Area (sq. ft.)</Label>
                        <Input id="built-up-area" type="number" placeholder="e.g., 2000" value={builtUpArea} onChange={e => setBuiltUpArea(e.target.value === '' ? '' : Number(e.target.value))} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="floors">Number of Floors</Label>
                        <Input id="floors" type="number" placeholder="e.g., 2" value={floors} onChange={e => setFloors(e.target.value === '' ? '' : Number(e.target.value))} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                        Estimate Materials
                    </Button>
                </form>
                </CardContent>
            </Card>

            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="font-headline">Estimated Quantities</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                         <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                         </div>
                    ) : result ? (
                        <>
                        <ul className="space-y-4">
                            {result.materials.map((item) => (
                                <li key={item.name} className="flex justify-between items-center text-lg p-3 bg-background rounded-md">
                                    <span className="flex items-center gap-3 font-medium">
                                        <ToyBrick className="w-5 h-5 text-primary" />
                                        {item.name}
                                    </span>
                                    <span className="font-bold font-headline">{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <Separator className="my-6"/>
                        <Alert variant="destructive">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Disclaimer</AlertTitle>
                            <AlertDescription>
                            {result.explanation}
                            </AlertDescription>
                        </Alert>
                        </>
                    ) : (
                         <div className="text-center text-muted-foreground py-16">
                            <p>Enter your project details to see the estimation.</p>
                         </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
