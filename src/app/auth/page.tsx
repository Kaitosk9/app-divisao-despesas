'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Verificar se usuário já está logado ao carregar a página
useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Se já estiver logado, manda direto pro dashboard
      window.location.href = '/dashboard';
    }
  };
  checkSession();
}, []);


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Traduzir erros do Supabase para português
  const translateError = (error: any): string => {
    const errorMessage = error?.message?.toLowerCase() || '';
    
    // Erros de signup
    if (errorMessage.includes('user already registered')) {
      return 'Este e-mail já está cadastrado. Tente fazer login.';
    }
    if (errorMessage.includes('password should be at least')) {
      return 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (errorMessage.includes('signup disabled')) {
      return 'Cadastro temporariamente desabilitado. Tente novamente mais tarde.';
    }
    if (errorMessage.includes('email not confirmed')) {
      return 'Verifique seu e-mail para confirmar a conta antes de fazer login.';
    }
    
    // Erros de login
    if (errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid credentials')) {
      return 'E-mail ou senha incorretos. Verifique e tente novamente.';
    }
    if (errorMessage.includes('email not confirmed')) {
      return 'Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.';
    }
    
    // Erros de rede/configuração
    if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    // Erro genérico
    return 'Ocorreu um erro. Tente novamente.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }
    setLoading(true);
    try {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    console.error('Erro de login:', error);
    setError(translateError(error));
    return;
  }

  // Login deu certo → força ir pro dashboard
  window.location.href = '/dashboard';
} catch (err) {
  console.error('Erro ao fazer login:', err);
  setError('Erro ao fazer login. Tente novamente.');
} finally {
  setLoading(false);
}

  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (!acceptTerms) {
      setError('Você precisa aceitar os Termos de Uso e Política de Privacidade');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Erro ao criar conta:', error);
        setError(translateError(error));
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Verificar se precisa confirmar e-mail
        if (data.user.identities && data.user.identities.length === 0) {
          setError('Este e-mail já está cadastrado. Tente fazer login.');
          setLoading(false);
          return;
        }

        // Verificar se o e-mail precisa ser confirmado
        if (data.user.email_confirmed_at === null) {
          setError('Conta criada! Verifique seu e-mail para confirmar o cadastro antes de fazer login.');
          setLoading(false);
          // Mudar para aba de login após 3 segundos
          setTimeout(() => {
            setMode('login');
            setError('');
          }, 3000);
          return;
        }

        // Sucesso - redirecionar para dashboard
        console.log('Conta criada com sucesso, redirecionando para dashboard...');
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Erro ao criar conta:', err);
      setError('Erro ao criar conta. Tente novamente.');
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Por favor, insira seu e-mail para recuperar a senha');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        setError(translateError(error));
        return;
      }

      setError('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
    } catch (err) {
      console.error('Erro ao enviar e-mail de recuperação:', err);
      setError('Erro ao enviar e-mail de recuperação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para início</span>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="text-2xl font-bold text-gray-900">SplitSmart</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                mode === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Criar conta
            </button>
          </div>

          {/* Error/Success Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl text-sm ${
              error.includes('criada') || error.includes('enviado')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all pr-12"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                disabled={loading}
              >
                Esqueceu sua senha?
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="Seu nome"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  id="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all pr-12"
                    placeholder="Mínimo 6 caracteres"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all pr-12"
                    placeholder="Digite a senha novamente"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Aceito os{' '}
                  <Link href="/terms" className="text-violet-600 hover:text-violet-700 font-medium">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-violet-600 hover:text-violet-700 font-medium">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
