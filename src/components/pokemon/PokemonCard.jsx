// ---------------------------------------------------------------------
// <copyright file="PokemonCard.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleFavorite } from '@/redux/slices/favoritesSlice'

export default function PokemonCard({ pokemon, onCardClick }) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.pokemonIds)
  const isFavorite = favorites.includes(pokemon.id)
  const [imageError, setImageError] = useState(false)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    dispatch(toggleFavorite(pokemon.id))
  }

  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default || 
                   ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-xl transition-all duration-300 border-border/60 bg-gradient-to-br from-white to-slate-50/50 hover:border-primary/30"
        onClick={() => onCardClick(pokemon)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg capitalize">{pokemon.name}</h3>
              <p className="text-sm text-muted-foreground">#{pokemon.id}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={isFavorite ? 'text-red-500' : ''}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <div className="flex justify-center mb-3">
            {!imageError && imageUrl ? (
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="h-32 w-32 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-32 w-32 bg-muted rounded flex items-center justify-center">
                <span className="text-xs text-muted-foreground">No image</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {pokemon.types?.map((type, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 border border-indigo-200/50 capitalize shadow-sm"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

