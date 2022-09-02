import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';
import styles from './styles.module.scss'


interface Props extends LinkProps {
    children: React.ReactElement
    active: string
}

export const ActiveLink = ({ active, children, ...rest }: Props) => {
    const { asPath } = useRouter()

    const className = asPath === rest.href ? active : ''

    //to clocando e adicionando a propriedade className que ta ai em cima
    return (
        <Link  {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    );
}
