const express=require("express")
const path=require("path")
const app=express()
app.use(express.json())
const PORT=8000
app.set('view engine', 'ejs');


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

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`listening to ${PORT}`)
    }
})

