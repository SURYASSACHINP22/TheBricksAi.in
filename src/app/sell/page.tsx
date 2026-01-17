"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required."),
  surveyNumber: z.string().min(1, "Survey number is required."),
  gatNumber: z.string().min(1, "GAT number is required."),
  plotNumber: z.string().min(1, "Plot number is required."),
  landType: z.enum(["NA", "Residential", "Agricultural"]),
  village: z.string().min(2, "Village is required."),
  city: z.string().min(2, "City is required."),
  taluka: z.string().min(2, "Taluka is required."),
  district: z.string().min(2, "District is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().length(6, "Pincode must be 6 digits."),
  areaSqFt: z.coerce.number().positive("Area must be positive."),
  boundaryDescription: z.string().min(10, "Boundary description is required."),
  roadAccess: z.boolean().default(false),
  cornerPlot: z.boolean().default(false),
  price: z.coerce.number().positive("Price must be positive."),
  documents: z.any().optional(),
})

export default function SellPage() {
    const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roadAccess: false,
      cornerPlot: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
        title: "Submission Successful!",
        description: "Your property has been listed for verification.",
    })
    form.reset()
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
            <CardHeader className="text-center px-0">
                <CardTitle className="font-headline text-4xl font-bold">List Your Property</CardTitle>
                <CardDescription>Fill in the details below to put your property on the market.</CardDescription>
            </CardHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle className="font-headline">1. Basic Information</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="ownerName" render={({ field }) => (
                            <FormItem><FormLabel>Owner Name</FormLabel><FormControl><Input placeholder="Full Name of Owner" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem><FormLabel>Expected Price (₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5000000" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="font-headline">2. Land & Location Details</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="surveyNumber" render={({ field }) => (<FormItem><FormLabel>Survey No.</FormLabel><FormControl><Input placeholder="123/4A" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="gatNumber" render={({ field }) => (<FormItem><FormLabel>GAT No.</FormLabel><FormControl><Input placeholder="G-56" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="plotNumber" render={({ field }) => (<FormItem><FormLabel>Plot No.</FormLabel><FormControl><Input placeholder="P-15" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="village" render={({ field }) => (<FormItem><FormLabel>Village</FormLabel><FormControl><Input placeholder="Wagholi" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Pune" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="taluka" render={({ field }) => (<FormItem><FormLabel>Taluka</FormLabel><FormControl><Input placeholder="Haveli" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="district" render={({ field }) => (<FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="Pune" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                            <FormField control={form.control} name="pincode" render={({ field }) => (<FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="412207" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="font-headline">3. Dimensions & Documents</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="areaSqFt" render={({ field }) => (
                                <FormItem><FormLabel>Total Area (sq. ft.)</FormLabel><FormControl><Input type="number" placeholder="2500" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="landType" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Land Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select land type" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                    <SelectItem value="NA">NA</SelectItem>
                                    <SelectItem value="Residential">Residential</SelectItem>
                                    <SelectItem value="Agricultural">Agricultural</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <FormField control={form.control} name="boundaryDescription" render={({ field }) => (
                            <FormItem><FormLabel>Boundary Description</FormLabel><FormControl><Textarea placeholder="Describe the property boundaries..." {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="roadAccess" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>Road Access</FormLabel><FormDescription>Is there a road connected to the property?</FormDescription></div></FormItem>
                            )}/>
                             <FormField control={form.control} name="cornerPlot" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>Corner Plot</FormLabel><FormDescription>Is the property a corner plot?</FormDescription></div></FormItem>
                            )}/>
                        </div>
                         <FormField control={form.control} name="documents" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Documents</FormLabel>
                                <FormControl>
                                    <Input type="file" multiple />
                                </FormControl>
                                <FormDescription>Upload 7/12, Registry, Sale Deed etc. (PDF, JPG, PNG)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </CardContent>
                </Card>
                
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Review & Submit Listing</Button>
            </form>
            </Form>
        </div>
    </div>
  )
}
