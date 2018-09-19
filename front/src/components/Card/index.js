import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Chip } from '@material-ui/core'

const InlStyles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 2,
    background: '#2196f3',
    width: '250px',
    marginTop: '1em',
    marginRight: '1em',
    transition: '.3s',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8'
    },
    '@media (max-width: 1024px)': {
      width: '120px'
    },
    '@media (max-width: 376px)': {
      width: '320px',
      marginRight: '0'
    }
  },
  header: {
    background: '#1769aa',
    color: 'white',
    padding: '.5em',
    borderRadius: '4px 4px 0px 0px'
  },
  total: {
    textAlign: 'center',
    padding: '1.5em 0',
    width: '129px',
    borderRadius: '50%',
    margin: '.5em auto',
    background: '#1769aa',
    '@media (max-width: 1024px)': {
      background: 'initial'
    }
  },
  totalNumber: {
    color: 'white',
    margin: 0,
    fontSize: '3em'
  },
  totalSubtitle: {
    color: 'white',
    margin: 0,
    fontSize: '1em'
  },
  chipGroup: {
    padding: '.5em',
    display: 'flex',
    flexWrap: 'wrap'
  },
  chipRoot: {
    margin: '.5em .5em 0 0',
    fontSize: '12px'
  },
  dinner: {
    background: '#00e676',
    color: 'white',
    margin: '.5em .5em 0 0',
    fontSize: '12px'
  }
})

const Card = (props) => {
  const {classes} = props

  return (
    <Paper c className={classes.root}>
      <div className={classes.header}>16/09/2018</div>
      <div className={classes.total}>
        <h1 className={classes.totalNumber}>22</h1>
        <h1 className={classes.totalSubtitle}>Kcal</h1>
      </div>
      <div className={classes.chipGroup}>
        <Chip label='Desayuno' color='secondary' className={classes.chipRoot} />
        <Chip label='Colación' color='primary' className={classes.chipRoot} />
        <Chip label='Comida' className={classes.dinner} />
        <Chip label='Cena' className={classes.chipRoot} />
      </div>
    </Paper>
  )
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(InlStyles)(Card)
