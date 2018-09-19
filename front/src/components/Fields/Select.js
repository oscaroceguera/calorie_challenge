import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

const SimpleSelect = ({ classes, name, label, value, data, onChange }) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={`${name}-simple`}>{label}</InputLabel>
      <Select
        value={value}
        name={name}
        onChange={onChange}
        inputProps={{
          name: name,
          id: `${name}-simple`
        }}
      >
        <MenuItem value=''><em>None</em></MenuItem>
        {data.map((item) =>
          <MenuItem key={item.uuid} value={item.uuid}>
            {item.value}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(SimpleSelect)
