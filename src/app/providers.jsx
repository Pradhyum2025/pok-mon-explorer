// ---------------------------------------------------------------------
// <copyright file="providers.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/redux/store'
import { useEffect } from 'react'
import { loadFavorites } from '@/redux/slices/favoritesSlice'

export function Providers({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      store.dispatch(loadFavorites())
    }
  }, [])

  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}

