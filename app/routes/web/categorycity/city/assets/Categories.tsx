import React from 'react'

export type LinkType = {
    title: string,
    link: string
}

const lnk = [
    {
        title: 'Hotels',
        link: '/web/category/hotel'
    },
    {
        title: 'Restaurants',
        link: '/web/category/restaurant'
    },
    {
        title: 'Technology Companies',
        link: '/web/category/technology-it'
    },
    {
        title: 'Real Estate',
        link: '/web/category/real-estate'
    },
    {
        title: 'Law firms',
        link: '/web/category/lawyers'
    },
    {
        title: 'Fashion and Accessories',
        link: '/web/category/fashion-accessories'
    },
    {
        title: 'Entertainment',
        link: '/web/category/entertainment'
    },

]

const Categories = () => {
    return (
        <div className={`border rounded-lg px-3 pt-4 pb-6 mb-6`}>
            <div className={` text-2xl mb-2`}>
                Popular Categories
            </div>
            <div className={` space-y-1`}>
                {
                    lnk?.map((link: LinkType, index: number) => {
                        return (
                            <div className={`group`}>
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

export default Categories
