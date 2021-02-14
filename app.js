let watts = 0
let wattsPerSec
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}
// let clickInventory = [
//    { clicker: plusOneClick, count: 0 }
// ]

let autoInventory = [
   {
      clicker: steamEngine,
      num: 2,
      upgrades: [true, false]
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

function purchase ( type, upgrade ) {
   //debugger
   //upgrade = clickUpgradesList.find( upg => upg.name == upgrade )
   if ( watts >= upgrade.price ) {
      watts -= upgrade.price
      // NOTE: Couldn't get this method to work:
      //let item = clickInventory.find( item => item.clicker == upgrade )
      //item.count++
   }
   //console.log( clickInventory );
}



// Gathers all the auto-clickers and determines how many Watts to produce every second
function autoClick () {
   //console.log( "Auto Interval!" );
   //debugger
   wattsPerSec = 0;
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

   watts += wattsPerSec
   draw()
}











function draw () {
   wattsCountElem.innerText = "Watts: " + watts
   statsElem.innerText = "Watts per second: " + wattsPerSec
}

setInterval( autoClick, 1000 )
draw()