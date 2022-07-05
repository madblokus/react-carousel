import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import { Offer } from '../types'
import ArrowLeft from '../components/arrow/arrows/ArrowLeft';
import ArrowRight from '../components/arrow/arrows/ArrowRight';
import { ScrollingCarousel } from '../components/scrolling-carousel'
import { OfferCard}  from '../components/offer-card';


interface IProps {
  offers: Offer[];
}

const Home = ({offers}: IProps) => {


  return (
    <div className={styles.container}>
      <Head>
        <title>App Unite carousel recruitment task</title>
        <meta name="description" content="App Unite carousel recruitment task" />
      </Head>
      <ScrollingCarousel className='offer-carousel' leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />} >
        {
          offers.map((offer: Offer) => (
            <OfferCard offer={offer} key={parseInt(offer.id)}/>
          ))
        }
      </ScrollingCarousel>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const response = await fetch(`https://gist.githubusercontent.com/jtomaszewski/5d2a6532001157fd8d7672f5589fdc01/raw/e3fa6cdc90a691a36e18a2985bc8afa54b8a17b0/allegro-lokalnie-carousel-offers.json`);
  const data = await response.json();

  return {
    props: {
      offers: data.offers,
    },
  }
}



