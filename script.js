document.addEventListener("DOMContentLoaded", function () {
  //   let addToDeckBtn = document.getElementById("AddToDeckList");
  //   let addToBannListBtn = document.getElementById("AddToBannList");
  let clearTextBtn = document.getElementById("clearTextarea");
  //   let addToClipboardDeckBtn = document.getElementById("toClipboard_clean");
  //   let addToClipboardBannBtn = document.getElementById("toClipboard_dirty");
  let userInput = document.getElementById("userListInput");

  function addToDeckList() {
    console.log("TEST");
  }

  function addToBannList() {
    console.log("TEST");
  }

  function clearText() {
    userInput.value = "";
  }

  clearTextBtn.addEventListener("click", function () {
    // Call your function or execute your code here
    clearText();
  });

  function toClipboard(status) {
    if (status == "clean") {
      console.log("clean");
    } else if (status == "dirty") {
      console.log("dirty");
    }
  }
});
