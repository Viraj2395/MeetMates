"use client";
// 1. React
import React from 'react';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Building, Plus, Ticket } from 'lucide-react';


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
import { BarLoader } from 'react-spinners';
import { useStoreUser } from '@/hooks/use-store-user';
import { useOnboarding } from '@/hooks/use-onboarding';
import { OnboardingModal  } from './onboarding-modal';


const Header = () => {

    const { isLoading } = useStoreUser();

    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } = useOnboarding();

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
                        <Button variant={"ghost"} size="sm" onClick={() => setShowUpgradeModal(true)}>
                            Pricing
                        </Button>

                        <Button variant={"ghost"} size="sm" asChild className={"mr-2"}>
                            <Link href="explore">Explore</Link>
                        </Button>

                        <Authenticated>
                            <Button size="sm" asChild className="flex gap-2 mr-4">
                                <Link href="/create-event">
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Create Event</span>
                                </Link>
                            </Button>

                            {/* Define customs setting when you click on profile */}
                            <UserButton >
                                <UserButton.MenuItems>
                                    <UserButton.Link
                                        label="My Tickets"
                                        labelIcon={<Ticket size={16} />}
                                        href="/my-tickets"
                                    />
                                    <UserButton.Link
                                        label="My Events"
                                        labelIcon={<Building size={16} />}
                                        href="/my-events"
                                    />



                                    <UserButton.Action label="manageAccount" />
                                </UserButton.MenuItems>
                            </UserButton >
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton mode="modal">
                                <Button size="sm">Sign In</Button>
                            </SignInButton >
                        </Unauthenticated>
                    </div>

                </div>

                {/* Mobile Search & Location - Below Header*/}



                {/* Loader */}
                {isLoading && (
                    <div className="absolute bottom-0 left-0 w-full">
                        <BarLoader width={"100%"} color="#a855f7" />
                    </div>
                )}

            </nav>

            {/* Modals */}
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={handleOnboardingSkip}
                onComplete={handleOnboardingComplete}
            />
        </>
    );
}

export default Header;