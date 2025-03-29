
/// <reference types="vite/client" />

import { Project, User } from './types';
import { Supplier, OrderStatus } from './types/supplier';

declare global {
  interface Window {
    mockProjects: Project[];
    mockSuppliers: Supplier[];
    mockOrderStatuses: OrderStatus[];
    mockUsers: User[];
  }
}
