import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Package, Users, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Bun venit la Managerul de Materiale
        </h1>
        <p className="text-lg text-muted-foreground">
          Gestionați proiectele, materialele și furnizorii într-un singur loc.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Proiecte</CardTitle>
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Vizualizați și gestionați proiectele curente.
            </CardDescription>
            <Link to="/projects">
              <Button className="w-full">Vezi Proiecte</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Materiale</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Gestionați inventarul de materiale. (Funcționalitate viitoare)
            </CardDescription>
            {/* Link to materials page when available */}
            <Button className="w-full" disabled>Vezi Materiale</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Furnizori</CardTitle>
            <Building className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Administrați lista de furnizori.
            </CardDescription>
            <Link to="/suppliers">
              <Button className="w-full">Vezi Furnizori</Button>
            </Link>
          </CardContent>
        </Card>

         <Card className="hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Utilizatori</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Gestionați utilizatorii aplicației.
            </CardDescription>
             <Link to="/users">
               <Button className="w-full">Vezi Utilizatori</Button>
             </Link>
          </CardContent>
        </Card>

         <Card className="hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Dashboard</CardTitle>
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Vizualizați sumarul general al datelor.
            </CardDescription>
             <Link to="/dashboard">
               <Button className="w-full">Vezi Dashboard</Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
