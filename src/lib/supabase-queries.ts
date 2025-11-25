import { supabase } from './supabase';

export async function createProfile(userId: string, name: string, email: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([{ id: userId, name, email, verified: false }], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar perfil:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro na operação de perfil:', error);
    throw error;
  }
}
