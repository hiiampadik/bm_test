'use client'
import { useEffect, useState } from "react";

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<{ x: null | number, y: null | number}>({ x: null, y: null });

    useEffect(() => {
        const mouseMoveHandler = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);

    return mousePosition;
}