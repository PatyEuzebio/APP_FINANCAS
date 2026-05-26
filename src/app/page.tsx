import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  PieChart,
  Shield,
  Download,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Smartphone,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">FinançasPessoais</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Funcionalidades
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Como funciona
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Simples, rápido e gratuito
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Controle suas finanças{' '}
            <span className="text-emerald-500">sem complicação</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Registre receitas e despesas, visualize seu saldo mensal e tome decisões financeiras melhores com o FinançasPessoais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base font-semibold">
                Criar conta grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '100%', label: 'Gratuito' },
            { value: 'RLS', label: 'Dados protegidos' },
            { value: 'CSV', label: 'Exportação fácil' },
            { value: 'Mobile', label: 'Responsivo' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-emerald-500 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo que você precisa</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Funcionalidades pensadas para facilitar o controle financeiro no dia a dia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                Icon: BarChart3,
                color: 'bg-blue-50 text-blue-500',
                title: 'Dashboard visual',
                desc: 'Veja receitas, despesas e saldo do mês em um painel limpo e intuitivo.',
              },
              {
                Icon: PieChart,
                color: 'bg-purple-50 text-purple-500',
                title: 'Gráfico por categoria',
                desc: 'Entenda para onde vai seu dinheiro com gráficos de pizza interativos.',
              },
              {
                Icon: Shield,
                color: 'bg-emerald-50 text-emerald-500',
                title: 'Dados seguros',
                desc: 'Autenticação segura e Row Level Security garantem que só você acessa seus dados.',
              },
              {
                Icon: Download,
                color: 'bg-orange-50 text-orange-500',
                title: 'Exportar CSV',
                desc: 'Baixe suas transações filtradas em planilha com um clique.',
              },
              {
                Icon: Smartphone,
                color: 'bg-pink-50 text-pink-500',
                title: 'Responsivo',
                desc: 'Use no celular, tablet ou computador. Interface adaptada para qualquer tela.',
              },
              {
                Icon: TrendingUp,
                color: 'bg-yellow-50 text-yellow-500',
                title: 'Filtros avançados',
                desc: 'Filtre por mês, categoria ou busque por descrição rapidamente.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como funciona</h2>
            <p className="text-lg text-gray-500">Em 3 passos simples você começa a controlar seu dinheiro.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Crie sua conta', desc: 'Cadastro rápido com e-mail e senha. Sem cartão de crédito.' },
              { step: '02', title: 'Registre transações', desc: 'Adicione receitas e despesas com categoria, data e descrição.' },
              { step: '03', title: 'Acompanhe o saldo', desc: 'Veja o resumo mensal no dashboard e entenda seus gastos.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comece hoje mesmo</h2>
          <p className="text-lg text-gray-500 mb-8">
            Crie sua conta gratuitamente e comece a organizar suas finanças agora.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 h-12 text-base font-semibold">
              Criar conta grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">FinançasPessoais</span>
        </div>
        <p className="text-sm text-gray-400">© 2025 FinançasPessoais. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
