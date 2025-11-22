'use client';

import { Group } from '@/lib/types';
import { GROUP_TYPES } from '@/lib/constants';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const groupType = GROUP_TYPES[group.type];
  const totalBalance = group.members.reduce((sum, m) => sum + Math.abs(m.balance), 0);
  const youOwe = group.members.find(m => m.balance < 0)?.balance || 0;
  const youAreOwed = group.members.find(m => m.balance > 0)?.balance || 0;

  return (
    <Link href={`/groups/${group.id}`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl">
              {groupType.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-500">{groupType.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{group.members.length}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total de despesas</span>
            <span className="font-semibold text-gray-900">
              {group.currency} {group.totalExpenses.toFixed(2)}
            </span>
          </div>

          {youOwe < 0 && (
            <div className="flex items-center justify-between text-red-600">
              <div className="flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">Você deve</span>
              </div>
              <span className="font-semibold">
                {group.currency} {Math.abs(youOwe).toFixed(2)}
              </span>
            </div>
          )}

          {youAreOwed > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Você recebe</span>
              </div>
              <span className="font-semibold">
                {group.currency} {youAreOwed.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex -space-x-2">
            {group.members.slice(0, 4).map((member, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {group.members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                +{group.members.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
