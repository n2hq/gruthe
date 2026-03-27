import React from 'react'

export type LinkType = {
    title: string,
    link: string
}

const lnk = [
    {
        title: 'Businesses in Dubai',
        link: '/web/city/dubai'
    },
    {
        title: 'Businesses in New York',
        link: '/web/city/new-york'
    },
    {
        title: 'Businesses in Abuja',
        link: '/web/city/abuja'
    },
    {
        title: 'Businesses in Las Vegas',
        link: '/web/city/las-vegas'
    },
    {
        title: 'Businesses in London',
        link: '/web/city/london'
    },
    {
        title: 'Businesses in Tokyo',
        link: '/web/city/tokyo'
    },
    {
        title: 'Businesses in Berlin',
        link: '/web/city/berlin'
    },

]

const BusinessLinks = () => {
    return (
        <div className={`border rounded-lg px-3 pt-4 pb-6 mb-6`}>
            <div className={` text-2xl mb-2`}>
                Popular Cities
            </div>
            <div className={` space-y-1`}>
                {
                    lnk?.map((link: LinkType, index: number) => {
                        return (
                            <div key={index} className={`group`}>
                                <a href={link.link} className={`group-hover:underline`}>
                                    <div>
                                        {link.title}
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessLinks
