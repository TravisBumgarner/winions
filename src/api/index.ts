import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'

const port = 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use('/static', express.static(path.resolve(__dirname + '/dist')))
app.use('/media', express.static(path.resolve(__dirname + '/media')))

// app.get('*', (request: Request, response: Response) => {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

app.get('/helloworld', (request: Request, response: Response) => {
    response
        .status(200)
        .send({
            message: "hello world"
        })
})

app.listen(port)
console.log('server started on port ' + port)