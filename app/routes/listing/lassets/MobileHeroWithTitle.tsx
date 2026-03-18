import React, { useEffect, useState } from 'react'
import HeroCarousel from './HeroCarousel'
import { BiTrophy } from 'react-icons/bi'
import { ImageType } from './Hero'
import { ListingType } from '~/lib/types'
import { list } from 'postcss'
import { spinUpPlaceholder } from '~/lib/lib'

interface MobileHeroProps {
    title: string
    images: ImageType[]
    listing: ListingType
}

const defaultImg = [{
    image_url: spinUpPlaceholder(),
    default: true
}]
const MobileHeroWithTitle = ({ title, images, listing }: MobileHeroProps) => {
    const [heroImages, setHeroImages] = useState<ImageType[]>([])

    useEffect(() => {
        if (images.length === 0) {
            //setHeroImages(defaultImg)
        } else {
            setHeroImages(images)
        }
    }, [images])

    return (
        <div className={`block md:hidden bg-black`}>
            <div className={`bg-gray-700 h-[600px] w-full z-[0]`}>
                <div className={`absolute  flex items-center -top-20 justify-center text-gray-400 font-extralight text-sm`}>
                    {listing?.title}
                </div>
                <HeroCarousel images={heroImages} listing={listing} />
            </div>

            <div className={`px-5 pt-8 pb-5 rounded-t-3xl overflow-hidden z-[3] bg-white`}>
                <div className={`text-[25px] font-semibold text-center leading-[1.3em]`}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default MobileHeroWithTitle
