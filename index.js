const express = require('express');
const app = express();
const path =require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');


const port = 3000;

let lists = [
    {
        id: uuid(),
        name : 'Nadaaniyan',
        author: 'Sachin-Jigar, Sachet Tandon, Asees Kaur, Amitabh Bhattacharya',
        photo : 'https://pagalfree.com/images/128Ishq%20Mein%20-%20Nadaaniyan%20128%20Kbps.jpg',
        path: 'https://pagalfree.com/musics/128-Ishq%20Mein%20-%20Nadaaniyan%20128%20Kbps.mp3'


    },
    {
        id: uuid(),
        name : 'Kesariya',
        author: 'Sachin-Jigar, Sachet Tandon, Asees Kaur, Amitabh Bhattacharya',
        photo : 'https://pagalfree.com/images/128Aaj%20Ki%20Raat%20-%20Stree%202%20128%20Kbps.jpg',
        path: 'https://pagalfree.com/musics/128-Aaj%20Ki%20Raat%20-%20Stree%202%20128%20Kbps.mp3'
    },
    {
        id: uuid(),
        name : 'Chhaava',
        author: 'Irshad Kamil, Kshitij Patwardhan, A.R. Rahman, Vaishali Samant',
        photo : 'https://pagalfree.com/images/128Aaya%20Re%20Toofan%20-%20Chhaava%20128%20Kbps.jpg',
        path: 'https://pagalfree.com/musics/128-Aaya%20Re%20Toofan%20-%20Chhaava%20128%20Kbps.mp3'
    },
    {
        id: uuid(),
        name : 'Mere Husband Ki Biwi',
        author : 'Badshah, Akshay And IP, Kanika Kapoor',
        photo : 'https://pagalfree.com/images/128Gori%20Hai%20Kalaiyan%20-%20Mere%20Husband%20Ki%20Biwi%20128%20Kbps.jpg',
        path: 'https://pagalfree.com/musics/128-Gori%20Hai%20Kalaiyan%20-%20Mere%20Husband%20Ki%20Biwi%20128%20Kbps.mp3' 
    }
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index',{title:'Home'});
});


app.get('/playlist',(req,res)=>{
    res.render('playlist',{title:'Playlist', list:lists})
})

app.get('/playlist/:id/more',(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let song = lists.find(song=>song.id == req.params.id);
    res.render('more',{ song : song });
    // res.send("server working properly")
})

app.get('/playlist/new',(req,res)=>{
    res.render('new');
});

app.post('/playlist/new',(req,res)=>{
    // console.log(req.body);
    let {name,author,photo,path} = req.body;
    lists.push({
        id: uuid(),
        name,
        author,
        photo,
        path
    })
    res.redirect('/playlist')
});

app.delete('/playlist/:id',(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    lists = lists.filter(song=>song.id != id);
    res.redirect('/playlist');
    // res.send("Delete method is working finely")
    
}); 


app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on http://43.243.80.14:${port} or http://localhost:${port}`);
});

