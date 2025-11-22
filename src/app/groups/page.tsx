'use client';

import { useState } from 'react';
import { Group, GroupType } from '@/lib/types';
import { GROUP_TYPES } from '@/lib/constants';
import GroupCard from '@/components/custom/group-card';
import { Plus, X } from 'lucide-react';

export default function GroupsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<GroupType>('roommate');
  const [groupName, setGroupName] = useState('');

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
    },
    {
      id: '3',
      name: 'Nós Dois ❤️',
      type: 'couple',
      currency: 'R$',
      ownerId: 'user1',
      totalExpenses: 5240.00,
      createdAt: new Date(),
      members: [
        { userId: 'user1', name: 'Você', role: 'owner', balance: 0 },
        { userId: 'user6', name: 'Julia Oliveira', role: 'member', balance: 0 }
      ]
    }
  ]);

  const handleCreateGroup = () => {
    // Em produção: chamar API para criar grupo
    console.log('Criar grupo:', { name: groupName, type: selectedType });
    setShowCreateModal(false);
    setGroupName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Grupos</h1>
            <p className="text-gray-600">Gerencie seus grupos de despesas compartilhadas</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Novo Grupo</span>
          </button>
        </div>

        {/* Groups Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}

          {/* Empty State Card */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 hover:border-violet-300 hover:bg-violet-50 transition-all flex flex-col items-center justify-center gap-3 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
              <Plus className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Criar Novo Grupo</h3>
              <p className="text-sm text-gray-600">
                Comece a dividir despesas com amigos ou família
              </p>
            </div>
          </button>
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Criar Novo Grupo</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Group Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de Grupo
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.entries(GROUP_TYPES).map(([key, type]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedType(key as GroupType)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedType === key
                            ? 'border-violet-500 bg-violet-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Group Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Grupo
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ex: Casa - Apartamento, Viagem - Bahia 2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Currency Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moeda
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option value="BRL">R$ - Real Brasileiro</option>
                    <option value="USD">$ - Dólar Americano</option>
                    <option value="EUR">€ - Euro</option>
                    <option value="GBP">£ - Libra Esterlina</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateGroup}
                    disabled={!groupName.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Criar Grupo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
