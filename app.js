let watts = 0
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}

let autoInventory = [
   {
      clicker: steamEngine,
      num: 2,
      upgrades: [true, false]
   }
]

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

function purchase ( upgrade ) {

}



// Gathers all the auto-clickers and determines how many Watts to produce every second
function autoClick () {
   //console.log( "Auto Interval!" );
   //debugger
   let wattsPerSec = 0;
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
   statsElem.innerText = "Watts: " + watts
}






setInterval( autoClick, 1000 )
draw()