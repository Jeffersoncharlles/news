import styles from './styles.module.scss'

interface Props {
    priceId: string
}

export const SubscribeButton = ({ priceId }: Props) => {

    return (
        <button
            type='button'
            className={styles.container}
        >
            Subscribe now
        </button>
    );
}
