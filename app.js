let express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
let session = require('express-session');
var bodyParser = require('body-parser');
let moment = require('./config/moment');


//tableau misy anle article rehetra
var tab = {
        "articles": [{
                "titre": "Article 1",
                "description": "Ce blog est fait par RAVALION Herinirina Etudiant à l'ISPM  L-3 en 'Informatique de Gestion , Genie Logiciel Intelligence Artificielle'(IGGLIA-3)",
                "date": "il y deux jours"
            },
            {
                "titre": "Article 2",
                "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea repudiandae recusandae voluptas, eos praesentium voluptatibus ipsam tempora quia facere, quaerat error quibusdam! Ad aliquid aperiam, repudiandae fugiat aspernatur vitae quis possimus similiquenemo, provident tempora hic voluptatem iure. Minus dolorem iusto, sit assumenda fugit id molestiae veritatis officiis ducimus quas laboriosam ea veniam sint? Recusandae ipsa suscipit magnam provi",
                "date": "il y deux jours"
            }
        ]
    }
    //Init app 
const app = express();
//ejs
app.set('view engine', 'ejs');
//public folder
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let erreur = false;
app.get('/', (req, res) => {
    res.render('index', {
        articles: tab.articles,
        erreur: erreur
    });
});
app.get('/articles', (req, res) => res.render('articles', {
    articles: tab.articles,
    erreur: erreur
}));
app.get('/aprop', (req, res) => res.render('aprop'));
app.post('/', (req, res) => {
    if (req.body.description === undefined || req.body.description === '' || req.body.titre === undefined || req.body.titre === '') {
        // req.flash('error', "aucun message")
        erreur = true;
    } else {
        tab.articles.push({
            titre: req.body.titre,
            description: req.body.description,
            date: moment(new Date()).fromNow()
        });
    }
    res.redirect('/')
})

// app.edit('/', (req, res) => {
//     var id = req.params.id;
//     if (id >= 0 && id < tab.posts.length) {
//         tab.posts[id] = req.body;
//         res.json(true);
//     } else {
//         res.json(false);
//     }

// })
// app.delete('/', (req, res) => {
//     var id = req.params.id;
//     if (id >= 0 && id < tab.posts.length) {
//         tab.posts.slpice(id, 1);
//         res.json(true);
//     } else {
//         res.json(false);
//     }

// })
app.use('/public', express.static('public'));
app.use(session({
    secret: 'Ok',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


const port = 5000;

app.listen(port, () => console.log('Server started on port ${port}'));