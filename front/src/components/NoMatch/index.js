import React from 'react'
import styles from './styles.css'

const NoMatch = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Error 404</h1>
    <h4 className={styles.message}>Woops. Looks like this page doesn't exist.</h4>
  </div>
)

export default NoMatch
