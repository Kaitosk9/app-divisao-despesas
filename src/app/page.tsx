'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, Shield, Smartphone, TrendingUp } from 'lucide-react';
import { GROUP_TYPES } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se usuário está autenticado
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleVerGrupos = () => {
    if (isAuthenticated) {
      router.push('/groups');
    } else {
      router.push('/auth?mode=login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-semibold text-gray-900">SplitSmart</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Divida despesas
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              de forma inteligente
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gerencie despesas compartilhadas com roommates, parceiro(a) ou amigos. 
            Pagamentos via PIX, divisão automática e muito mais.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth?mode=signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={handleVerGrupos}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-violet-300 hover:shadow-md transition-all"
            >
              Ver Grupos
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            {
              icon: Zap,
              title: 'Divisão Automática',
              description: 'Divida despesas igualmente ou por porcentagem com um clique'
            },
            {
              icon: Shield,
              title: 'Pagamentos PIX',
              description: 'Gere cobranças PIX instantâneas para facilitar pagamentos'
            },
            {
              icon: Smartphone,
              title: 'OCR Inteligente',
              description: 'Tire foto do recibo e extraia valores automaticamente'
            },
            {
              icon: TrendingUp,
              title: 'Relatórios',
              description: 'Acompanhe gastos com gráficos e relatórios detalhados'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Group Types */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Escolha seu modo
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Cada modo é otimizado para seu tipo de uso
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(GROUP_TYPES).map(([key, type]) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{type.label}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para simplificar suas finanças?
          </h2>
          <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já dividem despesas de forma inteligente
          </p>
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Criar Conta Grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
