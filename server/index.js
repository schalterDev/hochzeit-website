const app = require('express')();
const http = require('http').Server(app);
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const geschenke = require('./geschenke');
const kuchen = require('./kuchen');
const salat = require('./salate');
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
        res.send(salat.getSalate());
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

    geschenke.updateGeschenk(title, name);
    console.log(`Updated geschenke, title: ${title}, name: ${name}`);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
