// ---------------------------------------------------------------------
// <copyright file="PokemonGrid.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { Skeleton } from '@/components/ui/skeleton'
import PokemonCard from './PokemonCard'

export default function PokemonGrid({ pokemonList, loading, onCardClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No Pokémon found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  )
}

