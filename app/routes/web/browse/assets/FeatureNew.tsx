import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import Address from './Address'
import { config, formatInternationalPhone, splitPhoneString } from '~/lib/lib'

export interface FeatureNewProps {
    feature: any
    keyIndex: number
}
const FeatureNew = ({ feature, keyIndex }: FeatureNewProps) => {
    const [featureGuid, setFeatureGuid] = useState('')
    const [featureUsername, setFeatureUsername] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (feature) {
            if (feature?.username !== '' && feature?.username !== undefined) {
                setUrl(`/${feature?.username}`)
            } else {
                setUrl(`/${feature?.gid}`)
            }
        }
    }, [feature])




    return (
        <Link to={url}>
            <div className={`flex place-content-between h-auto gap-x-2 py-8 group hover:cursor-pointer`}>
                <div className={` h-auto `}>
                    <div className={`flex place-items-center gap-2`}>
                        <div className={`text-4xl font-black  w-[40px] h-[40px]  border bg-gray-700 rounded-full flex place-items-center place-content-center text-gray-50`}>
                            {Number(keyIndex) + 1}
                        </div>

                        <div className={`relative line-clamp-2 group-hover:underline font-semibold text-[14px] text-blue-900`}>
                            {feature?.title}
                        </div>
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
        </Link>
    )
}

export default FeatureNew
