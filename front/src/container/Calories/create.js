import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Avatar, Button, TextField } from '@material-ui/core'
import keycode from 'keycode'

import { Autocomplete, FoodCard, SimpleSelect } from '../../components'
import styles from './styles.css'

import {FOODS} from './kcalCatalog'
const MEALS = [
  { uuid: '2e1bf63e-1a29-4085-b9b1-b58ac6a8002b', value: 'Desayuno'},
  { uuid: '0f0c64d6-1466-4269-bc48-b9f60b627774' , value: 'Colación'},
  { uuid: '9907ffd2-0c3e-4540-b9e5-2530262eb81e', value: 'Comida'},
  { uuid: '56689b29-b266-4931-ad3c-1ca323831d8a', value: 'Cena'},
]

const InlStyle = theme => ({
  root: {
    padding: '1em',
    width: '50%',
    margin: '0 auto'
  },
  avatar: {
    padding: '.5em',
    width: '100px',
    height: '100px',
    background: '#651fff'
  }
})

const getFoodUuid = (data, item) => data.find(i => i.label === item).uuid

class CreateCalories extends React.Component {
  state = {
    meal: '',
    inputValue: '',
    selectedItem: [],
    selectedFood: [],
    mealType: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      })
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleChange = item => {
    let { selectedItem, selectedFood } = this.state

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item]
      selectedFood = [...selectedFood, getFoodUuid(FOODS, item)]
    }
  
    this.setState({
      inputValue: '',
      selectedItem,
      selectedFood
    })
  }

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem]
      const selectedFood = [...state.selectedFood]

      selectedItem.splice(selectedItem.indexOf(item), 1)
      selectedFood.splice(selectedFood.indexOf(getFoodUuid(FOODS, item)), 1)

      return {
        selectedItem,
        selectedFood
      }
    })
  }

  onSave = e => {
    const {meal, selectedFood, mealType} = this.state
  }

  render () {
    const {classes} = this.props
    const { meal, mealType, selectedItem, inputValue, selectedFood} = this.state
    const disabled = !!meal && !!mealType && selectedItem.length > 0

    return (
      <div>
        <h1 className={styles.title}>Agregar Calorías</h1>
        <Paper elevation={1} className={classes.root}>
          <TextField
            error={!this.state.meal}
            name='meal'
            label='Comida'
            value={this.state.meal}
            onChange={this.onChange}
            margin='normal'
            style={{width: '50%'}}
          />
          <SimpleSelect
            data={MEALS}
            label={'Tipo'}
            name='mealType'
            value={this.state.mealType}
            onChange={this.onChange}
          />
          <Autocomplete
            label='Alimentos'
            placeholder='Seleccione multiples alimentos'
            data={FOODS}
            inputValue={inputValue}
            selectedItem={selectedItem}
            handleKeyDown={this.handleKeyDown}
            handleInputChange={this.handleInputChange}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
          />
          <div className={styles.btnContainer}>
            <Button 
              disabled={!disabled}
              name='mealType'
              variant='contained'
              color='secondary'
              onClick={this.onSave}
            >
              Guardar
            </Button>
          </div>
          <div className={styles.section}>
            <div className={styles.avatarContainer}>
              <Avatar className={classes.avatar}>1264 kcal</Avatar>
            </div>
            <div>
              <FoodCard type='desayuno' />
              <FoodCard type='colacion' />
              <FoodCard type='comida' />
              <FoodCard type='cena' />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(InlStyle)(CreateCalories)
