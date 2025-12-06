// ---------------------------------------------------------------------
// <copyright file="PokemonDetail.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { Heart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/slices/favoritesSlice'

export default function PokemonDetail({ pokemon, open, onOpenChange }) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.pokemonIds)
  const isFavorite = favorites.includes(pokemon?.id)

  if (!pokemon) return null

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(pokemon.id))
  }

  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default || 
                   ''

  const getStatName = (statName) => {
    const names = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed'
    }
    return names[statName] || statName
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto md:max-h-[85vh] md:overflow-y-visible md:overflow-hidden">
        <DialogHeader className="pr-10 md:pr-12">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl md:text-3xl text-left capitalize flex-1">{pokemon.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={isFavorite ? 'text-red-500' : 'flex-shrink-0'}
            >
              <Heart className={`h-5 w-5 md:h-6 md:w-6 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 md:space-y-5 overflow-y-auto max-h-[calc(90vh-120px)] md:max-h-none md:overflow-y-visible">
          <div className="flex justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="h-40 w-40 md:h-48 md:w-48 object-contain"
              />
            ) : (
              <div className="h-40 w-40 md:h-48 md:w-48 bg-muted rounded flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold mb-1.5">Types</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types?.map((type, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs bg-secondary text-secondary-foreground capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-1.5">Abilities</h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.abilities?.map((ability, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs bg-muted capitalize"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">Base Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {pokemon.stats?.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium capitalize text-foreground">{getStatName(stat.stat.name)}</span>
                    <span className="font-semibold text-sm">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

