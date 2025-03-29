import { v4 as uuidv4 } from 'uuid';
import { Supplier, ContactPerson, OrderStatus } from '@/types/supplier';
import { Project, User } from '@/types'; // Import Project and User

// --- Mock Data (Restored) ---
const mockSuppliers: Supplier[] = [
  {
    id: 'sup_1',
    name: 'Metro Building Supplies',
    address: '123 Industrial Ave, Chicago, IL 60007',
    phone: '(312) 555-7890',
    email: 'info@metrobuilding.com',
    website: 'www.metrobuilding.com',
    category: 'General Materials',
    rating: 4.5,
    contacts: [
      { id: 'cont_1', name: 'John Smith', email: 'john@metrobuilding.com', phone: '(312) 555-7891', role: 'Sales Representative' },
      { id: 'cont_2', name: 'Sarah Johnson', email: 'sarah@metrobuilding.com', phone: '(312) 555-7892', role: 'Account Manager' }
    ],
    notes: 'Preferred supplier for lumber and general materials',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-06-22T14:30:00Z'
  },
  {
    id: 'sup_2',
    name: 'ElectroPro Supplies',
    address: '456 Technology Parkway, Boston, MA 02108',
    phone: '(617) 555-3456',
    email: 'sales@electropro.com',
    website: 'www.electropro.com',
    category: 'Electrical',
    rating: 4.2,
    contacts: [
      { id: 'cont_3', name: 'Michael Wong', email: 'michael@electropro.com', phone: '(617) 555-3457', role: 'Technical Specialist' }
    ],
    notes: 'Specialized in high-quality electrical components',
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2023-05-18T11:20:00Z'
  },
   {
    id: 'sup_3',
    name: 'PlumbTech Systems',
    address: '789 Waterworks Blvd, Miami, FL 33125',
    phone: '(305) 555-9012',
    email: 'info@plumbtech.com',
    website: 'www.plumbtech.com',
    category: 'Plumbing',
    rating: 3.8,
    contacts: [
      { id: 'cont_4', name: 'Lisa Martinez', email: 'lisa@plumbtech.com', phone: '(305) 555-9013', role: 'Regional Manager' },
      { id: 'cont_5', name: 'Robert Chen', email: 'robert@plumbtech.com', phone: '(305) 555-9014', role: 'Customer Service' }
    ],
    notes: 'Good pricing on plumbing fixtures and pipes',
    createdAt: '2023-03-05T10:30:00Z',
    updatedAt: '2023-07-12T15:45:00Z'
  }
];

const mockOrderStatuses: OrderStatus[] = [
  {
    id: 'ord_1', supplierId: 'sup_1', projectId: 'proj_0', orderNumber: 'ORD-2023-001',
    items: [
      { id: 'item_1', name: 'Lumber 2x4', quantity: 100, unit: 'pieces', price: 5.75 },
      { id: 'item_2', name: 'Plywood Sheets', quantity: 50, unit: 'sheets', price: 32.99 }
    ],
    status: 'shipped', estimatedDelivery: '2023-07-15T00:00:00Z', notes: 'Part of initial project materials',
    createdAt: '2023-06-30T08:00:00Z', updatedAt: '2023-07-05T14:30:00Z', lastUpdatedBy: 'John Smith'
  },
   {
    id: 'ord_2', supplierId: 'sup_2', projectId: 'proj_1', orderNumber: 'ORD-2023-002',
    items: [
      { id: 'item_3', name: 'Circuit Breakers', quantity: 10, unit: 'pieces', price: 45.50 },
      { id: 'item_4', name: 'Electrical Wire', quantity: 500, unit: 'feet', price: 0.75 }
    ],
    status: 'confirmed', estimatedDelivery: '2023-07-20T00:00:00Z', notes: 'Electrical components for phase 1',
    createdAt: '2023-07-01T09:15:00Z', updatedAt: '2023-07-02T11:20:00Z', lastUpdatedBy: 'Michael Wong'
  }
];

// Store mock data in window object for global access
if (typeof window !== 'undefined') {
  window.mockSuppliers = mockSuppliers;
  window.mockOrderStatuses = mockOrderStatuses;
}

// --- Mock CRUD operations ---

export const getAllSuppliersMock = (): Supplier[] => {
  if (typeof window !== 'undefined' && window.mockSuppliers) {
    return [...window.mockSuppliers];
  }
  return [];
};

export const getSupplierByIdMock = (id: string): Supplier | undefined => {
  return getAllSuppliersMock().find(supplier => supplier.id === id);
};

export const addSupplierMock = (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Supplier => {
  const newSupplier: Supplier = {
    ...supplier,
    id: `sup_${uuidv4()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  if (typeof window !== 'undefined') {
    if (!window.mockSuppliers) window.mockSuppliers = [];
    window.mockSuppliers.push(newSupplier);
  }
  
  return newSupplier;
};

export const updateSupplierMock = (id: string, updates: Partial<Supplier>): Supplier | undefined => {
  const suppliers = getAllSuppliersMock();
  const index = suppliers.findIndex(supplier => supplier.id === id);
  
  if (index === -1) return undefined;
  
  const updatedSupplier: Supplier = {
    ...suppliers[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  suppliers[index] = updatedSupplier;
  
  if (typeof window !== 'undefined') {
    window.mockSuppliers = suppliers;
  }
  
  return updatedSupplier;
};

export const deleteSupplierMock = (id: string): boolean => {
  const suppliers = getAllSuppliersMock();
  const filtered = suppliers.filter(supplier => supplier.id !== id);
  
  if (filtered.length === suppliers.length) return false;
  
  if (typeof window !== 'undefined') {
    window.mockSuppliers = filtered;
  }
  
  return true;
};

// Contact person operations (Mock)
export const addContactPersonMock = (supplierId: string, contact: Omit<ContactPerson, 'id'>): Supplier | undefined => {
  const supplier = getSupplierByIdMock(supplierId);
  if (!supplier) return undefined;
  
  const newContact: ContactPerson = {
    ...contact,
    id: `cont_${uuidv4()}`
  };
  
  // Ensure contacts array exists
  if (!supplier.contacts) supplier.contacts = []; 
  
  return updateSupplierMock(supplierId, {
    contacts: [...supplier.contacts, newContact]
  });
};

export const updateContactPersonMock = (
  supplierId: string, 
  contactId: string, 
  updates: Partial<ContactPerson>
): Supplier | undefined => {
  const supplier = getSupplierByIdMock(supplierId);
  if (!supplier || !supplier.contacts) return undefined;
  
  const contactIndex = supplier.contacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) return undefined;
  
  const updatedContacts = [...supplier.contacts];
  updatedContacts[contactIndex] = {
    ...updatedContacts[contactIndex],
    ...updates
  };
  
  return updateSupplierMock(supplierId, { contacts: updatedContacts });
};

export const deleteContactPersonMock = (supplierId: string, contactId: string): Supplier | undefined => {
  const supplier = getSupplierByIdMock(supplierId);
  if (!supplier || !supplier.contacts) return undefined;
  
  return updateSupplierMock(supplierId, {
    contacts: supplier.contacts.filter(c => c.id !== contactId)
  });
};

// Order status operations (Mock)
export const getOrderStatuses = (projectId?: string, supplierId?: string): OrderStatus[] => {
  if (typeof window === 'undefined' || !window.mockOrderStatuses) return [];
  
  let statuses = [...window.mockOrderStatuses];
  
  if (projectId) {
    statuses = statuses.filter(order => order.projectId === projectId);
  }
  
  if (supplierId) {
    statuses = statuses.filter(order => order.supplierId === supplierId);
  }
  
  return statuses;
};

export const getOrderById = (id: string): OrderStatus | undefined => {
  if (typeof window === 'undefined' || !window.mockOrderStatuses) return undefined;
  return window.mockOrderStatuses.find(order => order.id === id);
};

export const createOrder = (order: Omit<OrderStatus, 'id' | 'createdAt' | 'updatedAt'>): OrderStatus => {
  const newOrder: OrderStatus = {
    ...order,
    id: `ord_${uuidv4()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  if (typeof window !== 'undefined') {
    if (!window.mockOrderStatuses) window.mockOrderStatuses = [];
    window.mockOrderStatuses.push(newOrder);
  }
  
  return newOrder;
};

export const updateOrderStatus = (id: string, updates: Partial<OrderStatus>): OrderStatus | undefined => {
  if (typeof window === 'undefined' || !window.mockOrderStatuses) return undefined;
  
  const orders = [...window.mockOrderStatuses];
  const index = orders.findIndex(order => order.id === id);
  
  if (index === -1) return undefined;
  
  const updatedOrder: OrderStatus = {
    ...orders[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  orders[index] = updatedOrder;
  window.mockOrderStatuses = orders;
  
  return updatedOrder;
};

// Removed duplicate declare global block (should be defined in vite-env.d.ts)
