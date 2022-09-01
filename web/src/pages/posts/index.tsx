import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../lib/prismic';
import { formattedDatePtBR } from '../../utils/formatted';
import styles from './styles.module.scss'

export default function Posts() {

    return (
        <>
            <Head>
                <title>Posts | News</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.container_posts}>
                    <a>
                        <time>{formattedDatePtBR(new Date())}</time>
                        <strong>Using styled components with next.js 12 and typescript in 2022</strong>
                        <p>In this article, I will show how you can use styled-components in next.js 12 along with typescript.</p>
                    </a>
                    <a>
                        <time>17/10/2022 16:38:48</time>
                        <strong>Using styled components with next.js 12 and typescript in 2022</strong>
                        <p>In this article, I will show how you can use styled-components in next.js 12 along with typescript.</p>
                    </a>
                    <a>
                        <time>17/10/2022 16:38:48</time>
                        <strong>Using styled components with next.js 12 and typescript in 2022</strong>
                        <p>In this article, I will show how you can use styled-components in next.js 12 along with typescript.</p>
                    </a>
                </div>
            </main>

        </>
    );
}



export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const prismic = getPrismicClient()

    const response = await prismic.getByType('post',
        {
            fetch: ['post.title', 'post.content'],
            pageSize: 100,
            orderings: {
                field: 'document.first_publication_date',
                direction: 'desc',
            }
        }
    )

    // console.log(JSON.stringify(response, null, 2))


    return {
        props: {

        }
    }
}
