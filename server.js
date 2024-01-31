const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const deckFilePath = 'C:/Users/Sebastian Surwehme/OneDrive/Documents/mtg_bann/public/json/deck.json';
const banFilePath = 'C:/Users/Sebastian Surwehme/OneDrive/Documents/mtg_bann/public/json/ban.json';
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // Add this line
app.use(express.static('public'));

app.get('/readFile', (req, res) => {
    fs.readFile('server.js', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

app.get('/getDeckData', (req, res) => {
    // Lese die JSON-Datei ein
    fs.readFile(deckFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der JSON-Datei:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        try {
            // Sende die Daten an den Client
            let jsonData = JSON.parse(data);
            res.json(jsonData);
        }
        catch (parseError) {
            console.error('Fehler beim Parsen der JSON-Daten:', parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });
});


app.get('/getBanListData', (req, res) => {
    // Lese die JSON-Datei ein
    fs.readFile(banFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der JSON-Datei:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Sende die Daten an den Client
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/addDeckEntry', (req, res) => {

    const deckEntry = req.body.deckEntry;
    fs.readFile(deckFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der JSON-Datei:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const currentData = JSON.parse(data);
        currentData.decks.push(deckEntry);
        fs.writeFile(deckFilePath, JSON.stringify(currentData, null, 2), (err) => {
            if (err) {
                console.error('Fehler beim Schreiben der JSON-Datei:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('deckEntry erfolgreich hinzugefügt.');
            res.status(200).send('deckEntry erfolgreich hinzugefügt.');
        });
    });
});