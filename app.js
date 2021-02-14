let watts = 50
let wattsPerSec = 0
// TODO: Replace clickModifiers with the clickInventory
let clickModifiers = {
   plusOne: 0,
   doubles: 0
}
// let clickInventory = [
//    {
//       clicker: plusOneClick, num: 0
//    }, {
//       clicker: doubleClickValue, num: 0
//    }
// ]

// let autoInventory = [
//    {
//       clicker: steamEngine,
//       num: 0,
//       upgrades: [false, false]
//    }, {
//       clicker: coalTrain,
//       num: 0,
//       upgrades: [false, false]
//    }, {
//       clicker: gasPowerPlant,
//       num: 0,
//       upgrades: []
//    }
// ]

const wattsCountElem = document.getElementById( "wattsCount" )
const statsElem = document.getElementById( "stats" )
const ACStoreElem = document.getElementById( "auto-clicker-store" )
const AUStoreElem = document.getElementById( "auto-upgrade-store" )
const CUStoreElem = document.getElementById( "click-upgrade-store" )

// TODO: Create a function that dynamically draws the upgrades to the DOM

function clickAction () {
   let doubles = clickModifiers.doubles
   let plusOnes = clickModifiers.plusOne

   watts += ( 1 + plusOnes ) * ( doubles == 0 ? 1 : ( 2 * clickModifiers.doubles ) )

   draw()
}

function purchase ( clicker, upgrade ) {
   //debugger
   if ( clicker ) {
      let selected = inventory.find( upg => upg.name == clicker )
      let price = selected.price

      console.log( selected );

      if ( watts >= price ) {
         watts -= price
         selected.owned++
         selected.price = Math.ceil( selected.price * 1.1 )
      }
      /*
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
         let price = selected.clicker.price
         if ( watts >= price ) {
            watts -= price
            selected.num++
            selected.clicker.price *= 1.1
         }
      }
      */
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
   inventory.forEach( item => {
      let produced = item.production

      if ( item.type == "auto" ) {
         for ( let i = 0; i < item.upgrades.length; i++ ) {
            item.upgrades[i].owned ? produced += item.upgrades[i].modifier : undefined
         }

         wattsPerSec += produced *= item.owned
      }
   } )
   draw()
   // for ( let i = 0; i < autoInventory.length; i++ ) {
   //    const thisItem = autoInventory[i]
   //    const thisClicker = thisItem.clicker

   //    let produced = thisClicker.production

   //    //console.log( thisItem );
   //    //console.log( produced, thisItem.num )
   //    if ( thisItem.num > 0 )
   //       for ( let j = 0; j < thisItem.upgrades.length; j++ ) {
   //          const upgradeIsOwned = thisItem.upgrades[j]

   //          if ( upgradeIsOwned )
   //             produced += thisClicker.upgrades[j].modifier
   //       }
   //    //console.log( "Total produced by this item:", produced )
   //    //console.log( "Total produced per second:", produced * thisItem.num )

   //    wattsPerSec += produced * thisItem.num
   // }
}











function draw () {
   wattsCountElem.innerText = watts + " Watts"
   statsElem.innerText = "Watts per second: " + wattsPerSec
}

draw()
setInterval( autoClick, 1000 )