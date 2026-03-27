import React, { useEffect, useState } from 'react'

import WhereTo from './homepage/assets/search/SearchBusiness'
import HomeLayout from './landing/assets/HomeLayout'
import SearchBusiness from './homepage/assets/search/SearchBusiness'
import TopCategories from './homepage/assets/topcategories/TopCategories'
import LatestBusinesses from './homepage/assets/latestbusinesses/LatestBusinesses'
import Inspire from './homepage/assets/inspire/Inspire'
import Shopping from './homepage/assets/shopping/Shopping'
import Hotels from './homepage/assets/hotels/Hotels'
import YourGuide from './homepage/assets/yourguide/YourGuide'
import FooterAlt from '~/components/footer/FooterAlt'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { config, generateRandom10DigitNumber, getBusinessesByCityId, getHomeListingByCategory, getLatestBusinesses, getListingByCategory, getMeta, getTopLatestFeaturedBusinesses, logError } from '~/lib/lib'
import { useLoaderData } from '@remix-run/react'
import { ListingType } from '~/lib/types'
import { late } from 'zod'
import TopDestinations from './homepage/assets/topdestinations/TopDestinations'
import NotificationDemo, { OperationNotification } from '~/components/content/OperationNotification'
import OperationDemo, { OperationProvider } from '~/context/OperationContext'
import BusinessCategories from './homepage/BusinessCategories'



export const loader: LoaderFunction = async ({ request, params }) => {


  try {
    const id = params.id || null
    let hotels: ListingType[] | [] = []
    let latestBusinesses: ListingType[] | [] = []
    let gallery
    let ratingData
    let randomNumber
    let latest
    let abujaBusinesses
    let dubaiBusinesses

    try {
      hotels = await getHomeListingByCategory('hotel', 6)
      latestBusinesses = await getLatestBusinesses(10)
      latest = await getTopLatestFeaturedBusinesses()
      randomNumber = generateRandom10DigitNumber()
      abujaBusinesses = await getBusinessesByCityId('76749')
      dubaiBusinesses = await getBusinessesByCityId('32')

      console.log(abujaBusinesses)
      console.log('here')
    } catch (error: any) {
      console.log(error.message)
    }



    return {
      hotels: hotels,
      latestBusinesses: latestBusinesses,
      randomNumber: randomNumber,
      latest: latest,
      abujaBusinesses: abujaBusinesses,
      dubaiBusinesses: dubaiBusinesses
    }
  } catch (err: any) {
    logError(err)
  }

}

type OperationType = 'login' | 'signup' | 'update' | 'processing';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let randomNo = data?.randomNumber

  const res: any = useLoaderData()

  let randomNumber = randomNo

  let title = `${config.SITENAME} Business Directory, Explore Listings Around The World`

  const fullUrl: string = data.fullUrl + `?v=${randomNumber}`;

  const description = `Discover and connect with businesses worldwide. ${config.SITENAME}.com helps you explore listings, find services, and grow your network across industries and countries.`

  let img = `https://gruthe.com/gruthe5.png?v=${randomNumber}`



  const metaImage = img


  try {
    return getMeta(randomNumber, fullUrl, title, description, metaImage)
  } catch (e: any) {
    logError(e)
  }
  return []
};

const _index = () => {
  const loader: any = useLoaderData()
  const hotels = loader.hotels
  const latestBusinesses = loader.latestBusinesses
  const latest = loader.latest
  const abujaBusinesses = loader.abujaBusinesses
  const dubaiBusinesses = loader.dubaiBusinesses

  return (
    <OperationProvider defaultDuration={4000}>

      <HomeLayout>

        {/** background with search */}
        <SearchBusiness />

        <BusinessCategories
          items={latest}
          title='Featured Listings'
          subtitle={`Whatever your business, we've got you.`}
        />


        <BusinessCategories
          items={abujaBusinesses}
          title='Businesses in Abuja'
          subtitle={`Whatever your business, we've got you.`}
        />


        <BusinessCategories
          items={dubaiBusinesses}
          title='Businesses in Dubai'
          subtitle={`Whatever your business, we've got you.`}
        />

        {/** top categories */}
        {/* <TopCategories /> */}


        {/** top categories */}
        {/* <Hotels data={hotels} /> */}


        {/** top categories */}
        <YourGuide />


        {/** latest businesses */}
        {/* <LatestBusinesses data={latestBusinesses} /> */}
        {/* <TopDestinations /> */}


        {/** inspire */}
        {/*  <Inspire /> */}


        {/** shopping */}
        {/* <Shopping /> */}

        <div className={`h-[100px]`}>

        </div>

        {/** footer */}
        <FooterAlt />
      </HomeLayout>
    </OperationProvider>
  )
}

export default _index
