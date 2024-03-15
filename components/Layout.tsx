'use client'
import '../styles/globals.scss'
import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import Head from "next/head";
import CustomStylesContext from '../components/CustomStyles';
import Navigation from '../components/Navigation';
import About from '../components/About';
import {useFetchAbout} from '../utils/useSanityData';
import Loading from '../components/Loading';

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title = 'Bronislav Musil',
        loading = false
    }) => {

    const {data: about} = useFetchAbout()

    const [showAboutContainer, setShowAboutContainer] = useState(false)

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                  name="keywords"
                  content="Bronislav Musil, Bronislav, Musil, Graphic, Grafický, Design, Graphic Design, Grafický Design, Programování, Programming, Creative, Designer, Graphic Designer, Brno, Grafický Designér, Programátor, Programmer, UMPRUM, Zkrat Kolektiv, Zkrat, Zkrat Col., Zkrat Collective, Zkrat.PDF, Zkrat PDF, Portfolio"
                />
                <meta
                  name="description"
                  content="Bronislav Musil's Portfolio. Graphic Designer and Programmer based in Brno, Czech Republic"
                />
                <link rel="stylesheet" href="https://use.typekit.net/pjp5dtl.css" />
            </Head>
            <CustomStylesContext >
                <main>
                    {loading || about === null?
                        <Loading />
                        :
                        <>
                            <Navigation handleShowAbout={() => setShowAboutContainer(e => !e)} showAbout={showAboutContainer} />
                            <About data={about} showAboutContainer={showAboutContainer} />
                            {children}
                        </>
                    }
                </main>
            </CustomStylesContext>
        </>
    );
}

export default Layout
