import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Paper, Avatar, Button, TextField } from '@material-ui/core'
import keycode from 'keycode'
import format from 'date-fns/format'
import { Autocomplete, SimpleSelect, Circular } from '../../components'
import styles from './styles.css'
import { UTCDate } from '../../helpers/getUTCDate'

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
  },
  deleteBtn: {
    marginRight: '2em',
    background: '#f44336',
    color: 'white'
  }
})

const getFoodUuid = (data, item) => data.find(i => i.label === item).uuid

const initialState = {
  meal: '',
  inputValue: '',
  selectedItem: [],
  selectedFood: [],
  mealType: '',
  date: '' || format(new Date(), 'YYYY-MM-dd'),
  loading: false,
  error: null,
  foodCatalog: [],
  mealCatalog: []
}

class CreateCalories extends React.Component {
  state = initialState

  componentDidMount() {
    const uuid = this.props.match.params.uuid

    if (uuid) {
     this.getDetail(uuid)
    }

    this.load()
  }

  async load () {
    this.setState({ loading: true })

    try {
      const [foodCatalog, mealCatalog] = await Promise.all([
        axios.get('http://localhost:5000/api/catalogs/foodTypes').then(res => res.data),
        axios.get('http://localhost:5000/api/catalogs/mealTypes').then(res => res.data)
      ])

      this.setState({
        loading: false,
        foodCatalog,
        mealCatalog
      })
    } catch(e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
  }

  async getDetail (uuid) {
    this.setState({ loading: true })
    try {
      const data = await axios.get(`http://localhost:5000/api/meals/${uuid}`).then(res => res.data)
      this.setState({
        loading: false,
        meal: data.meal,
        mealType: data.mealType.uuid,
        date: UTCDate(data.date, 'YYYY-MM-dd'),
        selectedItem: data.foods.map(i => i.label),
        selectedFood: data.foods.map(i => i.uuid)
      })
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
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
      selectedFood = [...selectedFood, getFoodUuid(this.state.foodCatalog, item)]
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
      selectedFood.splice(selectedFood.indexOf(getFoodUuid(this.state.foodCatalog, item)), 1)

      return {
        selectedItem,
        selectedFood
      }
    })
  }

  onUpdate = async (e) => {
    this.setState({ loading: true })

    const { meal, selectedFood, mealType, date } = this.state
    const data = { meal, foods: selectedFood, mealType, date }
    const uuid = this.props.match.params.uuid

    try {
      const response = await axios.patch(`http://localhost:5000/api/meals/${uuid}`, data)
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
  }

  onSave = async (e) => {
    this.setState({loading: true})

    const {meal, selectedFood, mealType, date} = this.state
    const data = { meal, foods: selectedFood, mealType, date }

    try {
      const response = await axios.post('http://localhost:5000/api/meals', data)
      this.setState({loading: false})
      this.props.history.push('/')
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
  }

  onDelete = async (e) => {
    this.setState({ loading: true })
    const uuid = this.props.match.params.uuid

    try {
      const response = await axios.delete(`http://localhost:5000/api/meals/${uuid}`)
      this.setState({ loading: false })
      this.props.history.push('/')
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      })
    }
  }

  componentWillUnmount () {
    this.setState(initialState)
  }

  render () {
    const {classes} = this.props
    const {
      meal, mealType, selectedItem,
      inputValue, selectedFood, loading,
      error, date, foodCatalog, mealCatalog
    } = this.state

    const disabled = !!meal && !!mealType && selectedItem.length > 0
    const deafultDate = !!date ? date : format(new Date(), 'YYYY-MM-dd')

    if (loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '5em' }}>
          <Circular />
        </div>
      )
    }

    if (error) return <p>{error}</p>

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
            data={mealCatalog}
            label={'Tipo'}
            name='mealType'
            value={this.state.mealType}
            onChange={this.onChange}
          />
          <TextField
            id='date'
            label='Fecha'
            type='date'
            name='date'
            defaultValue={deafultDate}
            onChange={this.onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Autocomplete
            label='Alimentos'
            placeholder='Seleccione multiples alimentos'
            data={foodCatalog}
            inputValue={inputValue}
            selectedItem={selectedItem}
            handleKeyDown={this.handleKeyDown}
            handleInputChange={this.handleInputChange}
            handleChange={this.handleChange}
            handleDelete={this.handleDelete}
          />
          <div className={styles.btnContainer}>
            {this.props.match.params.uuid &&
              <Button
                className={classes.deleteBtn}
                name='mealType'
                variant='contained'
                onClick={this.onDelete}
              >
                Eliminar
              </Button>
            }
            <Button 
              disabled={!disabled}
              name='mealType'
              variant='contained'
              color='secondary'
              onClick={this.props.match.params.uuid  ? this.onUpdate : this.onSave}
            >
              {this.props.match.params.uuid ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(InlStyle)(CreateCalories)
