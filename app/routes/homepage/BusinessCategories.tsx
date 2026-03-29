import { Link } from '@remix-run/react'
import React, { useRef } from 'react'
import { BiHotel, BiSolidStar } from 'react-icons/bi'
import { BsAirplane, BsChevronDoubleRight, BsHouse } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FcHome } from 'react-icons/fc'
import { GiKnifeFork } from 'react-icons/gi'
import AlternateImage from '~/components/content/AlternateImage'
import { appConfig, config, formatNumber } from '~/lib/lib'
import { ListingType } from '~/lib/types'

const hotels = [
    {
        title: "Luxury shopping paradise amid dazzling modern architecture.",
        city: `dubai`,
        category: 'shopping and retail',
        link: `${appConfig.searchBaseUrl}?q=&category=shopping and retail&city=dubai`,
        bglink: `https://www.vexcolt.com/wp-content/uploads/2018/04/ref_Mall_01.jpg`,

    },
    {
        title: "Historic streets brimming with iconic retail destinations.",
        city: `london`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=london',
        bglink: `https://www.europetravelguide.co.uk/wp-content/uploads/2020/05/Shopping-in-London.jpg`
    },
    {
        title: "Ultimate urban shopping experience, endless variety.",
        city: `new york city`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=new york',
        bglink: `https://thetravelexpert.ie/wp-content/uploads/2015/09/new-york-742795_1280_opt.jpg`
    },
    {
        title: "Opulent malls meet rich traditional market culture.",
        city: `doha`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=doha',
        bglink: `https://visitqatar.com/content/dam/visitqatar/img/things-to-do/shopping-in-qatar/shopping-malls-2.jpg/_jcr_content/renditions/medium-1280px.jpeg`
    },
    {
        title: "Chic fashion capital and style epicenter.",
        city: `paris`,
        category: 'shopping and retail',
        link: '/web/browse?q=hotel&city=paris',
        bglink: `https://hips.hearstapps.com/hmg-prod/images/crowds-of-people-at-rue-montorgueil-pedestrian-royalty-free-image-1576958383.jpg`
    },
    // Added more categories to demonstrate overflow

]

export type HotelType = {
    title: string
    category?: string
    link: string
    bglink?: string
    city?: string
}

export interface BusinessCategoriesProps {
    items: ListingType[],
    title: string,
    subtitle: string,
}

const BusinessCategories = ({ items, title, subtitle }: BusinessCategoriesProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };


    const styleSht = `
            .hide-bottom-scrollbar {
                overflow-y: auto;
                scrollbar-width: none;
            }

            .hide-bottom-scrollbar::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }`

    return (
        <div className={`mt-12`}>

            <div className={`px-[15px]`}>

                <div className={`max-w-[1300px] mx-auto w-full`}>

                    {/** section title and sub title */}
                    <div className={`flex place-content-between place-items-center  mb-3 `}>
                        <div className={`flex flex-col place-content-center  w-[70%] h-full place-items-start`}>
                            <div className={`text-[17px] font-sans font-bold`}>
                                {title}
                            </div>

                            <div className={`text-[12px] font-sans`}>
                                {subtitle}
                            </div>
                        </div>
                        <div>
                            <Link to={`/web/latest`}>
                                <div className={`flex place-items-center gap-2`}>
                                    <span>
                                        More
                                    </span>
                                    <BsChevronDoubleRight />
                                </div>
                            </Link>
                        </div>
                    </div>


                    {/** scroller */}
                    <style dangerouslySetInnerHTML={{ __html: styleSht }} />
                    <div className={`relative`}>
                        <div
                            ref={scrollRef}
                            className={`flex max-w-[1300px] mx-auto w-full gap-4 overflow-x-auto hide-bottom-scrollbar rounded-t-3xl`}
                        >
                            <div className={`flex gap-4`}>
                                {
                                    items?.map((item: ListingType, index: number) => {
                                        const IMG_BASE_STORAGE = config.IMG_BASE_STORAGE
                                        const imgEndPoint = (item?.profile_image_url_ext) ? (IMG_BASE_STORAGE + item.profile_image_url_ext) : ''

                                        let ITEM_URL = '/'
                                        ITEM_URL += (item?.username) ? item?.username : item?.gid
                                        return (
                                            <div
                                                key={index}
                                                className={`w-[160px] md:min-w-[160px]`}
                                            >
                                                <Link to={ITEM_URL}>
                                                    <div className={`border-none rounded-3xl  h-[150px]  overflow-hidden relative`}>
                                                        {
                                                            item?.profile_image_url_ext ?
                                                                <img
                                                                    src={imgEndPoint}
                                                                    alt=""
                                                                    className={`object-cover h-full w-full`}
                                                                /> :
                                                                <AlternateImage title={item.title} />
                                                        }

                                                        <div className={`absolute bottom-0 text-white h-[40%] w-full flex items-end content-start`}>

                                                        </div>
                                                    </div>

                                                    <div className={`mt-3 relative `}>

                                                        <div className={` text-[13px] font-[500] mt-[3px] line-clamp-2 leading-[16px]`}>
                                                            {item?.title}
                                                        </div>

                                                    </div>

                                                    <div className={`text-sm text-gray-500 flex place-items-center gap-2`}>
                                                        <span className={`flex gap-1`}>
                                                            <span>Starting:</span>
                                                            <span className={`uppercase`}>
                                                                {item?.currency}{formatNumber(item?.minimum_amount)}
                                                            </span>
                                                        </span>

                                                        {
                                                            item?.avg_rating &&
                                                            <span className={`flex place-items-center`}>
                                                                <BiSolidStar />
                                                                <span>
                                                                    {item?.avg_rating}
                                                                </span>
                                                            </span>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/** navlinks */}
                        {/** left arrow */}
                        <div className={`absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[0]`}
                            onClick={() => { scrollLeft() }}
                        >
                            <FaChevronLeft />
                        </div>


                        {/** right arrow */}
                        <div className={`absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[0]`}
                            onClick={() => { scrollRight() }}
                        >
                            <FaChevronRight />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default BusinessCategories
