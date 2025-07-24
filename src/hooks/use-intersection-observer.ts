import { useEffect, useRef, useState } from "react";

export const userIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [isIntersection, setIsIntersecting] = useState(false)
    const targeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, options)

        if (targeRef.current) {
            observer.observe(targeRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return { targeRef, isIntersection }

}