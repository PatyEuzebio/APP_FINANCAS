import { createClient } from '@/lib/supabase/client'
import type { Transaction, TransactionFormData, FilterState } from '@/lib/types'

export async function getTransactions(filters: FilterState): Promise<Transaction[]> {
  const supabase = createClient()

  let query = supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })

  // Filter by month/year
  const startDate = `${filters.year}-${String(filters.month).padStart(2, '0')}-01`
  const endMonth = filters.month === 12 ? 1 : filters.month + 1
  const endYear = filters.month === 12 ? filters.year + 1 : filters.year
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`
  query = query.gte('date', startDate).lt('date', endDate)

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters.search) {
    query = query.ilike('description', `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function createTransaction(data: TransactionFormData): Promise<Transaction> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: transaction, error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      description: data.description,
      amount: parseFloat(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
    })
    .select()
    .single()

  if (error) throw error
  return transaction
}

export async function updateTransaction(
  id: string,
  data: TransactionFormData
): Promise<Transaction> {
  const supabase = createClient()

  const { data: transaction, error } = await supabase
    .from('transactions')
    .update({
      description: data.description,
      amount: parseFloat(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return transaction
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export function exportToCSV(transactions: Transaction[], filename: string): void {
  const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor']
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.type === 'income' ? 'Receita' : 'Despesa',
    t.category,
    t.amount.toFixed(2).replace('.', ','),
  ])

  const csv = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
