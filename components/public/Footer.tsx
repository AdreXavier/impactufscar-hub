import Link from 'next/link'
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'

const socialLinks = [
  { href: 'https://instagram.com/impactufscar', label: 'Instagram', icon: Instagram },
  { href: 'https://linkedin.com/company/impactufscar', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/impactufscar', label: 'GitHub', icon: Github },
  { href: 'mailto:contato@impactufscar.org', label: 'Email', icon: Mail },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-[#50001F] dark:text-white text-lg">Impact UFSCar</p>
            <p className="text-sm text-gray-500 dark:text-[#d4a0b0] mt-1">
              Organização estudantil da Universidade Federal de São Carlos
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-500 dark:text-[#d4a0b0] hover:text-[#50001F] dark:hover:text-white transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#3a0016] text-center text-xs text-gray-400 dark:text-gray-600">
          © {year} Impact UFSCar. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
