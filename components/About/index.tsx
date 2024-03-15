import {usePathname} from 'next/navigation';

'useClient'
import React, {FunctionComponent, useState} from 'react';
import styles from './index.module.scss';
import {MarqueeContact, MarqueeName} from './Marquee';
import {classNames} from '../../utils/classNames';
import {useRouter} from 'next/router';
import BlockContent from '../../utils/sanity/BlockContent';


interface AboutProps {
    readonly data?: any;
    readonly showAboutContainer: boolean;
}

const About: FunctionComponent<AboutProps> = ({data, showAboutContainer}) => {
    const router = useRouter();
    const pathname = usePathname()

    const [studiesCollapsed, setStudiesCollapsed] = useState(false)

    if (pathname === null || pathname !== '/') {
        return <></>
    }

    return (
        <div className={classNames([styles.aboutContainer, showAboutContainer && styles.showContainer])}>
            <div className={styles.aboutFocus}>
                <BlockContent blocks={data?.focus} />
            </div>

            <MarqueeName />
            <MarqueeContact />

            <div className={styles.aboutBottom}>
                <div className={classNames([styles.aboutStudies])}>
                    <BlockContent blocks={data?.studies} />
                </div>
            </div>


            {/*<Fun />*/}
        </div>
    );

};

export default About;
