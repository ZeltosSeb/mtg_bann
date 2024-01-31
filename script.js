document.addEventListener("DOMContentLoaded", function () {
  let addToDeckBtn = document.getElementById("AddToDeckList");
  let addToBanListBtn = document.getElementById("AddToBannList");
  let clearTextBtn = document.getElementById("clearTextarea");
  let addToClipboardDeckBtn = document.getElementById("toClipboard_clean");
  let addToClipboardBanBtn = document.getElementById("toClipboard_dirty");
  let userInput = document.getElementById("userListInput");
  let deckName = document.getElementById("inputDeckName");

  let deckJSON = fetch("deck.json").then(response => response.json()).then(data => {
    console.log("Json Deck geladen.")
  })
    .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));

  let banJSON = fetch("ban.json").then(response => response.json()).then(data => {
    console.log("Json Ban geladen.")

  })
    .catch(error => console.error('Fehler beim Laden der JSON-Datei:', error));





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

