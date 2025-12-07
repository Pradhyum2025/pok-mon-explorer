// ---------------------------------------------------------------------
// <copyright file="page.jsx" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PokemonGrid from '@/components/pokemon/PokemonGrid'
import PokemonDetail from '@/components/pokemon/PokemonDetail'
import AuthButton from '@/components/auth/AuthButton'
import { fetchPokemonList, fetchPokemonDetails, fetchTypesList, fetchPokemonByType } from '@/operations/pokeApi'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [types, setTypes] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const limit = 20

  useEffect(() => {
    loadTypes()
    loadPokemon()
  }, [])

  useEffect(() => {
    loadPokemon()
  }, [offset])

  useEffect(() => {
    filterPokemon()
  }, [searchQuery, selectedType, pokemonList])

  const loadTypes = async () => {
    try {
      const data = await fetchTypesList()
      const filteredTypes = data.results.filter(t => 
        !['unknown', 'shadow'].includes(t.name)
      )
      setTypes(filteredTypes)
    } catch (error) {
      console.error('Failed to load types:', error)
    }
  }

  const loadPokemon = async () => {
    setLoading(true)
    try {
      let data
      
      if (selectedType !== 'all') {
        const typeData = await fetchPokemonByType(selectedType)
        setTotalCount(typeData.pokemon.length)
        const pokemonPromises = typeData.pokemon
          .slice(offset, offset + limit)
          .map(p => {
            const id = p.pokemon.url.split('/').slice(-2, -1)[0]
            return fetchPokemonDetails(id)
          })
        const pokemonData = await Promise.all(pokemonPromises)
        setPokemonList(pokemonData)
        setHasNext(offset + limit < typeData.pokemon.length)
        setHasPrev(offset > 0)
      } else {
        data = await fetchPokemonList(offset, limit)
        setTotalCount(data.count)
        const pokemonPromises = data.results.map(p => {
          const id = p.url.split('/').slice(-2, -1)[0]
          return fetchPokemonDetails(id)
        })
        const pokemonData = await Promise.all(pokemonPromises)
        setPokemonList(pokemonData)
        setHasNext(data.next !== null)
        setHasPrev(data.previous !== null)
      }
    } catch (error) {
      console.error('Failed to load pokemon:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPokemon = () => {
    let filtered = [...pokemonList]

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === selectedType)
      )
    }

    setFilteredList(filtered)
  }

  const handleCardClick = async (pokemon) => {
    try {
      const details = await fetchPokemonDetails(pokemon.id)
      setSelectedPokemon(details)
      setIsDetailOpen(true)
    } catch (error) {
      console.error('Failed to load pokemon details:', error)
    }
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
    setOffset(0)
  }

  const handleNext = () => {
    setOffset(prev => prev + limit)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setOffset(prev => Math.max(0, prev - limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-clip-text text-transparent">Pokémon Explorer</h1>
            <AuthButton />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        <PokemonGrid
          pokemonList={filteredList}
          loading={loading}
          onCardClick={handleCardClick}
        />
      </main>

      {!loading && selectedType === 'all' && !searchQuery && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border/40 shadow-lg z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                Showing {offset + 1} - {Math.min(offset + limit, totalCount)} of {totalCount} Pokémon
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={!hasPrev}
                >
                  <span className='hidden md:inline'>
                  Previous
                  </span>
                  <span  className='inline md:hidden'>
                    <FaLongArrowAltLeft/>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={!hasNext}
                >
                  <span className='hidden md:inline'>
                  Next
                  </span>
                  <span  className='inline md:hidden'>
                    <FaLongArrowAltRight/>
                  </span>
                  
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
        />
      )}
    </div>
  )
}

