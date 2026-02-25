import { Link } from '@remix-run/react'
import React from 'react'

const HeaderLogo = () => {
    return (
        <div className={`text-3xl font-black font-poppins tracking-tight text-[rgb(131,39,39)]`}>
            <Link to={`/`} className={`flex -gap-2`}>
                <span>
                    Gru
                </span>
                <span className={`text-blue-600`}>
                    the
                </span>
                <span className={`italic relative -left-[2px]`}>
                    !
                </span>
            </Link>
        </div>
    )
}

export default HeaderLogo
