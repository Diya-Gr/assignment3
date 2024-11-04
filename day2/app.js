const express=require("express")
const path=require("path")
const cors=require('cors')
const app=express()
app.use(express.json())
const PORT=8000
app.set('view engine', 'ejs');
const multer = require('multer');


//TASK--->5   -----------------------------------------------------------------------
const items = [
    { name: 'Harry Potter', type: 'book' },
    { name: 'Avengers', type: 'movie' },
    { name: 'Stree', type: 'movie' },
    { name: 'The Helper', type: 'book' },
];


app.get('/search', (req, res) => {
    const searchTerm = req.query.q || '';
    const searchResults = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.render('search', { searchTerm, searchResults });
});


// TASK  --->6 -----------------------------------------------------------------------------------------
let posts = [];

app.get('/posts', (req, res) => {
    res.render('posts', { posts: posts });
});
app.post('/posts', (req, res) => {
    const newPost = {
        title: req.body.title,
        body: req.body.body
    };
    posts.push(newPost);
    res.redirect('/posts'); 
});

app.get('/posts/:title', (req, res) => {
    const post = posts.find(p => p.title === req.params.title);
    if (post) {
        res.render('postDetails', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});




// TASK--->7  -----------------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
let isLoggedIn = false;  


app.get('/', (req, res) => {
    res.render('index', { isLoggedIn });
});


 
// task --->8  -----------------------------------------------------------------------

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/contact', (req, res) => {
    res.render('contact', { error: null });
});


app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.render('contact', { error: 'All fields are required!' });
    }
    res.render('thankyou', { name, email, message });
});





// TASK -->9  --------------------------------------------------------------------------

const products = [
    { name: 'Sample Product', description: 'A sample description.', image: 'images/sample.jpg' }
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

app.get('/upload', (req, res) => {
    res.render('upload'); 
});


app.post('/upload', upload.single('productImage'), (req, res) => {
  
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        image: 'images/' + req.file.filename+'.jpg'
    };


    products.push(newProduct);

    res.redirect('/catalog');
});

app.get('/catalog', (req, res) => {
    res.render('catalog', { products });
});

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`listening to ${PORT}`)
    }
})

