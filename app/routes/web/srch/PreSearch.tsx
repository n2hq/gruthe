import { Link } from "@remix-run/react"
import { useRef } from "react"
import { BiChevronLeft, BiChevronRight, BiSolidStar } from "react-icons/bi"
import { BsChevronDoubleRight } from "react-icons/bs"
import { CgChevronRight } from "react-icons/cg"
import AlternateImage from "~/components/content/AlternateImage"
import { config, convertDashToSpace, formatNumber } from "~/lib/lib"
import { ListingType } from "~/lib/types"

export interface PreSearchProps {
    items: ListingType[]
}
export const PreSearch = ({ items }: PreSearchProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const scrollAmount = 200

    const prev = () => {
        scrollRef.current?.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        })
    }

    const next = () => {
        scrollRef.current?.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        })
    }
    return (
        <div className={`w-full px-[15px]`}>
            <div className={`flex place-items-center place-content-between max-w-[1200px] mx-auto w-full mb-6 px-2`}>
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
            <div className={` mb-12 relative max-w-[1200px] mx-auto w-full`}>


                <div className={`flex max-w-[1200px] mx-auto w-full gap-4 overflow-x-hidden rounded-3xl`}
                    ref={scrollRef}
                >
                    {
                        items?.map((item: ListingType, index: number) => {
                            const IMG_BASE_URL = config.IMG_BASE_URL
                            const imgEndPoint = (item?.profile_image_url_ext) ? (IMG_BASE_URL + item.profile_image_url_ext) : ''

                            let ITEM_URL = '/'
                            ITEM_URL += (item?.username) ? item?.username : item?.gid

                            return (
                                <div key={index}>
                                    <Link to={ITEM_URL}>
                                        <div className={`w-full  `}>
                                            <div className={`relative bg-gray-500 rounded-3xl overflow-hidden h-[150px] w-[160px] border`}>
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


                <div className={`absolute top-[60px] left-2 h-[30px] w-[30px] border rounded-full bg-white flex place-items-center place-content-center text-4xl cursor-pointer`}
                    onMouseDown={prev}
                >
                    <BiChevronLeft />
                </div>
                <div className={`absolute top-[60px] right-2 h-[30px] w-[30px] border rounded-full bg-white flex place-items-center place-content-center text-4xl cursor-pointer`}
                    onMouseDown={next}
                >
                    <BiChevronRight />
                </div>


            </div>
        </div>
    )
}