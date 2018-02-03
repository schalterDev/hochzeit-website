const app = require('express')();
const http = require('http').Server(app);
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const geschenke = require('./geschenke');
const kuchen = require('./kuchen');
const salate = require('./salate');
const nachtische = require('./nachtische');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(serveStatic('../dist'));

app.get('/api/geschenke', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        res.status(200);
        res.send(geschenke.getGeschenke());
    } catch (error) {
        res.status(500);
        res.send('Could not get geschenke. Look into the server logs for more information');
        console.error('Could not get geschenke. Reason:', error);
    }
});

app.get('/api/kuchen', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        res.status(200);
        res.send(kuchen.getKuchen());
    } catch (error) {
        res.status(500);
        res.send('Could not get kuchen. Look into the server logs for more information');
        console.error('Could not get kuchen. Reason:', error);
    }
});

app.get('/api/salate', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        res.status(200);
        res.send(salate.getSalate());
    } catch (error) {
        res.status(500);
        res.send('Could not get salate. Look into the server logs for more information');
        console.error('Could not get salate. Reason:', error);
    }
});

app.get('/api/nachtische', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        res.status(200);
        res.send(nachtische.getNachtische());
    } catch (error) {
        res.status(500);
        res.send('Could not get nachtische. Look into the server logs for more information');
        console.error('Could not get nachtische. Reason:', error);
    }
});

app.post('/api/geschenke', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let title = req.body.title;
    let name = req.body.name;

    console.log(`Updated geschenke, title: ${title}, name: ${name}`);

    let result = geschenke.updateGeschenk(title, name);

    if(result)
        res.status(200);
    else
        res.status(409);
    res.send();
});

app.put('/api/kuchen', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let kuchenObject = req.body.kuchen;
    let name = req.body.name;
    let anzahl = req.body.anzahl;

    console.log(`Insert kuchen, kuchen: ${kuchenObject}, name: ${name}, anzahl: ${anzahl}`);

    kuchen.addKuchen(kuchenObject, name);

    res.status(200);
    res.send();
});

app.put('/api/salate', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let salatProduct = req.body.salat;
    let name = req.body.name;
    let anzahl = req.body.anzahl;

    console.log(`Insert salat, salat: ${salatProduct}, name: ${name}, anzahl: ${anzahl}`);

    salate.addSalat(salatProduct, name, anzahl);

    res.status(200);
    res.send();
});

app.put('/api/nachtische', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let nachtisch = req.body.nachtisch;
    let name = req.body.name;
    let anzahl = req.body.anzahl;

    console.log(`Insert nachtisch, nachtisch: ${nachtisch}, name: ${name}, anzahl: ${anzahl}`);

    nachtische.addNachtisch(nachtisch, name, anzahl);

    res.status(200);
    res.send();
});

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
