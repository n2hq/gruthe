import React, { useEffect, useState } from 'react'
import CardTitle from '../../../assets/CardTitle'
import { Link } from '@remix-run/react'
import { PortfolioSearchBox } from './PortfolioSearchBox'
import { CgChevronDoubleRight } from 'react-icons/cg'
import { BiMenu } from 'react-icons/bi'
import { FcMenu } from 'react-icons/fc'
import { GrLaunch } from 'react-icons/gr'

interface CardHeaderProps {
    baseUrl: string
    noOfPages: number
    query: string
}
const CardHeaderWithSearch = ({ baseUrl, noOfPages, query }: any) => {
    const [pages, setPages] = useState(0)

    useEffect(() => {
        if (noOfPages) {
            const pages = Number(noOfPages)
            if (pages > 0) {
                setPages(pages)
            }
        }
    }, [])
    return (
        <div>
            <div className={`bg-gray-100 w-full  
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-3 gap-[5px]
                            leading-[1.5em] px-[10px]`}>
                <div className={`h-full min-w-[100px] max-w-[300px]`}>

                    <div className="flex items-center   ">

                        <span className="line-clamp-1 overflow-hidden text-blue-800 text-[16px] font-sans tracking-tight font-bold ">
                            Businesses: ({pages})
                        </span>
                    </div>
                </div>
                <div className={`grow flex place-content-end`}>
                    <PortfolioSearchBox query={query} />
                </div>

            </div>
        </div>
    )
}

export default CardHeaderWithSearch
