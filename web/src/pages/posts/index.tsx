import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../lib/prismic';
import { formattedDatePtBRToLocale } from '../../utils/formatted';
import styles from './styles.module.scss'

interface Props {
    posts: {
        slug: string
        title: string
        excerpt: string
        updatedAt: string
    }[]
}

export default function Posts({ posts }: Props) {

    return (
        <>
            <Head>
                <title>Posts | News</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.container_posts}>

                    {posts.map((post) => (
                        <a key={post.slug}>
                            <time dateTime=''>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}

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

    const posts = response.results.map((post) => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: formattedDatePtBRToLocale(post.last_publication_date)
        }
    })


    return {
        props: {
            posts
        }
    }
}
