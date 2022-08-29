import { signIn, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

interface Props {
    priceId: string
}

export const SubscribeButton = ({ priceId }: Props) => {
    const { data: session } = useSession()

    const handleSubscribe = () => {

        if (!session) {
            signIn('google')
            return;
        }

        //create checkout session

    }

    return (
        <button
            type='button'
            className={styles.container}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}
