import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Chip } from '@material-ui/core'
import { UTCDate } from '../../helpers/getUTCDate'

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
  title: {
    fontSize: '1.3em',
    color: 'white',
    textAlign: 'center',
    '@media (max-width: 1024px)': {
      fontSize: '1em'
    }
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
    textAlign: 'center'
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

const MEAL_STYLE = {
  'Desayuno': {
    color: 'secondary',
    className: 'chipRoot'
  },
  'Colación': {
    color: 'primary',
    className: 'chipRoot'
  },
  'Comida': {
    color: 'default',
    className: 'chipRoot'
  },
  'Cena': {
    color: 'default',
    className: 'dinner'
  }
}

const MealType = ({ classes, label }) => (
  <Chip
    label={label}
    color={MEAL_STYLE[label].color}
    className={classes[MEAL_STYLE[label].className]}
  />
)

const Card = (props) => {
  const { classes, data, onClick } = props
  const totalKcal = data.foods.reduce((sum, item) => sum + item.kcal, 0)

  return (
    <Paper className={classes.root} onClick={onClick(data.uuid)}>
      <div className={classes.header}>{UTCDate(data.date, 'd MMM YYYY')}</div>
      <h1 className={classes.title}>{data.meal}</h1>
      <div className={classes.total}>
        <h1 className={classes.totalNumber}>{totalKcal}</h1>
        <h1 className={classes.totalSubtitle}>Kcal</h1>
      </div>
      <div className={classes.chipGroup}>
        <MealType label={data.mealType.value} classes={classes} />
      </div>
    </Paper>
  )
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default withStyles(InlStyles)(Card)
