"use client";
// 1. React
import React from 'react';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';


// 3. Third-party libraries
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
  UserButton
} from '@clerk/nextjs';

import { Button } from './ui/UI/button';
import { Authenticated, Unauthenticated } from 'convex/react';


const Header = () => {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg- background/80 backdrop-blur-xl z-20 border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LOGO */}
                    <Link href={"/"} className="flex items-center">
                        <Image src="/MeetMates2.PNG" alt="MeetMates logo" width={150} height={44} className="h-11 w-auto" priority />
                        {/* Pro Badge */}
                    </Link>


                    {/* Search & Location - Desktop only */}

                    {/* Right Side Actions */}
                    <div className="flex items-center">
                        <Authenticated>
                            {/* Create Event */}
                            <UserButton />
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton mode = "modal">
                                <Button size="sm">Sign In</Button>
                            </SignInButton >
                        </Unauthenticated>
                    </div>
                </div>

                {/* Mobile Search & Location - Below Header*/}


                {/* Loader */}
            </nav>

            {/* Models */}
        </>
    );
}

export default Header;