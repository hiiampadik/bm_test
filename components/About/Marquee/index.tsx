import React, {FunctionComponent, useContext} from 'react';
import Marquee from "react-fast-marquee";
import styles from './index.module.scss';
import Link from 'next/link';
import {CursorContext, CursorSVG, CursorText} from '../../CustomStyles';
import Image from 'next/image';


export const MarqueeContact: FunctionComponent = () => {

    return (
        <Marquee speed={30} className={styles.marqueeContactContainer} direction={'left'}>
            <MarqueeContactInner />
            <MarqueeContactInner />
        </Marquee>
    );
};

export const MarqueeContactInner: FunctionComponent = () => {

    const {setCursorType } = useContext(CursorContext);

    const copyToClipboard = async (value: string) => {
        if (navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(value);
                return;
            } catch (error) {
                // probably no permissions, fall back to code below
            }
        }
    };

    return (
            <div className={styles.marqueeContactInner}>
                <div className={styles.fillFirst} />
                <div className={styles.marqueeContactBlock}
                      // onMouseEnter={() => setCursorType(CursorText.WORKINGHOURS)}
                      onMouseLeave={() => setCursorType(undefined)}
                     onClick={() => copyToClipboard('+420 721 290 235')}
                >
                    +420 721 290 235
                </div>

                <div className={styles.marqueeContactBlock}
                      // onMouseEnter={() => setCursorType(CursorText.TEXT)}
                      onMouseLeave={() => setCursorType(undefined)}
                     onClick={() => copyToClipboard('brona.musil@gmail.com')}
                >
                    brona.musil@gmail.com
                </div>

                <Link href="https://www.instagram.com/hiiampadik/" className={styles.marqueeContactBlock}
                      // onMouseEnter={() => setCursorType(CursorSVG.POINTER)}
                      onMouseLeave={() => setCursorType(undefined)}>
                    Instagram
                </Link>

                <Link href="https://www.linkedin.com/in/bronislav-musil-2879b2150/" className={styles.marqueeContactBlock}
                      // onMouseEnter={() => setCursorType(CursorSVG.POINTER)}
                      onMouseLeave={() => setCursorType(undefined)}>
                    LinkedIn
                </Link>
                <div className={styles.fillLast} />
            </div>
    );
};


export const MarqueeName: FunctionComponent = () => {

    return (
        <div className={styles.marqueeNameContainer}>
            <Marquee speed={30} direction={'right'} className={styles.marqueeName}>
                    <Image src={`/BM.svg`} alt={'s'} width={'500'} height={'100'} objectFit={'contain'}/>
                    <Image src={`/BM.svg`} alt={'s'} width={'500'} height={'100'} objectFit={'contain'}/>
            </Marquee>
        </div>
    );
};
