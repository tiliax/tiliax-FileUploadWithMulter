// npm init; npm i express nodemon multer; add nodemon to package.json
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const port = 8080

const storage = multer.diskStorage({
    destination: (request, file, callbackfuntion) => { //callbackfuntion: where to store the images 1 argument =null: hier könnte errormeldung stehen, 2 argument: acutal destination Images = folder
        callbackfuntion(null, 'public/images' )
    },
    filename: (request, file, callbackfuntion) => {
        console.log(file)
        callbackfuntion(null, Date.now() + path.extname(file.originalname)) // um filename unique zu machen: date + originalname
    }
})
const upload = multer({storage: storage});
// multer({ dest: 'public/images' }) gleens version

app.use(express.static('public'));
// app.use("/public", express.static(path.join(__dirname, "public")));



app.post('/upload-profile-pic', upload.single('profile_pic') , (request, response) => {
    response.send(`<h2>Here is the picture:</h2><img src='/images/${request.file.filename}' alt='something'/>`)    
});




app.listen(port, () => {
     console.log('server is listening on port' + port )
});



// Aufgabe: https://platform.wbscodingschool.com/courses/full-stack-web-app/13049/
