import styles from './Heading.module.css'

type HeadingProps = {
    children: string;
}

export function Heading({children}: HeadingProps) {

    return <h1 className={styles.heading}>{children}</h1>
}