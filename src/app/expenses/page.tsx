'use client';

import { useState } from 'react';
import { ExpenseCategory, SplitMethod } from '@/lib/types';
import { EXPENSE_CATEGORIES, SPLIT_METHODS } from '@/lib/constants';
import { Upload, Camera, DollarSign, Users, Calendar, Tag } from 'lucide-react';

export default function ExpensesPage() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal');
  const [selectedGroup, setSelectedGroup] = useState('1');
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'photo'>('manual');

  const mockGroups = [
    { id: '1', name: 'Casa - Apartamento' },
    { id: '2', name: 'Viagem - Bahia 2024' },
    { id: '3', name: 'Nós Dois ❤️' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção: chamar API para criar despesa
    console.log('Criar despesa:', {
      amount,
      description,
      category,
      splitMethod,
      groupId: selectedGroup
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Despesa</h1>
          <p className="text-gray-600">Adicione uma despesa e divida com seu grupo</p>
        </div>

        {/* Upload Method Toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 mb-6 inline-flex gap-2">
          <button
            onClick={() => setUploadMethod('manual')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              uploadMethod === 'manual'
                ? 'bg-violet-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setUploadMethod('photo')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              uploadMethod === 'photo'
                ? 'bg-violet-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Foto do Recibo
          </button>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          {uploadMethod === 'photo' ? (
            // Photo Upload Section
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-violet-300 transition-colors">
                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tire uma foto do recibo
                </h3>
                <p className="text-gray-600 mb-6">
                  Nosso OCR vai extrair automaticamente valor, data e categoria
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="inline-flex items-center justify-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors">
                    <Camera className="w-5 h-5" />
                    Abrir Câmera
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5" />
                    Escolher Arquivo
                  </button>
                </div>
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                <p className="text-sm text-violet-900">
                  <strong>💡 Dica:</strong> Certifique-se de que o recibo está bem iluminado e todos os valores estão visíveis para melhor precisão.
                </p>
              </div>
            </div>
          ) : (
            // Manual Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Grupo
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {mockGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-lg font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Conta de luz, Jantar, Supermercado..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Categoria
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(EXPENSE_CATEGORIES).map(([key, cat]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key as ExpenseCategory)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        category === key
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${cat.color} mx-auto mb-2`} />
                      <p className="text-xs font-medium text-gray-900">{cat.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Data
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Split Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Método de Divisão
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {SPLIT_METHODS.map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setSplitMethod(method.value as SplitMethod)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        splitMethod === method.value
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{method.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Adicionar Despesa
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💳 Pagamento PIX</h3>
            <p className="text-sm text-blue-800">
              Após adicionar a despesa, você pode gerar um link de cobrança PIX para facilitar o pagamento.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-900 mb-2">🤖 Divisão Inteligente</h3>
            <p className="text-sm text-green-800">
              O app calcula automaticamente quanto cada pessoa deve pagar baseado no método escolhido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
