export const EXPENSE_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Vestuário',
  'Assinaturas',
  'Outros',
] as const

export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Presente',
  'Outros',
] as const

export const ALL_CATEGORIES = Array.from(new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]))

export const CATEGORY_COLORS: Record<string, string> = {
  Alimentação: '#f97316',
  Transporte: '#3b82f6',
  Moradia: '#8b5cf6',
  Lazer: '#ec4899',
  Saúde: '#10b981',
  Educação: '#f59e0b',
  Vestuário: '#6366f1',
  Assinaturas: '#14b8a6',
  Outros: '#94a3b8',
  Salário: '#22c55e',
  Freelance: '#06b6d4',
  Investimentos: '#a855f7',
  Presente: '#fb923c',
}

export const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}
