import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinançasPessoais — Controle financeiro simples',
  description:
    'Registre receitas e despesas, visualize seu saldo mensal e tome melhores decisões financeiras.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        {children}
      </body>
    </html>
  )
}
