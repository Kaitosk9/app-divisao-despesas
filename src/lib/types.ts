// Tipos principais do SplitSmart

export type GroupType = 'couple' | 'roommate' | 'trip' | 'team';

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'housing' 
  | 'utilities' 
  | 'entertainment' 
  | 'health' 
  | 'shopping' 
  | 'other';

export type SplitMethod = 'equal' | 'percentage' | 'custom';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  verified: boolean;
}

export interface Group {
  id: string;
  name: string;
  type: GroupType;
  currency: string;
  ownerId: string;
  members: Member[];
  totalExpenses: number;
  createdAt: Date;
  settings?: GroupSettings;
}

export interface Member {
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'member';
  shareRatio?: number;
  balance: number; // positivo = deve receber, negativo = deve pagar
}

export interface GroupSettings {
  defaultSplitMethod: SplitMethod;
  allowMemberInvites: boolean;
  requireApproval: boolean;
}

export interface Expense {
  id: string;
  groupId: string;
  payerId: string;
  payerName: string;
  amount: number;
  currency: string;
  date: Date;
  category: ExpenseCategory;
  description: string;
  receiptImageUrl?: string;
  status: 'pending' | 'completed';
  splits: Split[];
}

export interface Split {
  expenseId: string;
  userId: string;
  userName: string;
  shareAmount: number;
  paid: boolean;
  paymentReference?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  method: 'pix' | 'cash' | 'transfer';
  referenceId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}
