const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto } = require('./controllers/photoControllers');
const { getAboutPage, getAddPage, getEditPage } = require('./controllers/pageControllers');
require('dotenv').config()
const app = express();

//mongoose.connect('mongodb://localhost/pcat-test-db')

mongoose.connect(`mongodb+srv://kadir:${process.env.PASSWORD}@cluster0.qpmrg.mongodb.net/pcat-db?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB CONNECTED!')
    }).catch((err) => {
        console.log(err)
    })

app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))


app.get('/', getAllPhotos)
app.get('/photos/:id', getPhoto)
app.post('/photos', createPhoto)
app.put('/photos/:id', updatePhoto)
app.delete('/photos/:id', deletePhoto)

app.get('/about', getAboutPage)

app.get('/add', getAddPage)

app.get('/photos/edit/:id', getEditPage)




const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})