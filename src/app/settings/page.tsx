'use client';

import { User, Bell, CreditCard, Shield, HelpCircle, LogOut } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
          <p className="text-gray-600">Gerencie sua conta e preferências</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Profile */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                U
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Usuário Demo</h2>
                <p className="text-gray-600">usuario@exemplo.com</p>
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Editar Perfil
            </button>
          </div>

          {/* Settings Options */}
          {[
            { icon: Bell, title: 'Notificações', description: 'Gerencie suas preferências de notificação' },
            { icon: CreditCard, title: 'Pagamentos', description: 'Métodos de pagamento e histórico' },
            { icon: Shield, title: 'Privacidade e Segurança', description: 'Controle seus dados e segurança' },
            { icon: HelpCircle, title: 'Ajuda e Suporte', description: 'Central de ajuda e contato' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className="w-full bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Logout */}
          <button className="w-full bg-white rounded-2xl border-2 border-red-200 p-6 hover:bg-red-50 transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-600">Sair da Conta</h3>
              </div>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>SplitSmart v1.0.0 MVP</p>
          <p className="mt-1">© 2024 SplitSmart. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
