require('dotenv').config()
const ccxt = require('ccxt')
const moment = require('moment')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  logging: typeof process.env.DEBUG !== 'undefined' && process.env.DEBUG == 'true',
})

const Log = sequelize.define(process.env.DB_TABLE, {
  env: {
    type: Sequelize.STRING,
  },
  exchange: {
    type: Sequelize.STRING,
  },
  result: {
    type: Sequelize.STRING,
  },
  lag: {
    type: Sequelize.INTEGER,
  },
  errorMessage: {
    type: Sequelize.TEXT,
  },
})

let start = async () => {
  console.log('Starting..')
  let exchanges = {
    BNNC: new ccxt.binance(),
    BTRX: new ccxt.bittrex(),
    KUCN: new ccxt.kucoin(),
    YOBT: new ccxt.yobit(),
    PLNX: new ccxt.poloniex(),
    BLTR: new ccxt.bleutrade(),
    LVCN: new ccxt.livecoin(),
    LQUI: new ccxt.liqui(),
    CNXC: new ccxt.coinexchange(),
    GATE: new ccxt.gateio(),
    BITF: new ccxt.bitfinex2(),
    EXMO: new ccxt.exmo(),
    CBNH: new ccxt.cobinhood(),
    CEXI: new ccxt.cex(),
    CRTP: new ccxt.cryptopia(),
    GDAX: new ccxt.gdax(),
    GMNI: new ccxt.gemini(),
    HITB: new ccxt.hitbtc2(),
    HUBI: new ccxt.huobipro(),
    BTBY: new ccxt.bitbay(),
  }

  for (let i in Object.keys(exchanges)) {
    let startedAt = moment()
    let code = Object.keys(exchanges)[i]
    let exchange = exchanges[code]
    let result = 'success'
    let errorMessage = null
    try {
      await exchange.fetchTicker('LTC/BTC')
    } catch (e) {
      result = 'error'
      errorMessage = e.message
    }
    
    await Log.create({
      env: process.env.ENV,
      exchange: code,
      lag: moment().diff(startedAt),
      result: result,
      errorMessage: errorMessage,
    })

    if (parseInt(i) + 1 === Object.keys(exchanges).length) {
      setTimeout(start, 10000)
    }
  }
}

start()
