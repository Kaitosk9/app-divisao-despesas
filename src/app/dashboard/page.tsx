'use client';

import { useState } from 'react';
import { Group, Expense } from '@/lib/types';
import GroupCard from '@/components/custom/group-card';
import ExpenseCard from '@/components/custom/expense-card';
import { Plus, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  // Mock data - em produção viria de API/DB
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Casa - Apartamento',
      type: 'roommate',
      currency: 'R$',
      ownerId: 'user1',
      totalExpenses: 3450.00,
      createdAt: new Date(),
      members: [
        { userId: 'user1', name: 'Você', role: 'owner', balance: 450.00 },
        { userId: 'user2', name: 'João Silva', role: 'member', balance: -450.00 },
        { userId: 'user3', name: 'Maria Santos', role: 'member', balance: 0 }
      ]
    },
    {
      id: '2',
      name: 'Viagem - Bahia 2024',
      type: 'trip',
      currency: 'R$',
      ownerId: 'user1',
      totalExpenses: 2890.50,
      createdAt: new Date(),
      members: [
        { userId: 'user1', name: 'Você', role: 'owner', balance: -320.00 },
        { userId: 'user4', name: 'Pedro Costa', role: 'member', balance: 160.00 },
        { userId: 'user5', name: 'Ana Lima', role: 'member', balance: 160.00 }
      ]
    }
  ]);

  const [recentExpenses] = useState<Expense[]>([
    {
      id: '1',
      groupId: '1',
      payerId: 'user1',
      payerName: 'Você',
      amount: 450.00,
      currency: 'R$',
      date: new Date(),
      category: 'utilities',
      description: 'Conta de Luz - Dezembro',
      status: 'pending',
      splits: [
        { expenseId: '1', userId: 'user1', userName: 'Você', shareAmount: 150.00, paid: true },
        { expenseId: '1', userId: 'user2', userName: 'João', shareAmount: 150.00, paid: false },
        { expenseId: '1', userId: 'user3', userName: 'Maria', shareAmount: 150.00, paid: false }
      ]
    },
    {
      id: '2',
      groupId: '1',
      payerId: 'user2',
      payerName: 'João Silva',
      amount: 1200.00,
      currency: 'R$',
      date: new Date(Date.now() - 86400000),
      category: 'housing',
      description: 'Aluguel - Janeiro',
      status: 'completed',
      splits: [
        { expenseId: '2', userId: 'user1', userName: 'Você', shareAmount: 400.00, paid: true },
        { expenseId: '2', userId: 'user2', userName: 'João', shareAmount: 400.00, paid: true },
        { expenseId: '2', userId: 'user3', userName: 'Maria', shareAmount: 400.00, paid: true }
      ]
    },
    {
      id: '3',
      groupId: '2',
      payerId: 'user4',
      payerName: 'Pedro Costa',
      amount: 320.00,
      currency: 'R$',
      date: new Date(Date.now() - 172800000),
      category: 'food',
      description: 'Jantar - Restaurante',
      status: 'pending',
      splits: [
        { expenseId: '3', userId: 'user1', userName: 'Você', shareAmount: 106.67, paid: false },
        { expenseId: '3', userId: 'user4', userName: 'Pedro', shareAmount: 106.67, paid: true },
        { expenseId: '3', userId: 'user5', userName: 'Ana', shareAmount: 106.66, paid: false }
      ]
    }
  ]);

  const totalBalance = groups.reduce((sum, g) => {
    const myBalance = g.members.find(m => m.name === 'Você')?.balance || 0;
    return sum + myBalance;
  }, 0);

  const totalOwed = groups.reduce((sum, g) => {
    const myBalance = g.members.find(m => m.name === 'Você')?.balance || 0;
    return sum + (myBalance < 0 ? Math.abs(myBalance) : 0);
  }, 0);

  const totalToReceive = groups.reduce((sum, g) => {
    const myBalance = g.members.find(m => m.name === 'Você')?.balance || 0;
    return sum + (myBalance > 0 ? myBalance : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas despesas compartilhadas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Saldo Total</span>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {Math.abs(totalBalance).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {totalBalance >= 0 ? 'Você recebe' : 'Você deve'}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Você Deve</span>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-red-600">
              R$ {totalOwed.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Pendente de pagamento</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Você Recebe</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              R$ {totalToReceive.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">A receber</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Grupos Ativos</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
            <p className="text-xs text-gray-500 mt-1">
              {groups.reduce((sum, g) => sum + g.members.length, 0)} membros total
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Groups Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Seus Grupos</h2>
              <Link
                href="/groups"
                className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Grupo</span>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>

          {/* Recent Expenses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Despesas Recentes</h2>
              <Link
                href="/expenses"
                className="text-violet-600 hover:text-violet-700 text-sm font-medium"
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>

            <Link
              href="/expenses"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-dashed border-gray-300 text-gray-600 px-4 py-3 rounded-xl hover:border-violet-300 hover:text-violet-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Despesa</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
