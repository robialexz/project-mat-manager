import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Use mock functions
import { 
  getSupplierByIdMock as getSupplierById, 
  addContactPersonMock as addContactPerson,
  updateContactPersonMock as updateContactPerson,
  deleteContactPersonMock as deleteContactPerson,
  getOrderStatuses, // Keep using mock order functions
  updateOrderStatus 
} from '@/utils/supplierUtils'; 
import { Supplier, ContactPerson, OrderStatus } from '@/types/supplier';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  User, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Plus, 
  Star,
  StarHalf,
  ChevronLeft,
  ExternalLink,
  FileText,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom'; // Import Link

// Form schema for contact person
const contactPersonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
});

// Schema for order status update
const orderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'canceled']),
  estimatedDelivery: z.string().optional(),
  notes: z.string().optional(),
});

const SupplierDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactPerson | null>(null);
  const [orders, setOrders] = useState<OrderStatus[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isOrderStatusDialogOpen, setIsOrderStatusDialogOpen] = useState(false);
  
  const contactForm = useForm<z.infer<typeof contactPersonSchema>>({
    resolver: zodResolver(contactPersonSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
    },
  });
  
  const orderStatusForm = useForm<z.infer<typeof orderStatusSchema>>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: 'pending',
      estimatedDelivery: '',
      notes: '',
    },
  });

  useEffect(() => {
    // Use mock function for loading
    const loadSupplier = () => { 
      try {
        setIsLoading(true);
        if (!id) {
           toast.error('Supplier ID is missing.');
           navigate('/suppliers'); 
           return;
        };
        
        const supplierData = getSupplierById(id); // Use mock function
        if (!supplierData) {
          toast.error('Supplier not found');
          navigate('/suppliers');
          return;
        }
        
        setSupplier(supplierData);
        
        // Load orders for this supplier (still using mock)
        const orderData = getOrderStatuses(undefined, id); 
        setOrders(orderData);
      } catch (error) {
        console.error('Error loading supplier:', error);
        toast.error('Failed to load supplier details');
      } finally {
        setIsLoading(false);
      }
    };

    loadSupplier();
  }, [id, navigate]);
  
  // Reset contact form when editing contact changes
  useEffect(() => {
    if (editingContact) {
      contactForm.reset({
        name: editingContact.name,
        email: editingContact.email,
        phone: editingContact.phone,
        role: editingContact.role,
      });
    } else {
      contactForm.reset({
        name: '',
        email: '',
        phone: '',
        role: '',
      });
    }
  }, [editingContact, contactForm]);
  
  // Reset order status form when active order changes
  useEffect(() => {
    if (activeOrderId) {
      const order = orders.find(o => o.id === activeOrderId);
      if (order) {
        orderStatusForm.reset({
          status: order.status,
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : '',
          notes: order.notes || '',
        });
      }
    }
  }, [activeOrderId, orders, orderStatusForm]);

  // Use mock functions for contact submit
  const handleContactSubmit = (data: z.infer<typeof contactPersonSchema>) => {
    try {
      if (!supplier) return;
      
          let updatedSupplier: Supplier | undefined;
          
          // Construct the contact data ensuring all required fields are present
          // Use null for optional fields if needed by the type, though Omit should handle it
          const contactData: Omit<ContactPerson, 'id'> = {
              name: data.name, 
              email: data.email,
              phone: data.phone,
              role: data.role,
              avatarUrl: null // Explicitly set optional avatarUrl to null if not provided
          };

          if (editingContact) {
        // Update existing contact (mock)
        updatedSupplier = updateContactPerson(supplier.id, editingContact.id, contactData);
        if (updatedSupplier) {
          toast.success('Contact updated successfully (mock)');
        }
      } else {
        // Add new contact (mock)
        updatedSupplier = addContactPerson(supplier.id, contactData);
        if (updatedSupplier) {
          toast.success('Contact added successfully (mock)');
        }
      }
      
      if (updatedSupplier) {
        setSupplier(updatedSupplier); // Update state with result from mock function
      }
      
      setIsContactDialogOpen(false);
      setEditingContact(null);
      contactForm.reset(); 
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to save contact');
    }
  };
  
  // Use mock function for delete contact
  const handleDeleteContact = (contactId: string) => {
    try {
      if (!supplier) return;
      
      const updatedSupplier = deleteContactPerson(supplier.id, contactId); 
      if (updatedSupplier) {
        setSupplier(updatedSupplier);
        toast.success('Contact deleted successfully (mock)');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };
  
  const handleOpenEditContact = (contact: ContactPerson) => {
    setEditingContact(contact);
    setIsContactDialogOpen(true);
  };
  
  // Keep using mock for order status for now
  const handleOrderStatusUpdate = (data: z.infer<typeof orderStatusSchema>) => {
    try {
      if (!activeOrderId || !supplier) return;
      
      const updatedOrder = updateOrderStatus(activeOrderId, {
        ...data,
        lastUpdatedBy: supplier.name, // Keep using name for mock
      });
      
      if (updatedOrder) {
        setOrders(prev => prev.map(order => order.id === activeOrderId ? updatedOrder : order));
        toast.success('Order status updated successfully');
      }
      
      setIsContactDialogOpen(false);
      setActiveOrderId(null);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
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
  
  // Get status icon
  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    // Ensure dateString is valid before creating Date object
    try {
       return new Date(dateString).toLocaleDateString();
    } catch (e) {
       return 'Invalid Date';
    }
  };
  
  // Calculate order total
  const calculateOrderTotal = (order: OrderStatus) => {
    // Use optional chaining for items array
    return (order.items || []).reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-2/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!supplier) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Supplier not found</h1>
          <p className="mt-2">The supplier you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => navigate('/suppliers')}>
            Back to Suppliers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/suppliers')} 
        className="mb-6"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Suppliers
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{supplier.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <span className="mr-2">{supplier.category}</span>
                    <div className="flex">
                      {renderRating(supplier.rating)}
                    </div>
                  </CardDescription>
                </div>
                {/* TODO: Add edit supplier functionality */}
                <Button variant="outline" size="icon" onClick={() => toast.info("Edit supplier coming soon")}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Building className="mr-3 h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">{supplier.address}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">{supplier.email}</p>
                </div>
              </div>
              
              {supplier.website && (
                <div className="flex items-center">
                  <Globe className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <a 
                      href={supplier.website.startsWith('http') ? supplier.website : `https://${supplier.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      {supplier.website}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
              
              {supplier.notes && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-1">Notes</h3>
                  <p className="text-sm text-muted-foreground">{supplier.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-2/3">
          <Tabs defaultValue="contacts">
            <TabsList className="mb-4">
              <TabsTrigger value="contacts" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Contact Persons</CardTitle>
                    <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => {
                            setEditingContact(null);
                            contactForm.reset({
                              name: '',
                              email: '',
                              phone: '',
                              role: '',
                            });
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {editingContact ? 'Edit Contact Person' : 'Add Contact Person'}
                          </DialogTitle>
                          <DialogDescription>
                            {editingContact 
                              ? 'Update the details of this contact person' 
                              : 'Add a new contact person for this supplier'}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...contactForm}>
                          <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
                            <FormField
                              control={contactForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Contact name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={contactForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Email address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={contactForm.control}
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
                              control={contactForm.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Job title or role" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">
                                {editingContact ? 'Update Contact' : 'Add Contact'}
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {supplier.contacts.length > 0 ? (
                    <div className="space-y-4">
                      {supplier.contacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className="flex items-center justify-between p-4 bg-background border rounded-lg"
                        >
                          <div className="flex items-center">
                            <Avatar>
                              {/* Assuming avatarUrl might be optional */}
                              <AvatarImage src={contact.avatarUrl || undefined} alt={contact.name} /> 
                              <AvatarFallback>
                                {contact.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                              <h3 className="font-medium">{contact.name}</h3>
                              <p className="text-sm text-muted-foreground">{contact.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <a 
                              href={`mailto:${contact.email}`} 
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                            <a 
                              href={`tel:${contact.phone}`} 
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleOpenEditContact(contact)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteContact(contact.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <User className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No contacts added yet</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Add contact persons to keep track of your key people at this supplier
                      </p>
                      <Button className="mt-4" onClick={() => setIsContactDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add First Contact
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Orders</CardTitle>
                    <Button onClick={() => toast.info('Create order feature coming soon')}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Create Order
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Est. Delivery</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.orderNumber}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {getStatusIcon(order.status)}
                                  <span className="ml-2 capitalize">{order.status}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {/* Assuming projectId format is like 'project_1' */}
                                Project {order.projectId?.split('_')[1] || 'N/A'} 
                              </TableCell>
                              <TableCell>{order.items?.length || 0} items</TableCell>
                              <TableCell>{formatCurrency(calculateOrderTotal(order))}</TableCell>
                              <TableCell>{formatDate(order.estimatedDelivery)}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                      setActiveOrderId(order.id);
                                      setIsOrderStatusDialogOpen(true);
                                    }}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Update Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => toast.info('View details feature coming soon')}>
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Start creating orders with this supplier
                      </p>
                      <Button className="mt-4" onClick={() => toast.info('Create order feature coming soon')}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Create First Order
                      </Button>
                    </div>
                  )}
                  
                  <Dialog open={isOrderStatusDialogOpen} onOpenChange={setIsOrderStatusDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                        <DialogDescription>
                          Change the status and information about this order
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Form {...orderStatusForm}>
                        <form onSubmit={orderStatusForm.handleSubmit(handleOrderStatusUpdate)} className="space-y-4">
                          <FormField
                            control={orderStatusForm.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select 
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="canceled">Canceled</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={orderStatusForm.control}
                            name="estimatedDelivery"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estimated Delivery Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={orderStatusForm.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Add any relevant notes about this update" 
                                    className="min-h-[100px]" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOrderStatusDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              Update Status
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Documents</CardTitle>
                    <Button onClick={() => toast.info('Upload document feature coming soon')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload contracts, invoices, or other documents related to this supplier
                    </p>
                    <Button className="mt-4" onClick={() => toast.info('Upload document feature coming soon')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload First Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
