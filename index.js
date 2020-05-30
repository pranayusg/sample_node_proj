const express = require('express')
const app = express();
const datastore = require('nedb')

var arraylatlon = []
app.listen(3000, () => console.log('lisening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new datastore('database.db')
database.loadDatabase()

app.get('/api', (Request, Response) => {
    database.find({},(err,data)=>{
        if(err) {
            response.end();
            return;
        }
        Response.json(data)
    })
})

app.post('/api', (Request, Response) => {
    console.log(Request.body)

    var timestamp = Date.now()
    var data = Request.body
    data.timestamp = timestamp
    console.log(timestamp)
    /* database.insert({
        'lat':Request.body.lat,
        'lon':Request.body.lon,
        'timestamp':timestamp
    }) */
    database.insert(data)
    /* arraylatlon.push({
        'lat':Request.body.lat,
        'lon':Request.body.lon
    }) */
    arraylatlon.push(data)
    console.log(arraylatlon)
    /* Response.json({
        status:'success',
        latitude:Request.body.lat,
        longitude:Request.body.lon,
        timestamp:timestamp
    }) */
    Response.json(data)
})
