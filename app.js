let watts = 0
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}

let autoInventory = [
   {
      clicker: steamEngine,
      num: 1,
      upgrades: [true, false]
   }
]

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

function purchase(upgrade) {
   
}



// Gathers all the auto-clickers and determines how many Watts to produce every second
function autoClick() {
   // console.log("Auto Interval!");
   // debugger
   // let wattsPerSec = 0;
   // for(let i = 0; i < autoInventory.length; i++) {
   //    const upgrade = autoInventory[i]
   //    console.log(upgrade.clicker.production, upgrade.num);

   //    for(let j = 0; j < upgrade.upgrades.length; i++) {
   //       console.log(upgrade.upgrades[i]);
   //       // if(upgrade.upgrades[i])
   //    }
   // }
}



function draw() {
   statsElem.innerText = "Watts: " + watts
}






setInterval(autoClick, 1000)
draw()