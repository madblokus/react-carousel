import React, { useState } from 'react'
import Image from 'next/image'
import LocationIcon from '../../public/wishlist-icon.svg'
import styles from './WishList.module.css'


export const WishList = () => {
  const [wishList, setWishlist] = useState<boolean>(false);
  const handleToggleWishlist = () => {
    (wishList == false ? setWishlist(true) : setWishlist(false));
  }

  enum WishlistColors {
    initial = '#FFFFFF',
    added = '#8b5cf6',
  }

  return (
    <div className={styles.wishlistButton} style={wishList ? {background: WishlistColors.added} : {background: WishlistColors.initial}}>
      <Image
        src={LocationIcon}
        onClick={handleToggleWishlist}
        alt='Wishlist'
        layout='fixed'
      />
    </div>

  )
}
