const { Meal } = require('../models/meal')
const { FoodType } = require('../models/foodType')

exports.getByYear = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      { $match: {_creator: req.user._id} },
      {
        $group: {
          _id: { year: { $year: '$date' } },
          monthlyKcal: { $push: { month: '$month', daiyliKcal: '$foods' } }
        }
      },
      {
        $sort: {
          '_id.year': -1
        }
      }
    ])

    const _data = await Promise.all(data.map(async (item) => {
      const monthlyKcal = await Promise.all(item.monthlyKcal.map(async (mKcal) => {
        const kcals = await Promise.all(mKcal.daiyliKcal.map(async (id) => {
          const alimento = await FoodType.find({ _id: id })
          return alimento.map(i => i.kcal)
        }))
        return kcals
      }))

      const flatten = (items) => items.reduce((a, b) => a.concat(b), [])

      const flattenKcal = flatten(flatten(monthlyKcal))

      return {
        day: item._id.month,
        month: item._id.month,
        year: item._id.year,
        totalKcal: flattenKcal.reduce((total, value) => total + value, 0)
      }
    }))

    res.send(_data)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getByMonth = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      { $match: { _creator: req.user._id } },
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' } },
          monthlyKcal: { $push: { month: '$month', daiyliKcal: '$foods' } }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ])

    const _data = await Promise.all(data.map(async (item) => {
      const monthlyKcal = await Promise.all(item.monthlyKcal.map(async (mKcal) => {
        const kcals = await Promise.all(mKcal.daiyliKcal.map(async (id) => {
          const alimento = await FoodType.find({ _id: id })
          return alimento.map(i => i.kcal)
        }))
        return kcals
      }))

      const flatten = (items) => items.reduce((a, b) => a.concat(b), [])

      const flattenKcal = flatten(flatten(monthlyKcal))

      return {
        month: item._id.month,
        year: item._id.year,
        totalKcal: flattenKcal.reduce((total, value) => total + value, 0)
      }
    }))

    res.send(_data)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getByDay = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      { $match: { _creator: req.user._id } },
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' }, day: { $dayOfMonth: '$date' } },
          monthlyKcal: { $push: { month: '$month', daiyliKcal: '$foods' } }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
          '_id.day': -1
        }
      }
    ])

    const _data = await Promise.all(data.map(async (item) => {
      const monthlyKcal = await Promise.all(item.monthlyKcal.map(async (mKcal) => {
        const kcals = await Promise.all(mKcal.daiyliKcal.map(async (id) => {
          const alimento = await FoodType.find({ _id: id })
          return alimento.map(i => i.kcal)
        }))
        return kcals
      }))

      const flatten = (items) => items.reduce((a, b) => a.concat(b), [])

      const flattenKcal = flatten(flatten(monthlyKcal))

      return {
        day: item._id.day,
        month: item._id.month,
        year: item._id.year,
        totalKcal: flattenKcal.reduce((total, value) => total + value, 0)
      }
    }))

    res.send(_data)
  } catch (e) {
    res.status(500).send(e)
  }
}
