import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import styles from './styles.css'

const NavMenu = ({ username, logout }) => (
  <div className={styles.container}>
    <div><h3 className={styles.title}>{username}</h3></div>
    <div className={styles.btnCont}>
      <Button
        style={{background: '#ff3d00', color: 'white'}}
        onClick={logout}
        variant='contained'
      >
        logout
      </Button>
    </div>
  </div>
)

NavMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

export default NavMenu
