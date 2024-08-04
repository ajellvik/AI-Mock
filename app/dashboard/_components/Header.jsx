"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='grid grid-cols-3 p-5 bg-secondary shadow-sm'>
            <div className='flex justify-start items-center'>
                <Image src={'/logo.svg'} width={200} height={175} alt='logo' />
            </div>
            <div className='flex justify-center items-center'>
                <ul className='hidden md:flex gap-6'>
                <Link href={"/"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/app' && 'text-primary font-bold'}`}>
                            Home
                        </li>
                    </Link>
                    <Link href={"/dashboard"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>
                            Dashboard
                        </li>
                    </Link>
                    <Link href={"/dashboard/upgrade"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>
                            Upgrade
                        </li>
                    </Link>
                    <Link href={"/dashboard/faq"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/faq' && 'text-primary font-bold'}`}>
                            FAQ
                        </li>
                    </Link>
                    <Link href={"/dashboard/testimonials"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/testimonials' && 'text-primary font-bold'}`}>
                            Testimonials
                        </li>
                    </Link>
                    <Link href={"/dashboard/stats"}>
                        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/stats' && 'text-primary font-bold'}`}>
                            Stats
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='flex justify-end items-center'>
                <UserButton />
            </div>
        </div>
    )
}

export default Header
