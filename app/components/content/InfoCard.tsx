import React, { useEffect, useState } from 'react'

import { BsHeart } from 'react-icons/bs'
import { BiSolidStar, BiStar } from 'react-icons/bi'
import { ListingType } from '~/lib/types'
import { config, convertDashToSpace, formatInternationalPhone, formatNumber, getInitials, headers, removeAllParagraphs, removePlusSign, splitPhoneString, truncateText } from '~/lib/lib'

import formatPhoneNumber from '~/lib/phoneFormatter'
import RatingBoxInfoCard from './RatingBoxInfoCard'
import { Link } from '@remix-run/react'
import AlternateImage from '~/components/content/AlternateImage'




/**
 * Formats an international phone number (E.164) in a universal readable format
 * Example:
 * +937048048395 → +93 704 804 8395
 */




const InfoCard = ({ item, isFirst = false }: { item: ListingType, isFirst?: boolean }) => {
    const [data, setData] = useState<ListingType | null>(null)
    const [imgPath, setImgPath] = useState('')
    const [img, setImg] = useState('')
    useEffect(() => {
        if (item) {

            setData(item)
        }
    }, [item])



    useEffect(() => {

        if (data !== null) {

            let img = ''

            if (data?.bg_image_url_ext !== undefined && data?.bg_image_url_ext !== null) {
                img = data?.bg_image_url_ext

            } else if (data?.profile_image_url_ext !== undefined && data?.profile_image_url_ext !== null) {
                img = data?.profile_image_url_ext

            } else {
                img = ''
            }

            setImg(img)
            let imgPath: string = config?.IMG_BASE_URL + img
            setImgPath(imgPath)
        }
    }, [data])
    return (
        <div>
            <a href={`${(item?.username !== null && item?.username !== '' && item?.username !== undefined) ? `/${item?.username}` : `/${item?.gid}`}`}>
                <div className={`flex py-4 border-b border-gray-200/80 cursor-pointer hover:opacity-80 transition duration-200 ease-out group ${isFirst ? 'border-t' : ''} group`}>
                    <div className={`relative h-48 min-w-40 w-40 md:h-52 md:w-52 md:min-w-52 flex-shrink-0 rounded-3xl overflow-hidden shadow-md group-hover:shadow-lg group-hover:shadow-gray-300 border group-hover:border-none`}>

                        {
                            img === '' ?
                                <AlternateImage title={item?.title} /> :
                                <img
                                    src={imgPath}
                                    alt=""
                                    className={`object-cover h-full w-full  `}
                                />
                        }
                    </div>

                    <div className={`flex flex-col flex-grow pl-3 relative`}>
                        <div className={`flex justify-between relative`}>
                            <p className={`text-[11px] leading-[1.2em] capitalize line-clamp-1 hover:underline`}>
                                <Link to={`/web/category/${item.category}`}>
                                    {convertDashToSpace(item.category)}
                                </Link>

                            </p>
                            <div>
                                {/* <BsHeart className={`text-2xl cursor-pointer`} /> */}
                                <div className={`text-[11px] md:text-[13px] font-bold min-w-[100px] text-right`}>{formatInternationalPhone(splitPhoneString(item?.phone)) || `n/a`}</div>
                            </div>
                        </div>

                        <h4 className={`text-[17px]  leading-[1.2em] text-blue-700 group-hover:underline`}>
                            {item?.title}
                        </h4>

                        <div className={`border-b w-10 pt-2`} />

                        <div className={`pt-2 flex-grow`}>
                            <div className={`text-[13px] text-black line-clamp-2 leading-[1.3em]`}>
                                {truncateText(removeAllParagraphs(item?.short_description), 230)}
                            </div>


                        </div>

                        <div className={`flex justify-between items-end pt-5 h-[100px]`}>
                            <div className={`w-[70%] h-full`}>
                                <div className={`text-[12px] -space-y-.5`}>
                                    <p className={`line-clamp-1`}>{item?.address_one}</p>
                                    <p>
                                        {
                                            item?.address_two &&
                                            <span>
                                                {`${item.address_two}, `}
                                            </span>
                                        }

                                        {
                                            item?.city_name &&
                                            <span>
                                                {`${item?.city_name}, `}
                                            </span>
                                        }

                                        {item?.country_name}
                                    </p>
                                </div>
                                <div className={`mt-2 flex gap-1`}>
                                    <RatingBoxInfoCard rating={Number(item?.avg_rating) || 0} />
                                    <span>
                                        {item?.avg_rating || 0}
                                    </span>
                                    <span>
                                        ({item?.count_of_rating || 0})
                                    </span>
                                </div>
                            </div>

                            <div className={`w-[30%]  h-full flex flex-col place-items-end`}>
                                <p className={`font-light`}>
                                    Starting
                                </p>
                                <p className={`font-bold text-[19px] flex gap-[1px]`}>
                                    <span>
                                        {item.currency}
                                    </span>
                                    <span className={`tracking-tight`}>
                                        {formatNumber(Number(item.minimum_amount) || 0)}
                                    </span>
                                </p>

                                <div className={`hover:underline text-orange-500`}>
                                    Website
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default InfoCard
