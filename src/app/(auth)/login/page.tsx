'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/theme-toggle'
import { TrendingUp, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      {/* Barra superior com toggle */}
      <div className="flex justify-end px-4 py-3">
        <ThemeToggle />
      </div>

      {/* Conteúdo centralizado */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">FinançasPessoais</span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Bem-vindo de volta</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Entre na sua conta para continuar</p>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-11"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Não tem uma conta?{' '}
            <Link href="/signup" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
