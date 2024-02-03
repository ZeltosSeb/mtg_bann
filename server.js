const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');

const deckFilePath = path.join(process.cwd(), 'public', 'json', 'deck.json').replace(/\\/g, '/');
const banFilePath = path.join(process.cwd(), 'public', 'json', 'ban.json').replace(/\\/g, '/');

const cors = require('cors');
const { exec } = require('child_process');

app.use(cors());
app.use(bodyParser.json()); // Add this line
app.use(express.static('public'));

// Öffne den Browser mit der gewünschten URL
exec('start http://localhost:3000/main.html', (error, stdout, stderr) => {
    if (error) {
        console.error(`Fehler beim Öffnen des Browsers: ${error}`);
        return;
    }
    console.log('Browser erfolgreich geöffnet.');
});

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
app.post('/addBanListEntry', (req, res) => {

    const banEntry = req.body.banEntry;
    fs.readFile(banFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fehler beim Lesen der JSON-Datei:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const currentData = JSON.parse(data);
        currentData.banLists.push(banEntry);
        fs.writeFile(banFilePath, JSON.stringify(currentData, null, 2), (err) => {
            if (err) {
                console.error('Fehler beim Schreiben der JSON-Datei:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('banEntry erfolgreich hinzugefügt.');
            res.status(200).send('banEntry erfolgreich hinzugefügt.');
        });
    });
});

