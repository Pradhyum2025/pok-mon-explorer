// ---------------------------------------------------------------------
// <copyright file="localStorage.js" company="Deepsolv">
// Copyright (c) Deepsolv. All rights reserved.
// </copyright>
// --------------------------------------------------------------------

export const saveToLocalStorage = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    const stringValue = JSON.stringify(value)
    localStorage.setItem(key, stringValue)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getFromLocalStorage = (key) => {
  if (typeof window === 'undefined') return null
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

