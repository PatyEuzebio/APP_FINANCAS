'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { getTransactions, deleteTransaction, exportToCSV } from '@/lib/transactions'
import { MONTHS } from '@/lib/constants'
import type { Transaction, FilterState } from '@/lib/types'
import { SummaryCards } from './summary-cards'
import { CategoryChart } from './category-chart'
import { TransactionFilters } from './transaction-filters'
import { TransactionList } from './transaction-list'
import { TransactionModal } from './transaction-modal'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'

export function DashboardClient() {
  const now = new Date()
  const [filters, setFilters] = useState<FilterState>({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    category: 'all',
    search: '',
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getTransactions(filters)
      setTransactions(data)
    } catch {
      toast.error('Erro ao carregar transações')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  function handleNew() {
    setEditingTransaction(null)
    setModalOpen(true)
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    setModalOpen(true)
  }

  async function handleDelete(id: string) {
    try {
      await deleteTransaction(id)
      toast.success('Transação excluída')
      fetchTransactions()
    } catch {
      toast.error('Erro ao excluir transação')
    }
  }

  function handleExportCSV() {
    const filename = `transacoes_${MONTHS[filters.month - 1]}_${filters.year}.csv`
    exportToCSV(transactions, filename)
    toast.success('Arquivo CSV exportado!')
  }

  function handleSaved() {
    setModalOpen(false)
    fetchTransactions()
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {MONTHS[filters.month - 1]} de {filters.year}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={transactions.length === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
          <Button
            size="sm"
            onClick={handleNew}
            className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova transação
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <SummaryCards transactions={transactions} />

      {/* Chart + Filters */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        <div>
          <CategoryChart transactions={transactions} />
        </div>
      </div>

      {/* Transactions list */}
      <TransactionList
        transactions={transactions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        transaction={editingTransaction}
        onSaved={handleSaved}
        defaultDate={`${filters.year}-${String(filters.month).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
      />
    </div>
  )
}
