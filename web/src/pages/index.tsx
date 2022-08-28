import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.scss'


const Home: NextPage = () => {
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
                        <span>for $9.90 month</span>
                    </p>
                </section>

                <img src="/images/avatar.svg" alt="Girl coding" />
            </main>
        </>
    )
}

export default Home
