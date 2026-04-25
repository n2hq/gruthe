import React from 'react'
import ProfileLayout from '../../assets/ProfileLayout'

interface PlacementOption {
    value: string;
    label: string;
    price: number;
    description: string;
}

const placementOptions: PlacementOption[] = [
    { value: "HOMEPAGE", label: "Homepage Banner", price: 199, description: "Top visibility on the main page" },
    { value: "CATEGORY", label: "Category Page", price: 99, description: "Target specific business categories" },
    { value: "SIDEBAR", label: "Sidebar Banner", price: 49, description: "Displayed across all pages" },
    { value: "IN_LISTING", label: "In-Listing Ad", price: 79, description: "Between directory search results" },
];


const durations = [
    { days: 7, label: "1 Week", multiplier: 1 },
    { days: 30, label: "1 Month", multiplier: 4 },
    { days: 90, label: "3 Months", multiplier: 10, discount: true },
];

const index = () => {
    return (
        <ProfileLayout>

        </ProfileLayout>
    )
}

export default index
