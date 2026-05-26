'use client'

import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/constants'
import type { Transaction } from '@/lib/types'

interface SummaryCardsProps {
  transactions: Transaction[]
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    }
  }, [transactions])

  const cards = [
    {
      label: 'Receitas',
      value: summary.totalIncome,
      icon: TrendingUp,
      colorClass: 'text-emerald-500',
      bgClass: 'bg-emerald-50',
      valueClass: 'text-emerald-600',
    },
    {
      label: 'Despesas',
      value: summary.totalExpense,
      icon: TrendingDown,
      colorClass: 'text-red-500',
      bgClass: 'bg-red-50',
      valueClass: 'text-red-600',
    },
    {
      label: 'Saldo',
      value: summary.balance,
      icon: Wallet,
      colorClass: summary.balance >= 0 ? 'text-blue-500' : 'text-red-500',
      bgClass: summary.balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
      valueClass: summary.balance >= 0 ? 'text-blue-600' : 'text-red-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-gray-100 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bgClass} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.colorClass}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${card.valueClass}`}>
              {formatCurrency(card.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
