import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BrainCircuit, Info, Calculator, Brick, BarChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const estimatedMaterials = [
  { name: "Cement", quantity: "800 bags", icon: Brick },
  { name: "Steel", quantity: "6 tons", icon: BarChart },
  { name: "Bricks", quantity: "25,000 units", icon: Brick },
  { name: "Sand", quantity: "2,200 cft", icon: Brick },
  { name: "Aggregate", quantity: "1,800 cft", icon: Brick },
];

export default function MaterialEstimationPage() {
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
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="built-up-area">Built-up Area (sq. ft.)</Label>
                        <Input id="built-up-area" type="number" placeholder="e.g., 2000" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="floors">Number of Floors</Label>
                        <Input id="floors" type="number" placeholder="e.g., 2" />
                    </div>
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Calculator className="mr-2 h-5 w-5" />
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
                    <ul className="space-y-4">
                        {estimatedMaterials.map((item) => (
                            <li key={item.name} className="flex justify-between items-center text-lg p-3 bg-background rounded-md">
                                <span className="flex items-center gap-3 font-medium">
                                    <item.icon className="w-5 h-5 text-primary" />
                                    {item.name}
                                </span>
                                <span className="font-bold font-headline">{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <Separator className="my-6"/>
                    <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Estimates Only</AlertTitle>
                        <AlertDescription>
                        These quantities are approximate and for preliminary planning only. Consult a professional for accurate project costing.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
