let watts = 50
let wattsPerSec = 0
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}
let clickInventory = [
   {
      clicker: plusOneClick, num: 0
   }, {
      clicker: doubleClickValue, num: 0
   }
]

let autoInventory = [
   {
      clicker: steamEngine,
      num: 0,
      upgrades: [false, false]
   }, {
      clicker: coalTrain,
      num: 0,
      upgrades: [false, false]
   }, {
      clicker: gasPowerPlant,
      num: 0,
   }
]

const wattsCountElem = document.getElementById( "wattsCount" )
const statsElem = document.getElementById( "stats" )
const ACStoreElem = document.getElementById( "auto-clicker-store" )
const AUStoreElem = document.getElementById( "auto-upgrade-store" )
const CUStoreElem = document.getElementById( "click-upgrade-store" )



function clickAction () {
   let doubles = clickModifiers.doubles
   let plusOnes = clickModifiers.plusOne

   watts += ( 1 + plusOnes ) * ( doubles == 0 ? 1 : ( 2 * clickModifiers.doubles ) )

   draw()
}

function purchase ( upgrade, type ) {
   //debugger
   console.log( upgrade, type );
   if ( upgrade ) {
      if ( type == "click" ) {
         let selected = clickInventory.find( upg => upg.clicker == upgrade )
         let price = selected.clicker.price
         if ( watts >= price ) {
            watts -= price
            selected.num++
            selected.clicker.price *= 1.1
         }
      } else {
         let selected = autoInventory.find( upg => upg.clicker == upgrade )
         // TODO: If the upgrade is not already in the inventory, find it and add it
         let price = selected.clicker.price
         if ( watts >= price ) {
            watts -= price
            selected.num++
            selected.clicker.price *= 1.1
         }
      }
   } else {
      console.log( "Could not find the auto clicker:", upgrade );
   }
   calcWattsRate()
}

// Gathers all the auto-clickers and determines how many Watts to produce every second
function autoClick () {
   //console.log( "Auto Interval!" );
   //debugger
   calcWattsRate()

   watts += wattsPerSec
   draw()
}

function calcWattsRate () {
   wattsPerSec = 0
   for ( let i = 0; i < autoInventory.length; i++ ) {
      const thisItem = autoInventory[i]
      const thisClicker = thisItem.clicker

      let produced = thisClicker.production

      //console.log( thisItem );
      //console.log( produced, thisItem.num )
      for ( let j = 0; j < thisItem.upgrades.length; j++ ) {
         const upgradeIsOwned = thisItem.upgrades[j]

         if ( upgradeIsOwned )
            produced += thisClicker.upgrades[j].modifier
      }
      //console.log( "Total produced by this item:", produced )
      //console.log( "Total produced per second:", produced * thisItem.num )

      wattsPerSec += produced * thisItem.num
   }
   draw()
}











function draw () {
   wattsCountElem.innerText = watts + " Watts"
   statsElem.innerText = "Watts per second: " + wattsPerSec
}

draw()
setInterval( autoClick, 1000 )