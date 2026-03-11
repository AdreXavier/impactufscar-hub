import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let firstName = ''
  let email = ''

  try {
    const user = await currentUser()
    firstName = user?.firstName ?? ''
    email = user?.primaryEmailAddress?.emailAddress ?? ''
  } catch (error) {
    console.error('Failed to load auth data', error)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-3xl border border-[#3a0016] bg-[#1a0009] p-8 shadow-2xl shadow-black/30">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#d4a0b0]">
              ImpactUFSCar Hub
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              {firstName ? `Olá, ${firstName}.` : 'Olá.'}
            </h1>
            <p className="mt-3 text-sm text-[#d4a0b0]">
              O site foi reduzido para manter somente o acesso por login enquanto a nova versão é
              reconstruída.
            </p>
          </div>
          <UserButton />
        </div>

        <div className="rounded-2xl border border-[#3a0016] bg-[#0f0f1a] p-5">
          <p className="text-sm text-[#d4a0b0]">Conta conectada</p>
          <p className="mt-2 text-lg font-semibold text-white">{email || 'Email indisponível'}</p>
          <p className="mt-3 text-sm text-[#d4a0b0]">
            Você ainda pode entrar com sua conta e gerenciar a sessão normalmente.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-[#50001F] p-5 text-sm text-[#d4a0b0]">
          O restante do conteúdo anterior foi desativado para permitir a reconstrução do site do
          zero.
        </div>
      </section>
    </main>
  )
}
