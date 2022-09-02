import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss'

export const Header = () => {
    const { asPath } = useRouter()

    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <Image
                    src="/images/logo.svg"
                    alt='news'
                    width="100"
                    height="100"
                />
                <nav>
                    <ActiveLink active={styles.active} href="/" >
                        <a className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink active={styles.active} href="/posts" >
                        <a>Posts</a>
                    </ActiveLink>

                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
