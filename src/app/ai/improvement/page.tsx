'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, Info, Upload, Wand2, Loader2 } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { planImprovement } from "@/ai/flows/plan-improvement";
import type { PlanImprovementInput, PlanImprovementOutput } from "@/ai/flows/plan-improvement.types";
import { useToast } from '@/hooks/use-toast';

async function improvePlanAction(input: PlanImprovementInput): Promise<PlanImprovementOutput | { error: string }> {
  try {
    // In a real scenario, you might add more checks or logging here
    const result = await planImprovement(input);
    return result;
  } catch (e: any) {
    console.error("AI plan improvement failed:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}

export default function PlanImprovementPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPlanUri, setOriginalPlanUri] = useState<string>(placeholderImages['plan-before'].imageUrl);
  const [result, setResult] = useState<PlanImprovementOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalPlanUri(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a plan image to improve.",
      });
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64data = reader.result as string;
        const response = await improvePlanAction({
            propertyId: 'p001', // Mock property ID
            originalPlanDataUri: base64data,
        });

        if ('error' in response) {
            toast({
                variant: "destructive",
                title: "AI Improvement Failed",
                description: response.error,
            });
        } else {
            setResult(response);
        }
        setIsLoading(false);
    };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <CardHeader className="text-center px-0 max-w-3xl mx-auto">
        <CardTitle className="font-headline text-4xl font-bold flex items-center gap-3 justify-center"><BrainCircuit className="w-10 h-10 text-primary" /> AI Plan Improvement</CardTitle>
        <CardDescription>Upload your existing house plan (PDF/Image) and let our AI suggest improvements for better space utilization, flow, and Vastu compliance.</CardDescription>
      </CardHeader>

      <div className="max-w-xl mx-auto mt-8">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-upload">Upload Plan File</Label>
                <Input id="plan-upload" type="file" accept="image/*,.pdf" onChange={handleFileChange} />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                Improve My Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="font-headline text-2xl mb-4 text-center">Original Plan</h3>
            <Image
              src={originalPlanUri}
              alt="Original house plan"
              width={800}
              height={600}
              className="rounded-lg border bg-muted w-full"
              data-ai-hint={placeholderImages['plan-before'].imageHint}
            />
          </div>
          <div>
            <h3 className="font-headline text-2xl mb-4 text-center">AI-Improved Plan</h3>
             {isLoading ? (
                <div className="aspect-[4/3] w-full bg-muted rounded-lg flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">AI is thinking...</p>
                </div>
             ) : (
                <Image
                  src={result?.improvedPlanDataUri || placeholderImages['plan-after'].imageUrl}
                  alt="AI-improved house plan"
                  width={800}
                  height={600}
                  className="rounded-lg border bg-muted w-full"
                  data-ai-hint={placeholderImages['plan-after'].imageHint}
                />
             )}
          </div>
        </div>

        {(result || isLoading) && (
            <Card className="mt-8">
                <CardHeader><CardTitle className="font-headline">Explanation of Changes</CardTitle></CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                           <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                           <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                           <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground whitespace-pre-wrap">{result?.explanation}</p>
                    )}
                </CardContent>
            </Card>
        )}
      </div>

        <Alert variant="destructive" className="mt-12 max-w-3xl mx-auto">
            <Info className="h-4 w-4" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
            AI suggestions are for conceptual purposes only. Always consult with a qualified architect or civil engineer before making any changes to your house plan.
            </AlertDescription>
        </Alert>
    </div>
  );
}
