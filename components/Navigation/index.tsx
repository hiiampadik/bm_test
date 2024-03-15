'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useParams, usePathname} from 'next/navigation';
import {classNames} from '../../utils/classNames';
import {Project as ProjectType} from '../../components/Projects/Project';
import {useFetchProject, useFetchProjects} from '../../utils/useSanityData';
import Image from 'next/image'


interface NavigationProps {
    readonly handleShowAbout: () => void;
    readonly showAbout: boolean;
}

const Navigation: FunctionComponent<NavigationProps> = ({handleShowAbout, showAbout}) => {
    const router = useRouter();
    const pathname = usePathname()
    const params = useParams()
    const {data: projects} = useFetchProjects()
    const {data: project} = useFetchProject(params?.slug as string)

    const languageButton = router.locale === "cs" ? "EN" : "CZ";

    const [nextProject, setNextProject] = useState<ProjectType | undefined>(undefined);

    useEffect(() => {
        if (projects && project) {
            for (let i = 0; i < projects.length; i++) {
                if (projects[i]._id === project._id) {
                    if (i < projects.length - 1) {
                        setNextProject(projects[i + 1]);
                    } else {
                        setNextProject(projects[0]);
                    }
                }
            }
        }
    }, [projects, project]);

    if (pathname === null) {
        return <></>
    }

    return (
       <>
           {pathname === '/' ?
               <>
                   <Link href="/" className={styles.name}
                         onClick={handleShowAbout}
                   >
                       Bronislav Musil
                   </Link>
                   {/*todo disable body scroll*/}
                   <button onClick={() => handleShowAbout()} className={styles.aboutButton}>
                       {showAbout ? 'X' : 'Info'}
                   </button>
               </>
               :
               <>
                   <Link href="/" className={styles.back} >
                       <Image src={`/back.svg`} alt={'s'} width="30" height="30" />
                   </Link>
                   {nextProject && <Link  href="/projects/[slug]"
                                          as={`/projects/${nextProject.slug.current}`}
                                          className={styles.forw} >
                       <Image src={`/back.svg`} alt={'s'} width="30" height="30" />

                   </Link> }
               </>
           }

           <Link
               href={router.asPath}
               locale={languageButton == "EN" ? "en" : "cs"}
               className={classNames([styles.languageContainer, pathname !== '/' && styles.languageContainerProject])}
           >
               {languageButton}
           </Link>
       </>
    );
};

export default Navigation;
