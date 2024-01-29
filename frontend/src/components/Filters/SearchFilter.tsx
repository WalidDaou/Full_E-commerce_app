import React, { useEffect } from 'react'
import { useCommerceStore } from '../../store';

function SearchFilter() {
  const {
    searchTerm,
    setSearchTerm,

  } = useCommerceStore()

  const search = {
    border: '3px solid black',
    width : '750px'
  }

  return (
    <input style={search} className=" rounded-2xl px-4 " type="search" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
  )
}

export default SearchFilter