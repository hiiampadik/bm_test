import Projects from '../components/Projects';
import styles from './page.module.scss';
import Layout from '../components/Layout';
import Filter from '../components/Filter';
import { useFetchProjects} from '../utils/useSanityData';
export default function Home() {
    const {data: projects} = useFetchProjects()

    return (
        <Layout loading={projects === null}>
            {projects &&
                <div className={styles.rightContainer}>
                    <Filter projects={projects}/>
                    <Projects projects={projects} />
                </div>
            }
        </Layout>
    );
}