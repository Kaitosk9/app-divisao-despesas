import { supabase } from './supabase';
import type { Group, Expense, Member } from './types';

// ============ PROFILES ============
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============ GROUPS ============
export async function getUserGroups(userId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      *,
      groups (
        id,
        name,
        type,
        currency,
        owner_id,
        total_expenses,
        settings,
        created_at,
        updated_at
      )
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data?.map(item => item.groups) || [];
}

export async function getGroup(groupId: string) {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      group_members (
        id,
        user_id,
        role,
        share_ratio,
        balance,
        joined_at,
        profiles (
          id,
          name,
          email,
          avatar
        )
      )
    `)
    .eq('id', groupId)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createGroup(group: {
  name: string;
  type: string;
  currency: string;
  owner_id: string;
}) {
  // Criar grupo
  const { data: newGroup, error: groupError } = await supabase
    .from('groups')
    .insert(group)
    .select()
    .single();
  
  if (groupError) throw groupError;

  // Adicionar owner como membro
  const { error: memberError } = await supabase
    .from('group_members')
    .insert({
      group_id: newGroup.id,
      user_id: group.owner_id,
      role: 'owner',
      balance: 0
    });
  
  if (memberError) throw memberError;
  
  return newGroup;
}

export async function updateGroup(groupId: string, updates: any) {
  const { data, error } = await supabase
    .from('groups')
    .update(updates)
    .eq('id', groupId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============ EXPENSES ============
export async function getGroupExpenses(groupId: string) {
  const { data, error } = await supabase
    .from('expenses')
    .select(`
      *,
      profiles!expenses_payer_id_fkey (
        id,
        name,
        avatar
      ),
      expense_splits (
        id,
        user_id,
        share_amount,
        paid,
        paid_at,
        profiles (
          id,
          name,
          avatar
        )
      )
    `)
    .eq('group_id', groupId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createExpense(expense: {
  group_id: string;
  payer_id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  splits: Array<{ user_id: string; share_amount: number }>;
}) {
  // Criar despesa
  const { data: newExpense, error: expenseError } = await supabase
    .from('expenses')
    .insert({
      group_id: expense.group_id,
      payer_id: expense.payer_id,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
      status: 'pending'
    })
    .select()
    .single();
  
  if (expenseError) throw expenseError;

  // Criar splits
  const splitsToInsert = expense.splits.map(split => ({
    expense_id: newExpense.id,
    user_id: split.user_id,
    share_amount: split.share_amount,
    paid: split.user_id === expense.payer_id // Pagador já pagou
  }));

  const { error: splitsError } = await supabase
    .from('expense_splits')
    .insert(splitsToInsert);
  
  if (splitsError) throw splitsError;

  // Atualizar total do grupo
  const { error: updateError } = await supabase.rpc('increment_group_total', {
    group_id: expense.group_id,
    amount: expense.amount
  });

  // Se a função RPC não existir, fazer update manual
  if (updateError) {
    const { data: group } = await supabase
      .from('groups')
      .select('total_expenses')
      .eq('id', expense.group_id)
      .single();
    
    if (group) {
      await supabase
        .from('groups')
        .update({ total_expenses: (group.total_expenses || 0) + expense.amount })
        .eq('id', expense.group_id);
    }
  }
  
  return newExpense;
}

export async function markSplitAsPaid(splitId: string) {
  const { data, error } = await supabase
    .from('expense_splits')
    .update({ 
      paid: true, 
      paid_at: new Date().toISOString() 
    })
    .eq('id', splitId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============ MEMBERS ============
export async function addGroupMember(groupId: string, userId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .insert({
      group_id: groupId,
      user_id: userId,
      role: 'member',
      balance: 0
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getGroupMembers(groupId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      *,
      profiles (
        id,
        name,
        email,
        avatar
      )
    `)
    .eq('group_id', groupId);
  
  if (error) throw error;
  return data;
}
