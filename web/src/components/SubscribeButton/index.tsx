import { signIn, useSession } from 'next-auth/react'
import { api } from '../../lib/axios'
import { getStripeJs } from '../../lib/stripe-js'
import styles from './styles.module.scss'

interface Props {
    priceId: string
}

export const SubscribeButton = ({ priceId }: Props) => {
    const { data: session } = useSession()

    const handleSubscribe = async () => {

        if (!session) {
            signIn('google')
            return;
        }

        //create checkout session
        try {
            const { data } = await api.post('/subscribe')
            if (data.sessionId) {
                const stripe = await getStripeJs()
                stripe?.redirectToCheckout({ sessionId: data.sessionId })
            }
        } catch (error) {
            alert("Error subscribe")
        }

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
