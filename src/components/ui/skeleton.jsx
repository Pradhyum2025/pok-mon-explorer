// ---------------------------------------------------------------------
// <copyright file="skeleton.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

