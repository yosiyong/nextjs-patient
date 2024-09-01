'use client'
import { ReactNode, useTransition, ChangeEvent } from 'react'
import { useRouter, usePathname } from '@/navigation'

export default function LocaleSwitcherSelect({ children, defaultValue }: { children: ReactNode, defaultValue: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      router.replace(pathname, {locale: event.target.value})
    })
  }

  return (
    <select
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={onSelectChange}
    >
      {children}
    </select>
  )
}