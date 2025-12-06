// ---------------------------------------------------------------------
// <copyright file="auth.js" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

import { getServerSession } from 'next-auth/next'

export async function getSession() {
  return await getServerSession()
}

