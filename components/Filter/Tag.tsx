import React, {FunctionComponent} from 'react';
import styles from './index.module.scss';
import {classNames} from '../../utils/classNames';
import Link from 'next/link';

interface TagProps {
    readonly value: string;
    readonly count?: number;
    readonly close?: boolean;
    readonly href: any
}

const Tag: FunctionComponent<TagProps> = ({value, count, close, href}) => {

    return (
            <Link href={href}
                  className={classNames([
                      styles.category,
                      count !== undefined && styles.categoryWithCount,
                      close && styles.categoryClose
                  ])}
            >
                {count &&
                    <div className={styles.count}>
                        <p>{count}</p>
                    </div>
                }
                {close &&
                    <div className={styles.close}>
                        <p>X</p>
                    </div>
                }
                <div>
                    {value}
                </div>
            </Link>
    );
};

export default Tag;


