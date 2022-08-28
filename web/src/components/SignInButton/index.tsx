import { GoogleLogo, X } from 'phosphor-react';
import { signIn, useSession, signOut } from 'next-auth/react'
import styles from './styles.module.scss'

export const SignInButton = () => {
    const { data: session, status } = useSession()

    return session ? (
        <button
            type='button'
            className={styles.container}
            onClick={() => signOut()}
        >
            <GoogleLogo size={20} weight="bold" color='#04D361' />
            {session.user?.name}
            <X size={20} weight="bold" color='#737380' className={styles.closed} />
        </button>
    ) : (
        <button
            type='button'
            className={styles.container}
            onClick={() => signIn('google')}
        >
            <GoogleLogo size={20} weight="bold" color='#eba417' />
            Sign in with Google
        </button>
    );
}
