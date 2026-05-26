'use client'

import { useMemo, useState } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORY_COLORS, formatCurrency } from '@/lib/constants'
import type { Transaction } from '@/lib/types'

interface CategoryChartProps {
  transactions: Transaction[]
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const [view, setView] = useState<'expense' | 'income'>('expense')

  const data = useMemo(() => {
    const byCategory: Record<string, number> = {}
    transactions
      .filter((t) => t.type === view)
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount
      })

    return Object.entries(byCategory)
      .map(([category, total]) => ({
        name: category,
        value: total,
        fill: CATEGORY_COLORS[category] ?? '#94a3b8',
      }))
      .sort((a, b) => b.value - a.value)
  }, [transactions, view])

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: Array<{ name: string; value: number }>
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium text-gray-800 dark:text-gray-200">{payload[0].name}</p>
          <p className="text-gray-600 dark:text-gray-400">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  const emptyLabel = view === 'expense' ? 'Sem despesas neste mês' : 'Sem receitas neste mês'

  return (
    <Card className="border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-none h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Por categoria
          </CardTitle>
          {/* Toggle Despesas / Receitas */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs font-medium">
            <button
              onClick={() => setView('expense')}
              className={`px-3 py-1.5 transition-colors ${
                view === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Despesas
            </button>
            <button
              onClick={() => setView('income')}
              className={`px-3 py-1.5 transition-colors ${
                view === 'income'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Receitas
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-600 text-sm">
            {emptyLabel}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
