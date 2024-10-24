const express=require("express")
const path=require("path")
const app=express()
app.use(express.json())
const PORT=8000
app.set('view engine', 'ejs');


//assignment 5
const items = [
    { name: 'Harry Potter', type: 'book' },
    { name: 'Avengers', type: 'movie' },
    { name: 'Inception', type: 'movie' },
    { name: 'The Hobbit', type: 'book' },
];


app.get('/search', (req, res) => {
    const searchTerm = req.query.q || '';
    const searchResults = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.render('search', { searchTerm, searchResults });
});


//assignment 7
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










// filepath=path.join(__dirname,"/views/index.ejs")
// app.get("/",(req,res)=>{
//     let naam="diya"
//     let place="punjab"
//     res.render(filepath,{naam,destination:place})
// })

// filepath1=path.join(__dirname,"/views/welcome.ejs")
// app.get('/welcome', (req, res) => {
//     const userName = req.query.name || "Guest"; 
//     const currentTime = new Date();
//     let greeting = getGreeting(currentTime);

//     res.render('welcome', { name: userName, greeting });
// });


// function getGreeting(time) {
//     const hour = time.getHours();
//     if (hour < 12) {
//         return "Good morning";
//     } else if (hour < 18) {
//         return "Good afternoon";
//     } else {
//         return "Good evening";
//     }
// }

