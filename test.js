const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect Db

mongoose.connect('mongodb://localhost/pcat-test-db')

//create Schema

const PhotoSchema = new Schema({
    title: String,
    description: String
})

const Photo = mongoose.model('Photo', PhotoSchema)

//create a photo

/* Photo.create({
    title: 'Photo Title 1',
    description: 'Photo description lorem ipsum 1'
}) */

// read a photo

/* Photo.find({}, (err, data) => {
    console.log(data)
}) */


//update a photo
/* const id = "622e2d4118f7783385ea4a40";

Photo.findByIdAndUpdate(
    id,
    {
        title: 'Photo 111 update',
        description: 'Photo description 111 update'
    },
    {
        new: true
    },
    (err, data) => {
        console.log(data)
    }
) */

//delete a photo
const id = "622e2d4118f7783385ea4a40";
Photo.findByIdAndDelete(id, (err, data) => {
    console.log('photo removed..')
})