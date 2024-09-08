import { useLocale } from 'next-intl'
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const localeObject = Object.entries(routing)
  if (localeObject.length <= 1) { return }

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {localeObject.map((item) => (
        <option key={item[0]} value={item[0]}>
          {item[1]}
        </option>
      ))}
    </LocaleSwitcherSelect>
  )
}