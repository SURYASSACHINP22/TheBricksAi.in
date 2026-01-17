'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, Info, Loader2, Wand2, Check, Sparkles, Pencil, ArrowLeft, Download, Building, Home, Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { 
  generateCivilConcept, CivilConceptInput, CivilConceptOutput,
  generateArchitecturalConcept, ArchitecturalConceptInput, ArchitecturalConceptOutput,
  generateInteriorConcept, InteriorConceptInput, InteriorConceptOutput
} from '@/ai/flows/staged-house-planning';

type Stage = 'draft' | 'civil' | 'architecture' | 'interior' | 'finalized';
type Status = 'pending' | 'generated' | 'approved' | 'revision';

const stageConfig = {
  draft: { title: "Requirements", Icon: Pencil },
  civil: { title: "Civil Concept", Icon: Building },
  architecture: { title: "Architectural Concept", Icon: Home },
  interior: { title: "Interior Design", Icon: Paintbrush },
  finalized: { title: "Finalized", Icon: Check },
};

async function generateCivilAction(input: CivilConceptInput): Promise<CivilConceptOutput | { error: string }> {
  try {
    return await generateCivilConcept(input);
  } catch (e: any) {
    console.error("AI civil concept generation failed:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}

async function generateArchitecturalAction(input: ArchitecturalConceptInput): Promise<ArchitecturalConceptOutput | { error: string }> {
  try {
    return await generateArchitecturalConcept(input);
  } catch (e: any) {
    console.error("AI architectural concept generation failed:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}

async function generateInteriorAction(input: InteriorConceptInput): Promise<InteriorConceptOutput | { error: string }> {
  try {
    return await generateInteriorConcept(input);
  } catch (e: any) {
    console.error("AI interior concept generation failed:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}

export default function StagedAIHousePlanningPage() {
    const [currentStage, setCurrentStage] = useState<Stage>('draft');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const [formValues, setFormValues] = useState<CivilConceptInput>({
        propertyDetails: 'p002 - Marunji, Pune',
        purpose: 'self-use',
        floors: 2,
        rooms: 3,
        budgetRange: '75L',
        stylePreference: 'Modern',
        vastuPreference: 'flexible',
    });

    const [civilPlan, setCivilPlan] = useState<CivilConceptOutput | null>(null);
    const [civilStatus, setCivilStatus] = useState<Status>('pending');
    const [archPlan, setArchPlan] = useState<ArchitecturalConceptOutput | null>(null);
    const [archStatus, setArchStatus] = useState<Status>('pending');
    const [interiorPlan, setInteriorPlan] = useState<InteriorConceptOutput | null>(null);
    const [interiorStatus, setInteriorStatus] = useState<Status>('pending');
    
    const handleGenerateCivil = async () => {
        setIsLoading(true);
        const result = await generateCivilAction(formValues);
        setIsLoading(false);
        if('error' in result) {
            toast({ variant: 'destructive', title: 'Error Generating Civil Plan', description: result.error });
        } else {
            setCivilPlan(result);
            setCivilStatus('generated');
            setCurrentStage('civil');
            toast({ title: 'Civil Concept Generated!', description: 'Please review the conceptual civil layout.' });
        }
    };

    const handleApproveCivil = async () => {
        setCivilStatus('approved');
        setCurrentStage('architecture');
        setIsLoading(true);
        const result = await generateArchitecturalAction({ approvedCivilConcept: civilPlan! });
        setIsLoading(false);
        if('error' in result) {
            toast({ variant: 'destructive', title: 'Error Generating Architectural Plan', description: result.error });
            setCurrentStage('civil'); // Revert on error
            setCivilStatus('generated');
        } else {
            setArchPlan(result);
            setArchStatus('generated');
            toast({ title: 'Architectural Concept Generated!', description: 'Please review the architectural details.' });
        }
    };

    const handleApproveArch = async () => {
        setArchStatus('approved');
        setCurrentStage('interior');
        setIsLoading(true);
        const result = await generateInteriorAction({ approvedArchitecturalConcept: archPlan!, civilConcept: civilPlan! });
        setIsLoading(false);
        if('error' in result) {
            toast({ variant: 'destructive', title: 'Error Generating Interior Plan', description: result.error });
            setCurrentStage('architecture'); // Revert on error
            setArchStatus('generated');
        } else {
            setInteriorPlan(result);
            setInteriorStatus('generated');
            toast({ title: 'Interior Design Concept Generated!', description: 'Please review the final design concepts.' });
        }
    };

    const handleApproveInterior = () => {
        setInteriorStatus('approved');
        setCurrentStage('finalized');
        toast({ title: 'Plan Finalized!', description: 'Your complete house plan has been saved.' });
    };

    const getStatusBadge = (status: Status) => {
        switch(status) {
            case 'pending': return 'bg-gray-100 text-gray-500';
            case 'generated': return 'bg-blue-100 text-blue-600';
            case 'approved': return 'bg-green-100 text-green-600';
            case 'revision': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-500';
        }
    }

    const renderConceptCard = (title: string, content: Record<string, any> | null, disclaimer: string) => {
        if (!content) return null;
        return (
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(content).map(([key, value]) => {
                        if (key === 'disclaimer' || key === 'conceptualImagePrompt') return null;
                        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={key}>
                                <h4 className="font-semibold text-sm text-muted-foreground">{formattedKey}</h4>
                                <p className="text-foreground whitespace-pre-wrap">{value}</p>
                            </div>
                        )
                    })}
                    <Separator />
                    <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Disclaimer</AlertTitle>
                        <AlertDescription>{disclaimer}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }
    
    return (
    <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
            <CardHeader className="text-center px-0">
                <CardTitle className="font-headline text-4xl font-bold flex items-center gap-3 justify-center"><BrainCircuit className="w-10 h-10 text-primary" /> AI House Planning Workflow</CardTitle>
                <CardDescription>Follow the step-by-step process to generate your dream home. You are in complete control.</CardDescription>
            </CardHeader>
            
            {/* Stepper */}
            <div className="flex justify-center items-center my-8">
                {Object.keys(stageConfig).filter(k => k !== 'finalized').map((stageKey, index, arr) => {
                    const stageInfo = stageConfig[stageKey as keyof typeof stageConfig];
                    const isCompleted = (stageKey === 'draft' && currentStage !== 'draft') ||
                                        (stageKey === 'civil' && (currentStage === 'architecture' || currentStage === 'interior' || currentStage === 'finalized')) ||
                                        (stageKey === 'architecture' && (currentStage === 'interior' || currentStage === 'finalized')) ||
                                        (stageKey === 'interior' && currentStage === 'finalized');
                    const isActive = stageKey === currentStage;
                    return (
                        <div key={stageKey} className="flex items-center">
                            <div className="flex flex-col items-center gap-2">
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border-2",
                                    isCompleted ? 'bg-primary text-primary-foreground border-primary' : '',
                                    isActive ? 'border-primary' : '',
                                )}>
                                    {isCompleted ? <Check/> : <stageInfo.Icon/>}
                                </div>
                                <p className={cn("text-sm", isActive && "font-bold text-primary")}>{stageInfo.title}</p>
                            </div>
                            {index < arr.length - 1 && <div className="w-16 mx-4 h-0.5 bg-border"></div>}
                        </div>
                    )
                })}
            </div>

            <div className="mt-12 space-y-8">
                {/* Stage: Draft / Requirements */}
                {currentStage === 'draft' && (
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Step 1: Define Your Requirements</CardTitle></CardHeader>
                        <CardContent>
                          <form className="space-y-6" onSubmit={e => {e.preventDefault(); handleGenerateCivil();}}>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div><Label>Property</Label><p className="text-sm font-semibold">{formValues.propertyDetails}</p></div>
                                <div><Label>Purpose</Label><p className="text-sm font-semibold">{formValues.purpose}</p></div>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="floors">Floors</Label>
                                    <Input id="floors" type="number" value={formValues.floors} onChange={e => setFormValues({...formValues, floors: Number(e.target.value)})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rooms">Rooms (BHK)</Label>
                                    <Input id="rooms" type="number" value={formValues.rooms} onChange={e => setFormValues({...formValues, rooms: Number(e.target.value)})}/>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="budget">Budget Range</Label>
                                    <Select value={formValues.budgetRange} onValueChange={val => setFormValues({...formValues, budgetRange: val})}>
                                        <SelectTrigger id="budget"><SelectValue/></SelectTrigger>
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
                                    <Input id="style" value={formValues.stylePreference} onChange={e => setFormValues({...formValues, stylePreference: e.target.value})} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="vastu">Vastu Preference (Optional)</Label>
                                    <Select value={formValues.vastuPreference} onValueChange={val => setFormValues({...formValues, vastuPreference: val})}>
                                        <SelectTrigger id="vastu"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="strict">Strict</SelectItem>
                                            <SelectItem value="flexible">Flexible</SelectItem>
                                            <SelectItem value="none">Not Important</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />} Generate Civil Concept
                            </Button>
                          </form>
                        </CardContent>
                    </Card>
                )}
                
                {/* Stage: Civil */}
                {currentStage === 'civil' && (
                    <div>
                        {renderConceptCard('Civil Engineering Concept', civilPlan, civilPlan?.disclaimer || '')}
                        <div className="mt-6 flex justify-end gap-4">
                            <Button variant="outline" disabled={isLoading}><Pencil/> Request Changes</Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={handleApproveCivil} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin"/> : <Sparkles/>} Approve & Generate Architecture
                            </Button>
                        </div>
                    </div>
                )}

                {/* Stage: Architecture */}
                {currentStage === 'architecture' && (
                     <div>
                        {renderConceptCard('Architectural Concept', archPlan, archPlan?.disclaimer || '')}
                        <div className="mt-6 flex justify-between gap-4">
                            <Button variant="ghost" onClick={() => setCurrentStage('civil')} disabled={isLoading}><ArrowLeft/> Go Back to Civil</Button>
                            <div className="flex gap-4">
                                <Button variant="outline" disabled={isLoading}><Pencil/> Request Changes</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleApproveArch} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin"/> : <Sparkles/>} Approve & Generate Interior Design
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage: Interior */}
                {currentStage === 'interior' && (
                     <div>
                        {renderConceptCard('Interior Design Concept', interiorPlan, interiorPlan?.disclaimer || '')}
                         {interiorPlan?.conceptualImagePrompt && (
                             <Card className="mt-4">
                                 <CardHeader><CardTitle className="font-headline">Conceptual 3D View</CardTitle></CardHeader>
                                 <CardContent>
                                     <p className="text-sm text-muted-foreground mb-4">You can use the following prompt with an image generation tool to visualize your space:</p>
                                     <Textarea readOnly value={interiorPlan.conceptualImagePrompt} rows={3} />
                                 </CardContent>
                             </Card>
                         )}
                        <div className="mt-6 flex justify-between gap-4">
                            <Button variant="ghost" onClick={() => setCurrentStage('architecture')} disabled={isLoading}><ArrowLeft/> Go Back to Architecture</Button>
                            <div className="flex gap-4">
                                <Button variant="outline" disabled={isLoading}><Pencil/> Request Changes</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleApproveInterior} disabled={isLoading}>
                                    <Sparkles/> Finalize Plan
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stage: Finalized */}
                {currentStage === 'finalized' && (
                    <Card className="text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                            <Check size={40}/>
                        </div>
                        <CardTitle className="font-headline mt-6">Plan Finalized!</CardTitle>
                        <CardDescription className="mt-2 max-w-md mx-auto">
                            Your conceptual house plan is complete and saved. You can now download the generated concepts or share them with your architect.
                        </CardDescription>
                        <CardContent className="mt-6">
                            <Button size="lg"><Download/> Download All Plans</Button>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    </div>
    );
}
