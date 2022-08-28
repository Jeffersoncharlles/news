import type { GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../lib/stripe'
import { formattedPriceUSD } from '../utils/formatted'
import styles from './index.module.scss'

interface Props {
    product: {
        priceId: string,
        amount: number
    }
}


export default function Home({ product }: Props) {




    return (
        <>
            <Head>
                <title>Inicio | News</title>
            </Head>
            <main className={styles.container}>
                <section className={styles.container_content}>
                    <span>👏 Hey, welcome</span>
                    <h1>News about <br />the <span>React</span> world</h1>
                    <p>Get access to all the publications <br />
                        <span>for {product.amount} month</span>
                    </p>
                    <SubscribeButton priceId={product.priceId} />
                </section>

                <img src="/images/avatar.svg" alt="Girl coding" />
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

    const price = await stripe.prices.retrieve('price_1Lbb82AoB0jQJ21ZjnnIQEAD', {
        expand: ['product']//ter todas infos do produto
    })

    const product = {
        priceId: price.id,
        amount: formattedPriceUSD(price.unit_amount) //ele vem em centavos
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24 //1minuto ,1hora, 24 horas // 24horas total
    }
}


