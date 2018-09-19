import React from 'react'
import { Paper } from '@material-ui/core'
import styles from './food.css'

const BG_COLOR = {
  desayuno: '#f50057',
  colacion: '#3f51b5',
  comida: '#00e676',
  cena: '#e0e0e0'
}

const FoodCard = (props) => {
  return (
    <Paper style={{ marginTop: '.5em' }}>
      <div>
        <div className={styles.header} style={{ background: `${BG_COLOR[props.type]}` }}>
          {props.type.toUpperCase()}
        </div>
        <div className={styles.content}>
          <div style={{ padding: '.5em' }}>
            <h4 style={{ margin: 0 }}>POZOLE</h4>
            <div style={{ color: '#9E9E9E' }}>
              Acelga, Arroz, Pollo, Cebolla, Platano, Tomate
              Acelga, Arroz, Pollo, Cebolla, Platano, Tomate
              Acelga, Arroz, Pollo, Cebolla, Platano, Tomate
              Acelga, Arroz, Pollo, Cebolla, Platano, Tomate
              Acelga, Arroz, Pollo, Cebolla, Platano, Tomate
            </div>
          </div>
          <h2 className={styles.kcal}>54 kcal</h2>
        </div>
      </div>
    </Paper>
  )
}

export default FoodCard
