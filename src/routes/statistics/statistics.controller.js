const Service = require('../../models/historyService.model')
const Bar = require('../../models/historyBar.model')
const httpCodes = require('../../utils/http-codes')

const getTotalities = async (req, res) => {

  try {
    const date = req.body.date

    const totalServicesValue = await Service.aggregate([
      {
        '$match': {
          'date': {
            '$regex': date
          }
        }
      }, {
        '$group': {
          '_id': 'total',
          'total': {
            '$sum': '$price'
          }
        }
      }
    ])

    const totalBarValue = await Bar.aggregate([
      {
        '$match': {
          'date': {
            '$regex': date
          }
        }
      }, {
        '$group': {
          '_id': 'total',
          'total': {
            '$sum': '$totalValue'
          }
        }
      }
    ])

    res.status(httpCodes.OK).json({
      totalServicesValue: totalServicesValue.length ? totalServicesValue[0].total : 0,
      totalBarValue: totalBarValue.length ? totalBarValue[0].total : 0,
      message: 'todo melo papi'
    })
  } catch (error) {
    res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
  }
}

const servicesProvidedByRooms = async (req, res) => {
  const query = [
    {
      '$match': {
        'date': {
          '$regex': req.body.date
        }
      }
    }, {
      '$group': {
        '_id': '$room',
        'cant_services_provided': {
          '$sum': 1
        },
        'total': {
          '$sum': '$price'
        }
      }
    }
  ]

  try {
    const result = await Service.aggregate(query).sort('-cant_services_provided')

    res.status(httpCodes.OK).json({ result, messae: 'todomelo papi' })
  } catch (error) {
    res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
  }


}


module.exports = {
  getTotalities,
  servicesProvidedByRooms
}