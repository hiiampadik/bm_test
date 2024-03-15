import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import React, {useEffect, useState} from "react";
import ReactPlayer from 'react-player'
import cs from '../../components/Languages/cs';
import en from '../../components/Languages/en';
import BlockContent from '../../utils/sanity/BlockContent';
import {useFetchProject, useFetchProjects} from '../../utils/useSanityData';
import { useParams } from 'next/navigation'
import Tag from '../../components/Filter/Tag';
import Gallery from '../../utils/sanity/Gallery';

export default function Project() {
  const params = useParams()

  const {data: projects} = useFetchProjects()
  const {data: project} = useFetchProject(params?.slug as string)

  const router = useRouter();
  const t = router.locale === "cs" ? cs : en;

  const localize = (text: {cs: string, en: string}) => {
    return router.locale === "cs" ? text.cs : text.en
  };

  const getInfo = (title: string, value: any[] | undefined) => {
    if (value) {
      return (
        <div className={styles.info}>
          <h2>{title}</h2>
          <BlockContent blocks={value} noLanguage />
        </div>
      );
    }
  };



  if (!project || !projects){
    return
  }

  return (
      <Layout title={localize(project.title)}>
        <div>
          <div className={styles.projectContent}>
            <div className={styles.projectTitleContainer}>
              <h1>{localize(project.title)}</h1>
            </div>

            <div className={styles.projectTags}>
              {project.myTags?.map((tag) => {
                return (
                    <Tag key={tag.value}
                         value={tag.value}
                         href={{ pathname: '/', query: { filter: tag.value } }}
                    />
                );
              })}
            </div>

            {(project.client || project.photographer || project.collaboration || project.web) &&
              <div className={styles.projectInfoContainer}>
                {getInfo(t.Client, project.client)}
                {getInfo(t.Photographer, project.photographer)}
                {getInfo(t.Collaboration, project.collaboration)}
                {getInfo("Web", project.web)}
              </div>
            }

            <div className={styles.projectText}>
              <BlockContent blocks={project.text} />
            </div>


            {/*todo */}
            <div className={styles.projectVideos}>
              {project.videos !== undefined && project.videos.length > 0 &&
                  <>
                    {project.videos.map((url: any) => {
                      return (
                          <ReactPlayer key={url} url={url} controls={true}/>
                      )
                    } )}
                  </>
              }
            </div>

          </div>
          <div className={styles.projectGallery}>

            {project.galleryArray ?
                <Gallery images={project.galleryArray} />
                :
                <BlockContent blocks={project.gallery} noLanguage={true} />
            }
          </div>
        </div>
      </Layout>
  )
}
