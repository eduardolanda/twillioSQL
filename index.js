const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../DB/db')
const uuidv1 = require('uuid/v1');
import { struct } from 'superstruct'

const app = new Koa()
app.use(bodyParser())

const ValidLog = struct({
    name: 'string',
    date: 'number',
    signature: 'string'
  })

app.use(async ctx => {
  const name = await ctx.request.body.name
  const date = await ctx.request.body.date
  const Body = await ctx.request.body.Body
  const signature = uuidv1();
  const data = {
      name : name,
      date : date,
      signature : signature
  };
  const validLog = ValidLog(data)
  const item = await post(name,date,Body,signature)
  ctx.body = item
})

async function post(name,date,Body,signature) {
  try {
    const itemData = await pool.query(`INSERT INTO log.logList ('name', 'date', 'body','signature') VALUES ('${name}','${date}','${Body}','${signature}');`)
    return itemData;
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()
