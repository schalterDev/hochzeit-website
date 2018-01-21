const app = require('express')();
const http = require('http').Server(app);
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const geschenke = require('./geschenke');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(serveStatic('../static'));

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
