document.addEventListener("DOMContentLoaded", function () {
  let addToDeckBtn = document.getElementById("AddToDeckList");
  let addToBanListBtn = document.getElementById("AddToBannList");
  let clearTextBtn = document.getElementById("clearTextarea");
  let addToClipboardDeckBtn = document.getElementById("toClipboard_clean");
  let addToClipboardBanBtn = document.getElementById("toClipboard_dirty");
  let userInput = document.getElementById("userListInput");
  let inputDeckName = document.getElementById("inputDeckName");
  let deckSelector = document.getElementById("deckSelector");
  let banSelector = document.getElementById("banSelector");

  let deckJSON = fetch("deck.json").then(response => response.json()).then(data => {
    console.log("Json Deck geladen.");
    addToSelector(data);

  }).catch(error => console.error('Fehler beim Laden der JSON-Datei:', error))


  let banJSON = fetch("ban.json").then(response => response.json()).then(data => {
    console.log("Json Ban geladen.")

    addToSelector(data);

  })
    .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));


  function addToSelector(list) {

    let collectionTitel;
    let i = 0;

    if (list.decks) {
      collectionTitel = list.decks[i].deckName;

      for (i = 0; i < list.decks.length; i++) {
        let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
        deckSelector.innerHTML += htmlTxt;
      }

    }
    else if (list.banLists) {
      collectionTitel = list.banLists[i].banListName;
      for (i = 0; i < list.banLists.length; i++) {
        let htmlTxt = `<option value="${collectionTitel}">${collectionTitel}</option>`;
        banSelector.innerHTML += htmlTxt;
      }
    }
  }

  addToDeckBtn.addEventListener("click", function () {

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
    userInput.value = "";
  }

});

