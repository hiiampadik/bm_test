'use client'
import useMousePosition from '../../components/CustomStyles/useMousePosition';
import Image from 'next/image'
import styles from './index.module.scss'

import React, {createContext, FunctionComponent, PropsWithChildren, useMemo, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';

export enum CursorSVGurl {
    EYES = '/cursorEyes.svg',
    POINTER = '/cursorPointer.svg',
    GRAB = '/cursorGrab.svg',
    NEXT = '/cursorNext.svg',
    PREV = '/cursorPrev.svg',
}

export enum CursorSVG {
    EYES = 'EYES',
    POINTER = 'POINTER',
    GRAB = 'GRAB',
    NEXT = 'NEXT',
    PREV = 'PREV'
}

export enum CursorText {
    WORKINGHOURS = 'WORKINGHOURS',
    TEXT = 'TEXT',
}


export const CursorContext = createContext<{
    showCustomCursor: boolean,
    setShowCustomCursor: any,
    cursorSize: number,
    setCursorSize: any,
    cursorType: undefined | CursorSVG | CursorText,
    setCursorType: any,
}>({
    showCustomCursor: false,
    setShowCustomCursor: () => {},
    cursorSize: 50,
    setCursorSize: () => {},
    cursorType: undefined,
    setCursorType: () => {},
});

const CustomStylesContext: FunctionComponent<PropsWithChildren> = ({children}) => {
    const {x, y} = useMousePosition()

    const [showCustomCursor, setShowCustomCursor] = useLocalStorage<boolean>('showCustomCursor', true)

    const [cursorSize, setCursorSize] = useLocalStorage<number>('cursorSize', 100)
    const [cursorType, setCursorType] = useState<CursorSVG | CursorText | undefined>(undefined)

    const value = {
        showCustomCursor,
        setShowCustomCursor,
        cursorSize,
        setCursorSize,
        cursorType,
        setCursorType
    };


    const getText = () => {
        // switch (cursorType){
        //     case cursorText.BACK:
        //         t['back']
        //     case cursorText.FORW:
        //         t['forw']
        // }
        // if (cursorType){
        //  return t[cursorType]
        // }
    }


    return (
        <CursorContext.Provider value={value} >


            {showCustomCursor && cursorType !== undefined && x && y &&
                <>
                    {Object.keys(CursorSVG).includes(cursorType) ?
                        <div className={styles.cursorContainer}
                             style={{transform: `translate(${x - (cursorSize) / 2}px, ${y - (cursorSize) / 2}px)`}}
                        >
                            {/*<Image*/}
                            {/*    src={CursorSVGurl[cursorType as string] as string}*/}
                            {/*    alt={'cursor image'}*/}
                            {/*    width={cursorSize}*/}
                            {/*    height={cursorSize}*/}
                            {/*/>*/}
                        </div>
                    :
                        <div className={styles.cursorTextContainer}
                             style={{transform: `translate(${x}px, ${y}px)`}}
                        >
                            <div className={styles.cursorTextInner}
                                 style={{transform: `scale(${cursorSize / 100}) translate(-50%, -50%)`}}
                            >
                                {/*{getText()}*/}
                            </div>
                        </div>
                    }
                </>
            }
            {children}
        </CursorContext.Provider>
    );
};

export default CustomStylesContext