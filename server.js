var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var fs = require('fs')
var data = require('./datajson.json')
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb://admin:admin123@ds161740.mlab.com:61740/mongodbnodejslearn'
var Message = mongoose.model('Message', {
    name: String,
    msg: String
})

app.get('/messages', (req, res)=>{
    Message.find({}, (err, message)=>{
        res.send(message)
    })
})

app.get('/messages/:user', (req, res)=>{
    var user = req.params.user
    Message.find({name:user}, (err, message)=>{
        res.send(message)
    })
})

app.post('/messages', async (req, res)=>{
    try {
        //throw 'throw some error'
        var message = new Message(req.body)
        await message.save()
        console.log('saved')
        var censored = await Message.findOne({msg:'badword'})
        if(censored){
            await Message.remove({_id:censored.id})
        }else{
            io.emit('message', req.body)
        }
        res.sendStatus(200)
        
    } catch (error) {
       res.sendStatus(500)
       console.error(error) 
    } finally{
        console.log('post called')
    }
    
})


var server = http.listen(3001, ()=>{
    console.log('server is running on port', server.address().port)
})

io.on('connection', (socket)=>{
    console.log('A user connected')
})

mongoose.connect(dbUrl, (err)=>{
    console.log('connection to mongose', err)
})