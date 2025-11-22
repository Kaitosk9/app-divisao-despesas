// Constantes do SplitSmart

import { GroupType, ExpenseCategory } from './types';

export const GROUP_TYPES: Record<GroupType, { label: string; description: string; icon: string }> = {
  couple: {
    label: 'Casal',
    description: 'Compartilhe despesas e metas com seu parceiro(a)',
    icon: '💑'
  },
  roommate: {
    label: 'Roommates',
    description: 'Divida aluguel e contas da casa',
    icon: '🏠'
  },
  trip: {
    label: 'Viagem',
    description: 'Organize despesas de viagens em grupo',
    icon: '✈️'
  },
  team: {
    label: 'Time',
    description: 'Gerencie despesas de equipe ou projetos',
    icon: '👥'
  }
};

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; color: string }> = {
  food: { label: 'Alimentação', color: 'bg-orange-500' },
  transport: { label: 'Transporte', color: 'bg-blue-500' },
  housing: { label: 'Moradia', color: 'bg-purple-500' },
  utilities: { label: 'Contas', color: 'bg-yellow-500' },
  entertainment: { label: 'Lazer', color: 'bg-pink-500' },
  health: { label: 'Saúde', color: 'bg-green-500' },
  shopping: { label: 'Compras', color: 'bg-indigo-500' },
  other: { label: 'Outros', color: 'bg-gray-500' }
};

export const CURRENCIES = [
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
  { code: 'USD', symbol: '$', name: 'Dólar Americano' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'Libra Esterlina' }
];

export const SPLIT_METHODS = [
  { value: 'equal', label: 'Dividir Igualmente' },
  { value: 'percentage', label: 'Por Porcentagem' },
  { value: 'custom', label: 'Valores Customizados' }
];
