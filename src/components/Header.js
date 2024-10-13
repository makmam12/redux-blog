import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className=''>
            <h1>
                Redux Blog
            </h1>
            <div className='header-nav'>
                <Link to='/New' >
                <button className='button'>
                    New Post
                </button>
                </Link>
            </div>

        </header>
    )
}

export default Header