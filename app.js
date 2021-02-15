let watts = 50
let wattsPerSec = 0

const wattsCountElem = document.getElementById( "wattsCount" )
const statsElem = document.getElementById( "stats" )
const clickTotalsElem = document.getElementById( "click-value-total" )
const ACStoreElem = document.getElementById( "auto-clicker-store" )
const CUStoreElem = document.getElementById( "click-upgrade-store" )

function clickAction () {
   let plusOnes = inventory.find( upg => upg.name == "plusOneClick" ).owned
   let doubles = inventory.find( upg => upg.name == "doubleClickValue" ).owned

   watts += getClickValue()

   draw()
}

function getClickValue () {
   let plusOnes = inventory.find( upg => upg.name == "plusOneClick" ).owned
   let doubles = inventory.find( upg => upg.name == "doubleClickValue" ).owned

   return ( 1 + plusOnes ) * Math.max( 1, ( 2 * doubles ) )
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
         drawClickUpgrades()
      }
   } else {
      console.log( "Could not find the auto clicker:", upgrade );
   }
   calcWattsRate()
}

// Gathers all the auto-clickers and determines how many Watts to produce every second
function autoClick () {
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
}

function drawClickUpgrades () {
   let clickUpgrades = ""
   let autoUpgrades = ""
   inventory.forEach( item => {
      if ( item.type == "click" ) {
         clickUpgrades += /*html*/`
         <button type="button" class="btn btn-primary d-flex m-0 justify-content-between align-items-center" onclick="purchase('${item.name}')">
            <div class="position-relative w-25">
               <img class="img img-fluid" src="icons/upgrade.png">
               <div class="position-absolute clicker-count">${item.owned}</div>
            </div>
            <div class="text-right">
               <p class="m-0">${item.name}</p>
               <p class="m-0">Cost: ${item.price}</p>
               <p>${item.description}</p>
            </div>
         </button>`
      } else if ( item.type == "auto" ) {
         autoUpgrades += /*html*/`
         <div class="p-2 bg-primary">
            <button type="button" class="btn btn-secondary d-flex justify-content-between align-items-center" onclick="purchase('${item.name}')">
               <div class="w-25 position-relative">
                  <img class="img img-fluid" src="icons/upgrade.png">
                  <div class="position-absolute clicker-count">${item.owned}</div>
               </div>
               <div class="stats">
                  <p class="m-0">${item.name}</p>
                  <p class="m-0">Cost: ${item.price}</p>
                  <p>${item.production} Watt${item.production == 1 ? '' : 's'} per second</p>
               </div>
            </button>
         </div>`
      }
   } )

   CUStoreElem.innerHTML = ''
   CUStoreElem.innerHTML = clickUpgrades
   ACStoreElem.innerHTML = ''
   ACStoreElem.innerHTML = autoUpgrades
}









function draw () {
   wattsCountElem.innerText = watts + " Watts"
   statsElem.innerText = "Watts per second: " + wattsPerSec
   clickTotalsElem.innerText = "Watts per click: " + getClickValue()


}

draw()
drawClickUpgrades()
setInterval( autoClick, 1000 )