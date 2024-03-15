// @ts-nocheck
// todo

import { PortableText } from '@portabletext/react'

import Figure from './Figure'
import styles from './Blocks.module.scss'

import { useRouter } from "next/router";
import {FunctionComponent} from 'react';

const components = {
  types: {
    image: ({ value }) => {
      return (
        <figure >
          <Figure image={value.asset} alt={value.caption} width={'100%'} height={'100%'}/>
          {value.caption != null ?
                    <figcaption>{value.caption}</figcaption>
                    : ""
          }
        </figure>
      )
    },
  },
  block: {
    small: ({children}) => <div className={styles.small}>{children}</div>,
  },
}

interface BlockContentProps {
  readonly className?: string;
  readonly blocks?: any
  readonly noLanguage?: boolean;
}

const BlockContent: FunctionComponent<BlockContentProps> = (
    { blocks,
      className,
      noLanguage = false
    }) => {

  const router = useRouter();

  const getValue = () => {
    if (noLanguage){
      return blocks;
    } else if (router.locale === "cs" && blocks?.cs != null){
      return blocks.cs;
    } else if (blocks?.en != null){
      return blocks.en;
    } else {
      return ""
    }
  }
  
  return (
    <div>
      <PortableText value={getValue()} components={components}
      />
    </div>
  )
}

export default BlockContent;