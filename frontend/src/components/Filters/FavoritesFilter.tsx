import React from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { useCommerceStore } from "../../store";

function FavoritesFilter() {
  const {
    favoritesToggled,
    toggleFavoritesFilter
  } = useCommerceStore()
  return (
    <BsHeartFill onClick={toggleFavoritesFilter} size={40} className={`BsHeart-main m-0 p-0 cursor-pointer ${favoritesToggled && 'active'}`} />
  )
}

export default FavoritesFilter