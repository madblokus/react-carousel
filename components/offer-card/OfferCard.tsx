import React from 'react'
import {Offer} from '../../types'
import { NextPage } from 'next'
import Image from 'next/image'
import LocationIcon from '../../public/location-icon.svg'
import styles from './OfferCard.module.css'
import { WishList } from '../wishlist'

interface IProps {
  offer: Offer;
}

enum TitleCallToAction {
	BuyNow = 'KUP TERAZ',
	Advertisement = 'REKLAMA'
}

export const OfferCard: NextPage<IProps> = ({offer}) => {
  const {images, allegroLocally, name, sellingMode: {buyNow}} = offer;
  const saleAmount: string[] | undefined = buyNow?.price.sale.amount.split('.');
  
  enum PolishShorthandCurrency {
    PLN = 'PLN',
    ZL = 'zł'
  }

  return (
    <div className={styles.offer}>
      <div className={styles.imageHelper}>
        <WishList />
        <div className={styles.imageContainer}>
          <Image
            src={images[0].url}
            alt={images[0].alt}
            layout='fill'
            objectFit="cover"
          />
        </div>
      </div>
      
      <div className={styles.information}>
        <div className={styles.topCardInfo}>
          <h3 className={styles.title}>{name}</h3>
          {saleAmount ? (<div className={styles.saleAmount}>{saleAmount?.[0]},<div className={styles.saleSmallAmount}>{saleAmount?.[1]}<span className={styles.currencyTitle}>{PolishShorthandCurrency.ZL}</span></div></div>) : ''}
          {saleAmount ? (<span className={styles.titleCallToAction} >{TitleCallToAction.BuyNow}</span>) : (<span className={styles.titleCallToAction}>{TitleCallToAction.Advertisement}</span>)}
        </div>
        <div className={styles.cardTextBottom}>
          <div className={styles.imageContainer}>
            <Image
              src={LocationIcon}
              alt={"Localization"}
              layout="fixed">
            </Image>
          </div>
          <span>{allegroLocally.location.label}</span>
        </div>
      </div>
    </div>
  )
}