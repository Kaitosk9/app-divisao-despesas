'use client';

import { Expense } from '@/lib/types';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { Calendar, User, Users } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
}

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const category = EXPENSE_CATEGORIES[expense.category];
  const date = new Date(expense.date);
  const formattedDate = date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short' 
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-white font-medium`}>
            {expense.category.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{expense.description}</h4>
            <p className="text-sm text-gray-500">{category.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {expense.currency} {expense.amount.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>Pago por {expense.payerName}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{expense.splits.length} pessoas</span>
        </div>
      </div>

      {expense.status === 'pending' && (
        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendente
          </span>
        </div>
      )}
    </div>
  );
}
