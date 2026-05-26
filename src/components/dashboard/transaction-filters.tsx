'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MONTHS, ALL_CATEGORIES } from '@/lib/constants'
import type { FilterState } from '@/lib/types'
import { Search } from 'lucide-react'

interface TransactionFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const currentYear = new Date().getFullYear()
const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1]

export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
  function update(partial: Partial<FilterState>) {
    onFiltersChange({ ...filters, ...partial })
  }

  return (
    <Card className="border-gray-100 shadow-none h-full">
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Filtros</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {/* Month */}
          <Select
            value={String(filters.month)}
            onValueChange={(v) => update({ month: Number(v) })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Select
            value={String(filters.year)}
            onValueChange={(v) => update({ year: Number(v) })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category */}
          <Select
            value={filters.category}
            onValueChange={(v) => update({ category: v ?? 'all' })}
          >
            <SelectTrigger className="h-9 text-sm col-span-2 sm:col-span-1">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {ALL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative col-span-2 sm:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar descrição..."
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
