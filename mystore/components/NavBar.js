import React from 'react'
import Link from 'next/link'

const NavBar = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    {/* <img src='/store-icon.svg' classNameName='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'></img> */}
                    <span className="ml-3 text-xl">My Store</span>
                </a>
                <div className="pt-2 relative mx-auto text-gray-600 justify-center">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" />
                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                        <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                            version="1.1" id="Capa_1" x="0px" y="0px"
                            viewBox="0 0 56.966 56.966"
                            width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-wrap items-center text-base justify-center">

                    <Link href="/profile">
                        <a className="mr-5 text-center">
                            <img
                                src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v3.png"
                                className="rounded-full w-10 mx-auto"
                                alt="Avatar"
                            />
                            <p className="text-gray-500 text-xs">Profile</p>
                        </a>
                    </Link>

                    <Link href="/wishlist">
                        <a className="mr-5 text-center">
                            <img
                                src="https://img.icons8.com/ios/50/000000/like--v1.png"
                                className="rounded-full w-10 mx-auto"
                                alt="Avatar"
                            />
                            <p className="text-gray-500 text-xs">Wishlist</p>
                        </a>
                    </Link>
                    <Link href="/cart">
                        <a className="mr-5 text-center">
                            <img
                                src="https://img.icons8.com/pastel-glyph/64/000000/paper-bag--v2.png"
                                className="rounded-full w-10 mx-auto"
                                alt="Avatar"
                            />
                            <p className="text-gray-500 text-xs">Cart</p>
                        </a>
                    </Link>
                </nav>
                {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button> */}
            </div>
        </header>
    )
}

export default NavBar