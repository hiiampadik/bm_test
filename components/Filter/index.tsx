'use client'
import React, {FunctionComponent, useMemo, useState} from 'react';
import styles from './index.module.scss';
import Tag from '../../components/Filter/Tag';
import {Project} from '../Projects/Project';
import {useSearchParams} from 'next/navigation';

interface FilterProps {
    readonly projects: Project[];
}

const Filter: FunctionComponent<FilterProps> = ({projects}) => {

    const searchParams = useSearchParams()
    const filter = searchParams?.get('filter')

    const categories = useMemo(() => {
        let tags = [];
        for (let project of projects) {
            for (let myTag of project.myTags) {
                tags.push(myTag.label);
            }
        }

        const tagCount: { [name: string]: number } = {};
        tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });

        const result = Object.keys(tagCount).map((str) => ({
            value: str,
            count: tagCount[str],
        }));

        return result.filter(obj => !obj.value.startsWith('w/'));

    }, [projects])

    return (
        <div className={styles.filterContainer}>
            {categories?.map((category) => (
                <>
                    {filter === category.value ?
                            <Tag key={category.value}
                                 value={category.value}
                                 close={true}

                                 href={{ pathname: '/'}}
                            />
                        :
                            <Tag key={category.value}
                                 value={category.value}
                                 count={category.count}
                                 href={{ pathname: '/', query: { filter: category.value } }}
                            />
                    }
                </>
            ))}
        </div>
    );
};

export default Filter;


