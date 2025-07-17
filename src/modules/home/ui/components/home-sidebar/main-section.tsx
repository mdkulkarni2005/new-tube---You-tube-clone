"use client"

import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react"

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon
    },
    {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        auth: true
    },
    {
        title: "Triending",
        url: "/feed/trending",
        icon: FlameIcon
    },
]