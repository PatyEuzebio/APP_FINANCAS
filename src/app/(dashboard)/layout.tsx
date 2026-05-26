import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Toaster } from '@/components/ui/sonner'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex">
      <Sidebar userEmail={user.email ?? ''} />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
