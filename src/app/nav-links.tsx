'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className='flex flex-row gap-x-2 bg-indigo-500 text-white font-black mb-5'>
      <Link className={`link ${pathname === '/' ? 'bg-white text-black p-2' : 'p-2'}`} href="/">
        Home
      </Link>

      <Link
        className={`link ${pathname === '/system_functions' ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/system_functions"
      >
        System Functions
      </Link>

      <Link
        className={`link ${pathname.startsWith('/models') ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/models"
      >
        Models
      </Link>

      <Link
        className={`link ${pathname === '/roles' ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/roles"
      >
        Roles
      </Link>

      <Link
        className={`link ${pathname === '/data_operations' ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/data_operations"
      >
        Data Operations
      </Link>

      <Link
        className={`link ${pathname === '/maturity_levels' ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/maturity_levels"
      >
        Maturity Levels
      </Link>

      <Link
        className={`link ${pathname.startsWith('/rules') ? 'bg-white text-black p-2' : 'p-2'}`}
        href="/rules"
      >
        Rules
      </Link>

    </nav>
  )
}
