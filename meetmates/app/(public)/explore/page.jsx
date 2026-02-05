"use client";

import React from 'react'
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const ExplorePage= () => {
    const data = useQuery(api.events.getFeaturedEvents, );

    console.log(data);

    return <div>ExplorePage</div>
};

export default ExplorePage;