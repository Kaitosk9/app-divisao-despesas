import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criar cliente com configuração de persistência de sessão
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'pkce',
  },
});

// Helper para verificar se usuário está autenticado
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper para fazer logout
export async function signOut() {
  await supabase.auth.signOut();
}

// Helper para verificar se usuário está autenticado (client-side)
export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}
