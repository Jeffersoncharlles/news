import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { getPrismicClient } from '../../../lib/prismic';
import { formattedDatePtBRToLocale } from '../../../utils/formatted';
import styles from './styles.module.scss'

interface Props {
    post: {
        slug: string
        title: string
        content: string
        updatedAt: string
    } | undefined
}

const Preview = ({ post }: Props) => {
    const { data: session } = useSession()
    const { push } = useRouter()

    useEffect(() => {

        if (session?.activeSubscription) {
            push(`/posts/${post.slug}`)
        }

    }, [session])

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
                        className={`${styles.post_content} ${styles.preview}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a >Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>

        </>
    );
}


export default Preview;

export const getStaticPaths: GetStaticPaths = () => {
    //retorna no paths quais os previews quero gerar na build
    return {
        paths: [],
        fallback: 'blocking'
    }

}


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

    const { slug } = context.params
    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug))
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 5)),//splice vai pegar do 0 ate o 3 items do conteúdo
        updatedAt: formattedDatePtBRToLocale(response.last_publication_date)
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 30 //30 minutos
    }

}
