import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";

export default function Home() {
  return (
    <div className="w-full">
      <section className="bg-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Find Your Foundation of Trust
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            BrickAi provides transparent, verified property data to help you build your future with confidence.
          </p>
          <Card className="mt-8 max-w-2xl mx-auto shadow-lg">
            <CardContent className="p-4">
              <form className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by City, Village, or Pincode..."
                    className="pl-10 h-12 w-full text-base"
                  />
                </div>
                <Button size="lg" className="w-full md:w-auto h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl font-bold text-center mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.propertyId} property={property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
