import React, { useEffect } from 'react'
import { useCommerceStore } from '../../store';

function SearchFilter() {
  const {
    searchTerm,
    setSearchTerm,

  } = useCommerceStore()


  return (
    <input className="w-full rounded-2xl px-4 w-4" type="search" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
  )
}

export default SearchFilter