'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate, CATEGORY_COLORS } from '@/lib/constants'
import type { Transaction } from '@/lib/types'
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'

interface TransactionListProps {
  transactions: Transaction[]
  loading: boolean
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

export function TransactionList({ transactions, loading, onEdit, onDelete }: TransactionListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (deletingId === id) {
      setDeletingId(null)
      onDelete(id)
    } else {
      setDeletingId(id)
      setTimeout(() => setDeletingId(null), 3000)
    }
  }

  return (
    <Card className="border-gray-100 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-700">
            Transações
          </CardTitle>
          <span className="text-xs text-gray-400">
            {transactions.length} registro{transactions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="space-y-3 p-5 pt-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ArrowUpCircle className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">Nenhuma transação encontrada</p>
            <p className="text-gray-400 text-sm mt-1">Ajuste os filtros ou adicione uma nova transação</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors group"
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  transaction.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{formatDate(transaction.date)}</span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                      style={{
                        background: `${CATEGORY_COLORS[transaction.category] ?? '#94a3b8'}20`,
                        color: CATEGORY_COLORS[transaction.category] ?? '#94a3b8',
                      }}
                    >
                      {transaction.category}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <span className={`text-sm font-semibold flex-shrink-0 ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-blue-500"
                    onClick={() => onEdit(transaction)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 ${
                      deletingId === transaction.id
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    onClick={() => handleDelete(transaction.id)}
                    title={deletingId === transaction.id ? 'Clique novamente para confirmar' : 'Excluir'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
