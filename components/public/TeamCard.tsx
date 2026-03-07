import { User } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  photo: string | null
  bio: string
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center rounded-2xl border border-gray-200 dark:border-[#3a0016] bg-white dark:bg-[#1a0009] p-6 hover:border-[#c4395a] dark:hover:border-[#c4395a] transition-all hover:shadow-md dark:hover:shadow-none">
      <div className="w-20 h-20 rounded-full bg-[#50001F]/10 dark:bg-[#c4395a]/10 flex items-center justify-center mb-4">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <User size={36} className="text-[#50001F] dark:text-[#c4395a]" />
        )}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
      <p className="text-sm text-[#50001F] dark:text-[#c4395a] font-medium mt-1">{member.role}</p>
      <p className="text-sm text-gray-500 dark:text-[#d4a0b0] mt-2 leading-relaxed">{member.bio}</p>
    </div>
  )
}
