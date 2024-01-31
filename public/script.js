
document.addEventListener("DOMContentLoaded", function () {
  let addToDeckBtn = document.getElementById("AddToDeckList");
  let addToBanListBtn = document.getElementById("AddToBannList");
  let clearTextBtn = document.getElementById("clearTextarea");
  let addToClipboardDeckBtn = document.getElementById("toClipboard_clean");
  let addToClipboardBanBtn = document.getElementById("toClipboard_dirty");
  let userListInput = document.getElementById("userListInput");
  let inputDeckName = document.getElementById("inputDeckName");
  let deckSelector = document.getElementById("deckSelector");
  let banSelector = document.getElementById("banSelector");
  const regexPattern = /\bMainboard\b/g;
  const regexSelectCards = /^1 (.+)$/gm;
  let cardName = { "name": "" }
  let cardArray = [];


  start();

  function start() {

    updateSelector();
  }

  async function updateSelector() {

    deckSelector.innerHTML = "";
    banSelector.innerHTML = "";
    try {
      const [deckData, banData] = await Promise.all([
        fetch('http://localhost:3000/getDeckData').then(response => response.json()),
        fetch('http://localhost:3000/getBanListData').then(response => response.json())
      ]);

      console.log('Deck-Daten:', deckData);
      console.log('Ban-Daten:', banData);

      let collectionTitel;
      let i = 0;

      if (deckData.decks) {
        for (i = 0; i < deckData.decks.length; i++) {
          collectionTitel = deckData.decks[i].deckName;
          let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
          deckSelector.innerHTML += htmlTxt;
        }
      }

      if (banData.banLists) {
        for (i = 0; i < banData.banLists.length; i++) {
          collectionTitel = banData.banLists[i].banListName;
          let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
          banSelector.innerHTML += htmlTxt;
        }
      }

    } catch (error) {
      console.error('Fehler beim Aktualisieren der Selektoren:', error);
    }
  }

  addToDeckBtn.addEventListener("click", function () {
    let deckTitle = inputDeckName.value;
    let deckText = userListInput.value;
    let match;
    let deckEntry = { "deckName": deckTitle, "cards": [] };

    while ((match = regexSelectCards.exec(deckText)) !== null) {
      cardArray.push(match[1]);
    }

    cardArray.forEach(card => {
      cardName.name = card;
      deckEntry.cards.push({ "name": cardName.name });
    });

    fetch('http://localhost:3000/addDeckEntry', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckEntry }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Serverantwort:', data);

      })
      .catch(error => {
      });

    fetch('http://localhost:3000/getDeckData')
      .then(response => response.json())
      .then(data => {
        console.log('JSON-Daten erhalten:', data);
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

    fetch('http://localhost:3000/getBanListData')
      .then(response => response.json())
      .then(data => {
        console.log('JSON-Daten erhalten:', data);
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));


    updateSelector();
    cardArray = [];
  });

  addToBanListBtn.addEventListener("click", function () {

    let banListName = inputDeckName.value;
    let deckText = userListInput.value;
    let match;
    let banEntry = { "banListName": banListName, "cards": [] };

    while ((match = regexSelectCards.exec(deckText)) !== null) {
      cardArray.push(match[1]);
    }
    console.log(cardArray)

    cardArray.forEach(card => {
      cardName.name = card;
      banEntry.cards.push({ "name": cardName.name });
    });

    console.log(banEntry)

    fetch('http://localhost:3000/addBanListEntry', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ banEntry }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Serverantwort:', data);

      })
      .catch(error => {
      });

    fetch('http://localhost:3000/getDeckData')
      .then(response => response.json())
      .then(data => {
        console.log('JSON-Daten erhalten:', data);
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

    fetch('http://localhost:3000/getBanListData')
      .then(response => response.json())
      .then(data => {
        console.log('JSON-Daten erhalten:', data);
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

    updateSelector();
    cardArray = [];
  });

  clearTextBtn.addEventListener("click", function () {
    clearText();
  });

  addToClipboardDeckBtn.addEventListener("click", () => {
  })

  addToClipboardBanBtn.addEventListener("click", () => {
  })


  function toClipboard(status) {
    if (status == "clean") {
      console.log("clean");
    } else if (status == "dirty") {
      console.log("dirty");
    }
  }

  function clearText() {
    userListInput.value = "";
  }

});