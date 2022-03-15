const express = require('express');
const ejs = require('ejs');
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload');
const Photo = require('./modals/Photo');
const mongoose = require('mongoose');
const { fstat } = require('fs');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db')

/* mongoose.connect('mongodb+srv://kadir:123456789.@cluster0.qpmrg.mongodb.net/pcat-db?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB CONNECTED!')
    }).catch((err) => {
        console.log(err)
    }) */

app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(fileUpload());


app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos
    })
})

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add', (req, res) => {
    res.render('add')
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/photos', async (req, res) => {
    //console.log(req.files.image)
    //await Photo.create(req.body)
    //res.redirect('/')

    const uploadDir = 'public/uploads'
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name
        })
        res.redirect('/')
    })

})
const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})