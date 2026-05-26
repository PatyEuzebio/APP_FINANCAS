'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CATEGORY_COLORS, formatCurrency } from '@/lib/constants'
import type { Transaction } from '@/lib/types'

interface CategoryChartProps {
  transactions: Transaction[]
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const data = useMemo(() => {
    const byCategory: Record<string, number> = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount
      })

    return Object.entries(byCategory)
      .map(([category, total]) => ({
        name: category,
        value: total,
        color: CATEGORY_COLORS[category] ?? '#94a3b8',
      }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">{formatCurrency(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-gray-100 shadow-none h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">Despesas por categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            Sem despesas neste mês
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
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
