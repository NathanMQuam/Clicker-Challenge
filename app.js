let watts = 0
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}

const statsElem = document.getElementById("stats")
const ACStoreElem = document.getElementById("auto-clicker-store")
const AUStoreElem = document.getElementById("auto-upgrade-store")
const CUStoreElem = document.getElementById("click-upgrade-store")

function clickAction() {
   let doubles = clickModifiers.doubles
   let plusOnes = clickModifiers.plusOne

   watts += (1 + plusOnes) * (doubles == 0 ? 1 : (2 * clickModifiers.doubles))

   draw()
}

function draw() {
   statsElem.innerText = "Watts: " + watts
}