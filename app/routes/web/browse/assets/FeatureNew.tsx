import { Link } from '@remix-run/react'
import React from 'react'
import Address from './Address'
import { config, formatInternationalPhone, splitPhoneString } from '~/lib/lib'

const FeatureNew = ({ feature }: any) => {

    return (
        <div className={`flex place-content-between h-auto gap-x-2 py-8`}>
            <div className={` h-auto group hover:cursor-pointer`}>
                <div className={`relative line-clamp-2 group-hover:underline font-semibold text-[14px] text-blue-900`}>
                    {feature?.title}
                </div>
                <div className={`text-gray-600 relative line-clamp-2 leading-5 mt-2 text-[12px]`}>
                    {feature?.short_description}
                </div>

                <div className={`flex place-items-center place-content-start gap-2 mt-2`}>

                    <div className={`text-[11px] font-normal 
                tracking-tight mt-1 leading-[1.4em]
                text-brown-700`}>
                        <Address listing={feature} />
                    </div>
                </div>



                <div className={`text-[11px] mt-2`}>
                    {formatInternationalPhone(splitPhoneString(feature?.phone)) || `n/a`}
                </div>
            </div>
            <div className={`min-w-[90px]`}>
                <img
                    src={`${config.IMG_BASE_STORAGE}${feature?.image_url}`}
                    alt=""
                    className={`w-full rounded-md h-[60px] object-cover`}
                />
            </div>
        </div>
    )
}

export default FeatureNew
