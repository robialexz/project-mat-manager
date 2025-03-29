import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Supplier } from '@/types/supplier';
// Use the mock functions for now, as Supabase functions are async
import { getAllSuppliersMock as getAllSuppliers, addSupplierMock as addSupplier } from '@/utils/supplierUtils'; 
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  StarHalf
} from 'lucide-react';
import { toast } from 'sonner';

// Form schema for adding a supplier
const supplierFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  notes: z.string().optional(),
});

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof supplierFormSchema>>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      category: '',
      notes: '',
    },
  });

  // Load suppliers using mock function
  useEffect(() => {
    const loadSuppliers = () => { // Removed async as using mock
      try {
        setIsLoading(true);
        const suppliersList = getAllSuppliers(); // Use mock function
        setSuppliers(suppliersList);
        setFilteredSuppliers(suppliersList);
      } catch (error) {
        console.error('Error loading suppliers:', error);
        toast.error('Failed to load suppliers');
      } finally {
        setIsLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  // Filter suppliers (remains the same)
  useEffect(() => {
    let result = [...suppliers];
    if (searchTerm) {
      result = result.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') {
      result = result.filter(supplier => supplier.category === categoryFilter);
    }
    setFilteredSuppliers(result);
  }, [searchTerm, categoryFilter, suppliers]);
  
      // Handle form submission using mock function
      const onSubmit = (data: z.infer<typeof supplierFormSchema>) => {
        try {
          // Construct the object ensuring all required fields for Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> are present
          // Use null for optional fields if they are empty strings
          const newSupplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> = {
            name: data.name,
            address: data.address, 
            phone: data.phone,     
            email: data.email,     
            category: data.category, 
            website: data.website || null, // Use null for optional empty strings
            notes: data.notes || null,     
            rating: 0,             
            contacts: []           
          };
          
      const newSupplier = addSupplier(newSupplierData); // Use mock function
      
      setSuppliers(prev => [...prev, newSupplier]);
      toast.success('Supplier added successfully (mock)');
      setIsAddDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error adding supplier:', error);
      toast.error('Failed to add supplier');
    }
  };
  
  // Extract unique categories for filter
  const categories = ['all', ...new Set(suppliers.map(supplier => supplier.category).filter(Boolean))];
  
  // View supplier details
  const handleViewSupplier = (id: string) => {
    navigate(`/suppliers/${id}`);
  };
  
  // Render star rating
  const renderRating = (rating?: number | null) => { // Made rating optional
    if (rating === null || rating === undefined) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    return <div className="flex space-x-0.5">{stars}</div>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Enter the details of the new supplier.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Supplier name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Materials">General Materials</SelectItem>
                            <SelectItem value="Electrical">Electrical</SelectItem>
                            <SelectItem value="Plumbing">Plumbing</SelectItem>
                            <SelectItem value="HVAC">HVAC</SelectItem>
                            <SelectItem value="Roofing">Roofing</SelectItem>
                            <SelectItem value="Flooring">Flooring</SelectItem>
                            <SelectItem value="Paint">Paint</SelectItem>
                            <SelectItem value="Hardware">Hardware</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional notes about this supplier" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                     {form.formState.isSubmitting ? "Adding..." : "Add Supplier"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="relative md:col-span-3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers by name, email, category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Supplier List / Loading / Empty State */}
      {isLoading ? (
        // Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse h-[280px]"> 
              <CardHeader className="pb-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                <div className="space-y-3 mt-6">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredSuppliers.length > 0 ? (
         // Supplier Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-md transition-shadow flex flex-col"> 
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="line-clamp-1">{supplier.name}</span>
                  {renderRating(supplier.rating)}
                </CardTitle>
                <CardDescription>{supplier.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-grow"> 
                <div className="flex items-start">
                  <Building className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" /> 
                  <span className="text-sm text-muted-foreground line-clamp-2">{supplier.address}</span> 
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{supplier.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{supplier.email}</span>
                </div>
                {supplier.website && (
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a 
                      href={supplier.website.startsWith('http') ? supplier.website : `https://${supplier.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate" 
                    >
                      {supplier.website}
                    </a>
                  </div>
                )}
                {/* Display contact count - contacts need to be fetched or counted */}
                <div className="flex items-center pt-2">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{supplier.contacts?.length || 0} contact{supplier.contacts?.length !== 1 ? 's' : ''}</span>
                </div> 
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleViewSupplier(supplier.id)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         // Empty State
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Building className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="mb-2">No suppliers found</CardTitle>
          <CardDescription>
            {searchTerm || categoryFilter !== 'all' 
              ? "Try adjusting your search or filters." 
              : "Add your first supplier to get started."}
          </CardDescription>
          <div className="mt-6">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Supplier
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Suppliers;
