const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const putObject = require('./s3');

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    responseOnLimit: "Picture size should be smaller than 5mb",
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}))

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Upload picture'
    });
})

app.post('/upload', async (req, res, next) => {
    try {
        if (!req.files) {
            res.render('home', {
                title: 'Upload picture',
                error: 'Please choose a picture to upload'
            });
        } else {
            const { picture } = req.files;
            const response = await putObject(picture);

            if (response.err && response.err){
                throw response.err
            }

            res.render('success', {
                title: 'Succesfully Uploaded',
                url: response.url
            })
        }
    } catch(err){
        next(err);
    }
});


app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err);
})

app.use((err, req, res, next) => {
    if (err.status === 404){
        res.status(404);
        res.render('error', {
            title: 'Not Found',
            error: err
        })
    } else {
        res.status(500)
        res.render('error', {
            title: 'Server Error',
            error: err
        })
    }
});

app.listen(8080, ()=> console.log('listening on port 8080'))