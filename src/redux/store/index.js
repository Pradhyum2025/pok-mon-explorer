// ---------------------------------------------------------------------
// <copyright file="index.js" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})

