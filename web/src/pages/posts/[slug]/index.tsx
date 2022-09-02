import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../lib/prismic';
import { formattedDatePtBRToLocale } from '../../../utils/formatted';
import styles from './styles.module.scss'

interface Props {
    post: {
        slug: string
        title: string
        content: string
        updatedAt: string
    }
}

const posts = ({ post }: Props) => {

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.post_content}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>

        </>
    );
}


export default posts;


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getSession({ req: context.req })
    const { slug } = context.params


    console.log(session)


    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const prismic = getPrismicClient()
    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: formattedDatePtBRToLocale(response.last_publication_date)
    }


    return {
        props: {
            post
        },
        // redirect: {
        //     destination
        // }
    }
}
