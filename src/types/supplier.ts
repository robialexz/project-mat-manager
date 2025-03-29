
export interface ContactPerson {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl?: string;
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  category: string; // e.g., "Lumber", "Plumbing", "Electrical", etc.
  rating: number; // 1-5 stars
  contacts: ContactPerson[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatus {
  id: string;
  supplierId: string;
  projectId: string;
  orderNumber: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
  }[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
  estimatedDelivery?: string;
  actualDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
