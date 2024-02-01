
document.addEventListener("DOMContentLoaded", function () {
  let addToDeckBtn = document.getElementById("AddToDeckList");
  let addToBanListBtn = document.getElementById("AddToBannList");
  let clearTextBtn = document.getElementById("clearTextarea");
  let userListInput = document.getElementById("userListInput");
  let inputDeckName = document.getElementById("inputDeckName");
  let deckSelector = document.getElementById("deckSelector");
  let banSelector = document.getElementById("banSelector");
  let filterDeckBtn = document.getElementById("filterDeck");
  let textFeldSelectedDeck = document.getElementById("selectedDeck");
  let textFeldSelectedBanList = document.getElementById("selectedBanList");

  const regexPattern = /\bMainboard\b/g;
  const regexSelectCards = /^1 (.+)$/gm;
  let cardName = { "name": "" }
  let cardArray = [];

  onStart();

  async function onStart() {
    updateSelector();
    textFeldSelectedDeck.value = "";
    textFeldSelectedBanList.value = "";
    inputDeckName.value = "";
    userListInput.value = "";
    let firstEntryInList = 0;

    try {
      const [deckData, banData] = await Promise.all([
        fetch('http://localhost:3000/getDeckData').then(response => response.json()),
        fetch('http://localhost:3000/getBanListData').then(response => response.json())
      ]);

      let i = 0;

      deckData.decks[firstEntryInList].cards.forEach(cards => {
        textFeldSelectedDeck.value += cards.name + "\n";
        i++;
      });

      banData.banLists[firstEntryInList].cards.forEach(cards => {
        textFeldSelectedBanList.value += cards.name + "\n";
        i++;
      });

    }
    catch (error) {
      console.error('Fehler beim Aktualisieren der Selektoren:', error);
    }

  }

  async function updateSelector() {

    deckSelector.innerHTML = "";
    banSelector.innerHTML = "";

    try {
      const [deckData, banData] = await Promise.all([
        fetch('http://localhost:3000/getDeckData').then(response => response.json()),
        fetch('http://localhost:3000/getBanListData').then(response => response.json())
      ]);

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
          let htmlTxt = `<option  value="${collectionTitel}" >${collectionTitel}</option>`;
          banSelector.innerHTML += htmlTxt;
        }
      }

    } catch (error) {
      console.error('Fehler beim Aktualisieren der Selektoren:', error);
    }
  }

  addToDeckBtn.addEventListener("click", async function () {
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

    fetch('http://localhost:3000/getDeckData')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.decks.length; i++) {
          if (data.decks[i].deckName == deckTitle) {
            alert("Deckname leer oder schon in der Deckliste vorhanden! \nLösche/ändere das Deck aus der deck.json Datei oder nutze einen anderen Namen um das Probelm zu beheben.")
            throw new Error("Deck existiert bereits, \nändere den Namen deines Decks oder entferne das Deck aus der Liste.");
          }
        }
        return fetch('http://localhost:3000/addDeckEntry', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deckEntry }),
        })
          .then(response => {
            response.json();
            alert("Deck wurde hinzugefügt.");
          })
          .then(data => {
            console.log("Zur Deckliste hinzugefügt:", data)
          })
          .catch(error => {
            console.error("Fehler beim Ändern der Daten: ", error);
          });
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

    updateSelector();
    cardArray = [];
  });

  addToBanListBtn.addEventListener("click", async function () {
    let banListName = inputDeckName.value;
    let deckText = userListInput.value;
    let match;
    let banEntry = { "banListName": banListName, "cards": [] };

    while ((match = regexSelectCards.exec(deckText)) !== null) {
      cardArray.push(match[1]);
    }

    cardArray.forEach(card => {
      cardName.name = card;
      banEntry.cards.push({ "name": cardName.name });
    });

    fetch('http://localhost:3000/getBanListData')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.banLists.length; i++) {
          if (data.banLists[i].banListName == banListName) {
            alert("Banlistenname leer oder schon in der Banliste vorhanden! \nLösche/ändere die Liste aus der ban.json Datei oder nutze einen anderen Namen um das Probelm zu beheben.")
            throw new Error("Liste existiert bereits, ändere den Namen deiner Liste oder entferne die Liste aus der aus der ban.json Datei.");
          }
        }
        return fetch('http://localhost:3000/addBanListEntry', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ banEntry }),
        })
          .then(response => {
            response.json();
            alert("Banliste wurde hinzugefügt.")
          })
          .then(data => {
            console.log("Zur Banliste hinzugefügt:", data)
          })
          .catch(error => {
            console.error("Fehler beim Ändern der Daten: ", error);
          });
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));

    updateSelector();
    cardArray = [];
  });

  clearTextBtn.addEventListener("click", function () {
    clearText();
  });

  function clearText() {
    userListInput.value = "";
  }

  deckSelector.addEventListener("change", async function () {
    let selectedDeck = deckSelector.value;
    const [deckData] = await Promise.all([
      fetch('http://localhost:3000/getDeckData').then(response => response.json()),
    ])
    const arrDecks = deckData.decks;

    for (let i = 0; i < arrDecks.length; i++) {

      if (arrDecks[i].deckName == selectedDeck) {
        let arrCards = arrDecks[i].cards;
        let x = 0;

        textFeldSelectedDeck.value = "";
        arrCards.forEach(card => {
          textFeldSelectedDeck.value += card.name + "\n";
        });
      }
    }
  });

  banSelector.addEventListener("change", async function () {
    let selectedBanList = banSelector.value;
    const [banData] = await Promise.all([
      fetch('http://localhost:3000/getBanListData').then(response => response.json()),
    ])
    const arrBan = banData.banLists;
    for (let i = 0; i < arrBan.length; i++) {

      if (arrBan[i].banListName == selectedBanList) {
        let arrCards = arrBan[i].cards;
        let x = 0;

        textFeldSelectedBanList.value = "";
        arrCards.forEach(card => {
          textFeldSelectedBanList.value += card.name + "\n";
        });
      }
    }
  });

  filterDeckBtn.addEventListener("click", function () {
    let banList = document.getElementById("selectedBanList").value;
    let deckList = document.getElementById("selectedDeck").value;

    let banListArr = banList.split(/\n/).map(line => line.trim());
    let deckListArr = deckList.split(/\n/).map(line => line.trim());

    banListArr.pop();
    deckListArr.pop();

    let remainingCards = deckListArr;

    for (let i = 0; i < deckListArr.length; i++) {

      for (let j = 0; j < banListArr.length; j++) {

        if (banListArr[j] == deckListArr[i]) {

          //Entferne von remainingCards einen Eintrag welcher gleich banListArr[j] ist
          remainingCards = remainingCards.filter(card => card !== banListArr[j]);
        }
      }
    }
    clearText();
    remainingCards.forEach(card => {

      userListInput.value += "1 " + card + "\n";

    });

    alert("Dein Deck wurde erfolgreich gefilterted. \nSiehe dein gefiltertes Deck im linken Textfeld.");

  });
})



