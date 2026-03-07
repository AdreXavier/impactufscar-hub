import type { Metadata } from 'next'
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'
import ContactForm from '../../../components/public/ContactForm'

export const metadata: Metadata = {
  title: 'Contato — Impact UFSCar',
  description: 'Entre em contato com o Impact UFSCar.',
  openGraph: {
    title: 'Contato — Impact UFSCar',
    description: 'Entre em contato com o Impact UFSCar.',
    images: [{ url: '/og-image.png' }],
  },
}

const socialLinks = [
  {
    href: 'mailto:contato@impactufscar.org',
    label: 'E-mail',
    value: 'contato@impactufscar.org',
    icon: Mail,
  },
  {
    href: 'https://instagram.com/impactufscar',
    label: 'Instagram',
    value: '@impactufscar',
    icon: Instagram,
  },
  {
    href: 'https://linkedin.com/company/impactufscar',
    label: 'LinkedIn',
    value: 'Impact UFSCar',
    icon: Linkedin,
  },
  {
    href: 'https://github.com/impactufscar',
    label: 'GitHub',
    value: 'github.com/impactufscar',
    icon: Github,
  },
]

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-[#0f0f1a] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Contato</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            Tem interesse em participar, colaborar ou saber mais sobre o Impact UFSCar? Fale
            conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="rounded-2xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Envie uma mensagem
            </h2>
            <ContactForm />
          </div>

          {/* Social links */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Outras formas de contato
            </h2>
            <div className="space-y-4">
              {socialLinks.map(({ href, label, value, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] hover:border-[#c4395a] dark:hover:border-[#c4395a] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#50001F]/10 dark:bg-[#c4395a]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#50001F] dark:text-[#c4395a]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#50001F] dark:group-hover:text-[#c4395a] transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
