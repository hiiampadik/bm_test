'use client'
import styles from './GalleryBlock.module.scss'
import React, {useState, FunctionComponent, useContext, useEffect} from "react";

import BlockContent from '../../utils/sanity/BlockContent';
import {CursorContext, CursorSVG} from '../../components/CustomStyles';
import {usePathname} from 'next/navigation';

interface GalleryProps {
  readonly images: any[]
}

const Gallery: FunctionComponent<GalleryProps> = ({images}) => {

    const [index, setIndex] = useState<number>(0)
    const pathname = usePathname()

    useEffect(() => {
        setIndex(0)
    }, [pathname]);

    const {setCursorType} = useContext(CursorContext);

    return (
        <div className={styles.galleryContainer}>
            <button className={styles.prevButton}
                    onMouseEnter={() => setCursorType(CursorSVG.PREV)}
                    onMouseLeave={() => setCursorType(undefined)}
                    onClick={() => setIndex(value => (value - 1 + images.length) % images.length)}
            />
            <button className={styles.nextButton}
                    onMouseEnter={() => setCursorType(CursorSVG.NEXT)}
                    onMouseLeave={() => setCursorType(undefined)}
                    onClick={() => setIndex(value => (value += 1) % images.length)}
            />
            <div className={styles.pagination}>{index + 1}{'/'}{images.length}</div>
            <BlockContent blocks={images[index]} key={index} noLanguage />
        </div>
)}

export default Gallery

