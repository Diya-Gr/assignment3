// TASK  ---->1
const express=require("express")
const path=require("path")
const app=express()
app.use(express.json())
const PORT=8000
app.set('view engine', 'ejs');
filepath=path.join(__dirname,"/views/index.ejs")
app.get("/",(req,res)=>{
    let naam="diya"
    let place="punjab"
    res.render(filepath,{naam,destination:place})
})

filepath1=path.join(__dirname,"/views/welcome.ejs")
app.get('/welcome', (req, res) => {
    const userName = req.query.name || "Guest"; 
    const currentTime = new Date();
    let greeting = getGreeting(currentTime);

    res.render('welcome', { name: userName, greeting });
});


function getGreeting(time) {
    const hour = time.getHours();
    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

//TASK --->2
app.use(bodyParser.urlencoded({ extended: true }));
let tasks = [];


app.get('/todo', (req, res) => {
    res.render('todo', { tasks: tasks });
});


app.post('/addtask', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/todo');
});

app.post('/deletetask', (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect('/todo');
});
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`listening to ${PORT}`)
    }
})



