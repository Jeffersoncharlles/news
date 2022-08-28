import styles from './styles.module.scss'

export const Header = () => {

    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <img src="/images/logo.svg" alt="news" />
                <nav>
                    <a href="" className={styles.active}>Home</a>
                    <a href="">Posts</a>
                </nav>
            </div>
        </header>
    );
}
