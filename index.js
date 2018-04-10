require('dotenv').config()

setInterval(() => {
  console.log(process.env)
}, 1000)
