import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import React from 'react'
import { BiChevronRight, BiSolidStar } from 'react-icons/bi'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { TopAd } from '~/components/content/ads/TopAd'
import AlternateImage from '~/components/content/AlternateImage'
import Pagination from '~/components/content/Pagination'
import MainNav from '~/components/header/v1/MainNav'
import { config, convertDashToSpace, formatNumber, getLatestBusinesses2, getTopLatestBusinesses, logError } from '~/lib/lib'
import { ListingType } from '~/lib/types'

export const loader: LoaderFunction = async ({ request, params }) => {

    const url = new URL(request.url);
    let page: number = 1
    let data: any = ""
    let countries = null
    let latest: ListingType[] = []

    try {
        page = parseInt(url?.searchParams.get("page") || "1")
        data = await getLatestBusinesses2(page.toString())

    } catch (error: any) {
        logError(error)
    }

    console.log(data)
    console.log('boo')

    let res = {
        data: data,
        latest: latest
    }
    return res;
}

export interface LatestProps {
    items: ListingType[]
}


const Latest = ({ items }: LatestProps) => {
    const res: any = useLoaderData()
    const latestBusinesses = res.data.items
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const pagination = res.data.pagination

    return (
        <div>
            <MainNav />

            {
                import.meta.env.VITE_ENV === "prod" ?
                    <div>
                        <div className={`h-[10px]`}></div>
                        <TopAd />
                        <div className={`h-[20px]`}></div>
                    </div> :
                    <div className={`h-[40px]`}></div>
            }

            <div className={`w-full px-[15px]`}>
                <div className={`flex place-items-center place-content-between max-w-[1300px] mx-auto w-full mb-6 px-2`}>
                    <div className={`text-2xl font-bold`}>
                        Latest Businesses
                    </div>
                    <Link to={`/web/latest`}>
                        <div className={`flex place-items-center gap-2`}>
                            <span>
                                More
                            </span>
                            <BsChevronDoubleRight />
                        </div>
                    </Link>
                </div>
                <div className={` mb-12 relative max-w-[1300px] mx-auto w-full`}>


                    <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 max-w-[1300px] mx-auto w-full gap-4 rounded-3xl`}

                    >
                        {
                            latestBusinesses?.map((item: ListingType, index: number) => {
                                const IMG_BASE_URL = config.IMG_BASE_URL
                                const imgEndPoint = (item?.profile_image_url_ext) ? (IMG_BASE_URL + item.profile_image_url_ext) : ''

                                let ITEM_URL = '/'
                                ITEM_URL += (item?.username) ? item?.username : item?.gid

                                return (
                                    <div key={index}>
                                        <Link to={ITEM_URL}>
                                            <div className={`w-full  `}>
                                                <div className={`relative bg-gray-500 rounded-3xl overflow-hidden h-[150px] w-full border`}>
                                                    <div className={`absolute top-4 left-4 rounded-full bg-white max-w-[140px] px-3 text-sm py-1.5 shadow-md capitalize line-clamp-1`}>
                                                        {convertDashToSpace(item?.category)}
                                                    </div>

                                                    {
                                                        item?.profile_image_url_ext ?
                                                            <img
                                                                src={imgEndPoint}
                                                                alt=""
                                                                className={`object-cover h-full w-full`}
                                                            /> :
                                                            <AlternateImage title={item.title} />
                                                    }




                                                </div>

                                                <div className={`text-[13px] mt-2 line-clamp-1`}>
                                                    {item?.title}
                                                </div>

                                                <div className={`text-sm text-gray-500 flex place-items-center gap-2`}>
                                                    <span>
                                                        Starting {item?.currency}{formatNumber(item?.minimum_amount)}
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
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={`mt-6`}>
                        <Pagination
                            pagination={pagination}
                        />
                    </div>





                </div>
            </div>
        </div>
    )
}

export default Latest
