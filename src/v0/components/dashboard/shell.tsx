import { Sidebar } from "@/v0/components/dashboard/sidebar"
import { Topbar } from "@/v0/components/dashboard/topbar"

interface DashboardShellProps {
  children: React.ReactNode
  pageTitle: string
  pageDescription?: string
}

export function DashboardShell({ children, pageTitle, pageDescription }: DashboardShellProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <Topbar pageTitle={pageTitle} pageDescription={pageDescription} />
      <main className="pl-64 pt-32 min-h-screen">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
