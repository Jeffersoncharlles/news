import { GoogleLogo, X } from 'phosphor-react';
import styles from './styles.module.scss'

export const SignInButton = () => {

    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button type='button' className={styles.container}>
            <GoogleLogo size={20} weight="bold" color='#04D361' />
            Jefferson Charlles
            <X size={20} weight="bold" color='#737380' />
        </button>
    ) : (
        <button type='button' className={styles.container}>
            <GoogleLogo size={20} weight="bold" color='#eba417' />
            Sign in with Google
        </button>
    );
}
