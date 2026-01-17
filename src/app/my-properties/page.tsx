import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function MyPropertiesPage() {
  // In a real app, this would be filtered by the current user's ID
  const myProperties = properties.slice(1, 3);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl font-bold">My Properties</h1>
        <Button asChild>
          <Link href="/sell">
            <PlusCircle className="mr-2 h-5 w-5" />
            List a New Property
          </Link>
        </Button>
      </div>

      {myProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map((property) => (
            <PropertyCard key={property.propertyId} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-muted-foreground">You haven't listed any properties yet.</h2>
          <p className="mt-2 text-muted-foreground">Get started by listing your first property for sale.</p>
          <Button asChild className="mt-6">
            <Link href="/sell">
                <PlusCircle className="mr-2 h-5 w-5" />
                List a Property
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
