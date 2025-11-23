// Validações robustas com Zod
import { z } from 'zod';
import { GroupType, ExpenseCategory, SplitMethod } from './types';

// Schemas de validação
export const userSchema = z.object({
  id: z.string().uuid('ID de usuário inválido'),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido').optional(),
  avatar: z.string().url('URL de avatar inválida').optional(),
  verified: z.boolean()
});

export const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Nome do grupo deve ter no mínimo 2 caracteres').max(100),
  type: z.enum(['couple', 'roommate', 'trip', 'team'] as const),
  currency: z.string().length(3, 'Código de moeda deve ter 3 caracteres'),
  ownerId: z.string().uuid(),
  members: z.array(z.object({
    userId: z.string().uuid(),
    name: z.string().min(2),
    avatar: z.string().url().optional(),
    role: z.enum(['owner', 'member']),
    shareRatio: z.number().min(0).max(100).optional(),
    balance: z.number()
  })).min(1, 'Grupo deve ter pelo menos 1 membro'),
  totalExpenses: z.number().min(0),
  createdAt: z.date(),
  settings: z.object({
    defaultSplitMethod: z.enum(['equal', 'percentage', 'custom']),
    allowMemberInvites: z.boolean(),
    requireApproval: z.boolean()
  }).optional()
});

export const expenseSchema = z.object({
  id: z.string().uuid(),
  groupId: z.string().uuid(),
  payerId: z.string().uuid(),
  payerName: z.string().min(2),
  amount: z.number().positive('Valor deve ser positivo').max(999999999, 'Valor muito alto'),
  currency: z.string().length(3),
  date: z.date(),
  category: z.enum(['food', 'transport', 'housing', 'utilities', 'entertainment', 'health', 'shopping', 'other']),
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres').max(500),
  receiptImageUrl: z.string().url().optional(),
  status: z.enum(['pending', 'completed']),
  splits: z.array(z.object({
    expenseId: z.string().uuid(),
    userId: z.string().uuid(),
    userName: z.string().min(2),
    shareAmount: z.number().positive(),
    paid: z.boolean(),
    paymentReference: z.string().optional()
  })).min(1, 'Despesa deve ter pelo menos 1 divisão')
});

export const paymentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.enum(['pix', 'cash', 'transfer']),
  referenceId: z.string().optional(),
  status: z.enum(['pending', 'completed', 'failed']),
  createdAt: z.date()
});

// Validadores de formulário
export const createGroupFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  type: z.enum(['couple', 'roommate', 'trip', 'team'] as const),
  currency: z.string().length(3)
});

export const createExpenseFormSchema = z.object({
  groupId: z.string().uuid(),
  amount: z.number().positive('Valor deve ser positivo'),
  category: z.enum(['food', 'transport', 'housing', 'utilities', 'entertainment', 'health', 'shopping', 'other']),
  description: z.string().min(3).max(500),
  date: z.date(),
  splitMethod: z.enum(['equal', 'percentage', 'custom'])
});

// Funções auxiliares de validação
export function validateEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

export function validateAmount(amount: number): boolean {
  return z.number().positive().max(999999999).safeParse(amount).success;
}

export function validateCurrency(currency: string): boolean {
  return z.string().length(3).safeParse(currency).success;
}

// Sanitização de dados
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeAmount(amount: number): number {
  return Math.round(amount * 100) / 100; // 2 casas decimais
}
