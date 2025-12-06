// ---------------------------------------------------------------------
// <copyright file="AuthButton.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogIn, LogOut, User } from 'lucide-react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Button variant="ghost" disabled>Loading...</Button>
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={() => signIn('google')}>
      <LogIn className="h-4 w-4 mr-2" />
      Login with Google
    </Button>
  )
}

