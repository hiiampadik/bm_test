'use client'
import React, {FunctionComponent, useContext, useState} from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import {CursorContext, CursorSVG} from '../CustomStyles';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const Fun: FunctionComponent = () => {

    const {cursorSize,
        setCursorSize,
        setCursorType,
        showCustomCursor,
        setShowCustomCursor,
    } = useContext(CursorContext);

    const handleCursorSize = () => {
        const newSize = (cursorSize + 400) % 1200
        setCursorSize(newSize)
    }

    return (
        <div className={styles.funContainer}>
            <div className={styles.funHeader}>
                <div className={styles.funLogo} />
                <p>Fun Zone</p>
            </div>

            <div className={styles.funHeader}>
                <p>Cursor</p>
                <label className={styles.toggleContainer}
                       onMouseEnter={() => setCursorType(CursorSVG.EYES)}
                       onMouseLeave={() => setCursorType(undefined)}
                >
                    <input
                        type="checkbox"
                        checked={showCustomCursor}
                        onChange={(event) => setShowCustomCursor(event.currentTarget.checked)} />
                    <span />
                </label>
            </div>

            {showCustomCursor &&
                <button className={styles.funCursor}
                     onClick={handleCursorSize}
                     onMouseEnter={() => setCursorType(CursorSVG.EYES)}
                     onMouseLeave={() => setCursorType(undefined)}
                >
                    {cursorSize === 100 &&
                        "Go BIG!"
                    }

                    {cursorSize === 500 &&
                        "Go BIGGER!"
                    }

                    {cursorSize === 900 &&
                        "Go HOME"
                    }
                </button>
            }


            <div className={styles.sliderContainer} onMouseEnter={() => setCursorType(CursorSVG.GRAB)}
                 onMouseLeave={() => setCursorType(undefined)} >
                <Slider className={styles.slider} vertical={true}/>
            </div>

            <div className={styles.noFunContainer}>
                <Link target={'_blank'}
                      href="https://www.wikihow.com/Accept-That-You-Have-No-Sense-of-Humor"
                      className={styles.noFunLink}
                      onMouseEnter={() => setCursorType(CursorSVG.EYES)}
                      onMouseLeave={() => setCursorType(undefined)}
                >
                    <div className={styles.noFunLogo} />
                    <p>{`I don't like fun`}</p>
                </Link>
            </div>

        </div>
    );
};

export default Fun;
