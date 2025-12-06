// ---------------------------------------------------------------------
// <copyright file="favoritesSlice.js" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit'
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage'

const initialState = {
  pokemonIds: getFromLocalStorage('favoritePokemon') || [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload
      const index = state.pokemonIds.indexOf(pokemonId)
      
      if (index === -1) {
        state.pokemonIds.push(pokemonId)
      } else {
        state.pokemonIds.splice(index, 1)
      }
      
      saveToLocalStorage('favoritePokemon', state.pokemonIds)
    },
    loadFavorites: (state) => {
      const saved = getFromLocalStorage('favoritePokemon')
      if (saved) {
        state.pokemonIds = saved
      }
    },
  },
})

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

