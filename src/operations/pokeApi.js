// ---------------------------------------------------------------------
// <copyright file="pokeApi.js" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Error fetching pokemon list:', error)
    throw error
  }
}

export const fetchPokemonDetails = async (idOrName) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${idOrName}`)
    return response.data
  } catch (error) {
    console.error('Error fetching pokemon details:', error)
    throw error
  }
}

export const fetchTypesList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/type`)
    return response.data
  } catch (error) {
    console.error('Error fetching types list:', error)
    throw error
  }
}

export const fetchPokemonByType = async (typeName) => {
  try {
    const response = await axios.get(`${BASE_URL}/type/${typeName}`)
    return response.data
  } catch (error) {
    console.error('Error fetching pokemon by type:', error)
    throw error
  }
}

