const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require ('request');
const PORT = process.env.port || 5000;

function call_api(finishedAPI){
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_062031d20883444f9ea74e2610fe2011', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){
            //console.log(body);
            finishedAPI(body);
        };
    });
};

//API Token: pk_1ff0c2c3f00c4be8841a03ec788cfcca 
//Account No. cc1dc3b7ee1953ec026c174eb747e27e

//set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    call_api(function(doneAPI){
        //console.log(doneAPI.companyName);
        res.render( 'home', { stock: doneAPI  } );
    });
});

const otherstuff = 'this is just some other stuff';

app.get('/about', function (req, res) {
    res.render( 'about', 
    { stuff: otherstuff }
    );
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server Listening on port ' + PORT));