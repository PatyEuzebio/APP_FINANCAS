'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { createTransaction, updateTransaction } from '@/lib/transactions'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/lib/constants'
import type { Transaction, TransactionFormData } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TransactionModalProps {
  open: boolean
  onClose: () => void
  transaction: Transaction | null
  onSaved: () => void
  defaultDate: string
}

const defaultForm: TransactionFormData = {
  description: '',
  amount: '',
  type: 'expense',
  category: '',
  date: '',
}

export function TransactionModal({
  open,
  onClose,
  transaction,
  onSaved,
  defaultDate,
}: TransactionModalProps) {
  const [form, setForm] = useState<TransactionFormData>(defaultForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      if (transaction) {
        setForm({
          description: transaction.description,
          amount: String(transaction.amount),
          type: transaction.type,
          category: transaction.category,
          date: transaction.date,
        })
      } else {
        setForm({ ...defaultForm, date: defaultDate })
      }
    }
  }, [open, transaction, defaultDate])

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function update(field: keyof TransactionFormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      // Reset category when type changes if current category doesn't belong to new type
      if (field === 'type') {
        const cats = value === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
        if (!cats.includes(next.category as never)) {
          next.category = ''
        }
      }
      return next
    })
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form.category) {
      toast.error('Selecione uma categoria')
      return
    }

    const amount = parseFloat(form.amount.replace(',', '.'))
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valor inválido')
      return
    }

    setLoading(true)
    try {
      if (transaction) {
        await updateTransaction(transaction.id, { ...form, amount: String(amount) })
        toast.success('Transação atualizada!')
      } else {
        await createTransaction({ ...form, amount: String(amount) })
        toast.success('Transação criada!')
      }
      onSaved()
    } catch {
      toast.error('Erro ao salvar transação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {transaction ? 'Editar transação' : 'Nova transação'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Type toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => update('type', 'expense')}
              className={`h-9 rounded-lg text-sm font-medium transition-colors border ${
                form.type === 'expense'
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => update('type', 'income')}
              className={`h-9 rounded-lg text-sm font-medium transition-colors border ${
                form.type === 'income'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              Receita
            </button>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado, Salário..."
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              required
              maxLength={100}
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0,00"
                value={form.amount}
                onChange={(e) => update('amount', e.target.value)}
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={(v) => update('category', v ?? '')}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {loading ? 'Salvando...' : transaction ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
