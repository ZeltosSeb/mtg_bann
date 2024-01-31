
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


  fetch('http://localhost:3000/getDeckData')
    .then(response => response.json())
    .then(data => {
      console.log('JSON-Daten erhalten:', data);
      addToSelector(data);
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

  fetch('http://localhost:3000/getBanListData')
    .then(response => response.json())
    .then(data => {
      console.log('JSON-Daten erhalten:', data);
      addToSelector(data);
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

  function addToSelector(list) {

    let collectionTitel;
    let i = 0;

    if (list.decks) {

      for (i = 0; i < list.decks.length; i++) {
        collectionTitel = list.decks[i].deckName;

        let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
        deckSelector.innerHTML += htmlTxt;
      }

    }
    else if (list.banLists) {
      for (i = 0; i < list.banLists.length; i++) {
        collectionTitel = list.banLists[i].banListName;

        let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
        banSelector.innerHTML += htmlTxt;
      }
    }
  }



  addToDeckBtn.addEventListener("click", function () {



    const regexPattern = /\bMainboard\b/g;
    const regexSelectCards = /^1 (.+)$/gm;
    let cardName = { "name": "" }
    let cardArray = [];
    let deckTitle = inputDeckName.value;
    let deckText = userListInput.value;
    let filteredDeckText = deckText.replace(regexPattern, '');
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
      mode: 'cors', // Add this line
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
  });

  addToBanListBtn.addEventListener("click", function () {

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