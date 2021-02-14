// NOTE Number Shortening Letters

// 10^[#] : "x"
// 40,000 -> 40k
const siPrefix = {
   3: "k",
   6: "M",
   9: "G"
}

// NOTE Auto-Clicker Upgrades
// #region

// #region Fossil Fuels

const steamEngine = {
   name: "Steam Engine",
   price: 100,
   production: 1,
   icon: "",
   upgrades: [
      {
         name: "Safety Valve",
         price: 1000,
         description: "Prevents boilers from getting over-pressurized and exploding.",
         modifier: 1,
         icon: ""
      }, {
         name: "Lubricant",
         price: 300,
         description: "Increase the efficiency of your Steam Engines.",
         modifier: 0.5,
         icon: ""
      }
   ]
}

const coalTrain = {
   name: "Coal Locomotive",
   price: 1000,
   production: 25,
   icon: "",
   upgrades: [
      {
         name: "Precision Engineering",
         price: 5000,
         description: "Increase the efficiency of your locomotives.",
         modifier: 5,
         icon: ""
      }, {
         name: "Diesel Engines",
         price: 25000,
         description: "No need to carry water around anymore, drastically increase weight capacity.",
         modifier: 15,
         icon: ""
      }
   ]
}

const gasPowerPlant = {
   name: "Fossil Fuel Power Plant",
   price: 10000,
   production: 500,
   icon: ""
}
// #endregion
// #endregion
const autoClickersList = [steamEngine, coalTrain, gasPowerPlant]



// NOTE Manual Click Upgrades
// #region

const plusOneClick = {
   name: "plusOneClick",
   description: "+1 W/Click",
   price: 50,
   icon: ""
}

const doubleClickValue = {
   name: "doubleClickValue",
   description: "*2 W/Click",
   price: 500,
   icon: ""
}


// #endregion
const clickUpgradesList = [plusOneClick, doubleClickValue]