'use client'
import React, {FunctionComponent, useContext, useMemo} from 'react';
import styles from './index.module.scss'
import Link from 'next/link';
import Figure from '../../utils/sanity/Figure';
import {CursorContext, CursorSVG} from '../CustomStyles';
import {useRouter} from 'next/router';
import Tag from '../../components/Filter/Tag';
import {useSearchParams} from 'next/navigation';
import {Project} from './Project';

interface ProjectsProps {
    readonly projects: Project[];
}


const Projects: FunctionComponent<ProjectsProps> = ({projects}) => {
    const router = useRouter();
    const {setCursorType } = useContext(CursorContext);

    const searchParams = useSearchParams()
    const filter = searchParams?.get('filter')

    const filteredProjects = useMemo(() => {
        if (!filter){
            return projects
        }
        let filteredProjects = [];
        for (const project of projects){
            if (project.myTags.some(tag => tag.value === filter)){
                // @ts-ignore
                filteredProjects.push(project)
            }
        }
        return filteredProjects

    }, [projects, filter])


    return (
        <div className={styles.projectsContainer}>
            {filteredProjects.map((project, index) => {
                const slug = project._id ? project.slug?.current : "";
                return (
                    <div key={index} className={styles.projectsContainerItem}>
                        <Link href="/projects/[slug]" as={`/projects/${slug}`}
                             onMouseEnter={() => setCursorType(CursorSVG.EYES)}
                             onMouseLeave={() => setCursorType(undefined)}
                              className={styles.projectItem}
                        >
                           <div className={styles.projectHeader}>
                               <h1>
                                   {router.locale === "cs" ?
                                       project.title.cs
                                       : project.title.en
                                   }{" — "}{project.date}
                               </h1>
                           </div>
                           <div className={styles.projectCover}>
                               <Figure
                                   image={project.cover}
                                   alt={project.title.en.concat(" – Project Cover Image")}
                               />
                           </div>
                        </Link>
                        <div className={styles.projectTags}>
                            {project.myTags.map(tag => {
                                return (
                                    <Tag key={tag.value}
                                         value={tag.value}
                                         href={{ pathname: '/', query: { filter: tag.value } }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Projects;