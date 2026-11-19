//your code here
const tiles = document.querySelectorAll("#tiles img");
const btns = document.getElementById("btns");
const para = document.getElementById("para");

let selected = [];

// 5 classes + ek random duplicate, phir shuffle
const classes = ["img1", "img2", "img3", "img4", "img5"];
classes.push(classes[Math.floor(Math.random() * 5)]);

for (let i = classes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [classes[i], classes[j]] = [classes[j], classes[i]];
}

tiles.forEach((img, i) => {
  img.className = classes[i];
  img.dataset.ns = classes[i];
  img.addEventListener("click", handleClick);
});

// Button banao (agar pehle se nahi hai)
function showButton(id, text, fn) {
  if (document.getElementById(id)) return;
  const btn = document.createElement("button");
  btn.id = id;
  btn.innerText = text;
  btn.addEventListener("click", fn);
  btns.appendChild(btn);
}

// Button hatao
function removeButton(id) {
  const btn = document.getElementById(id);
  if (btn) btn.remove();
}

// Image click
function handleClick() {
  if (selected.includes(this)) return; // same image dobara click ignore

  selected.push(this);
  this.classList.add("selected");
  para.innerText = "";

  showButton("reset", "Reset", resetAll);

  if (selected.length === 2) {
    showButton("verify", "Verify", verify);
  } else {
    removeButton("verify");
  }
}

// Reset
function resetAll() {
  selected.forEach((img) => img.classList.remove("selected"));
  selected = [];
  para.innerText = "";
  removeButton("reset");
  removeButton("verify");
}

// Verify
function verify() {
  if (selected[0].dataset.ns === selected[1].dataset.ns) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  removeButton("verify");
}