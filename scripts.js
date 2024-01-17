const changeElemDisplay = (elems, display = "none") => {
  for (let i = 0; i < elems.length; i++) {
    elems[i].style.display = display;
  }
};

(() => {
  const bgElem = document.getElementById("bg");
  const time = document.getElementById("time");
  const welcome = document.getElementById("welcome");
  const clear = document.getElementById("clear");
  const button = document.getElementById("submit");
  const input = document.getElementById("name");
  bgElem.style.background = `url(./img/bg-${
    Math.floor(Math.random() * 4) + 1
  }.jpg)`;
  bgElem.style.backgroundSize = "cover";
  const setTime = () => {
    const current = new Date();
    const h = current.getHours();
    const m = current.getMinutes();
    time.innerHTML = `${h % 12 || 12}:${m < 10 ? `0${m}` : m}`;
    setTimeout(() => {
      setTime();
    }, 500);
  };
  setTime();
  chrome.storage.sync.get(["name"], function (result) {
    if (result.name) {
      welcome.innerHTML = `Hello, ${result.name}`;
      const hiddenElems = document.getElementsByClassName("no-name");
      changeElemDisplay(hiddenElems);
    } else {
      const hiddenElems = document.getElementsByClassName("has-name");
      changeElemDisplay(hiddenElems);
    }
  });
  button.addEventListener("click", function () {
    if (input.value.length) {
      console.log(input.value);
      chrome.storage.sync.set({ name: input.value }, function () {
        welcome.innerHTML = `Hello, ${input.value}`;
      });
      const hiddenElems = document.getElementsByClassName("no-name");
      const VisibleElems = document.getElementsByClassName("has-name");
      changeElemDisplay(hiddenElems);
      changeElemDisplay(VisibleElems, "block");
    }
  });
  clear.addEventListener("click", function () {
    chrome.storage.sync.remove(["name"], function () {
      welcome.innerHTML = "Hello what is your name ?";
    });
    const hiddenElems = document.getElementsByClassName("has-name");
    const VisibleElems = document.getElementsByClassName("no-name");
    changeElemDisplay(hiddenElems);
    changeElemDisplay(VisibleElems, "inline-block");
  });
})();
