const dropList = document.querySelectorAll(".dropList select");
const fromCurrency = document.querySelector(".From select");
const toCurrency = document.querySelector(".To select");

//console.log(toCurrency);
const getExchangeRateBtn= document.querySelector('form button');
const exchangeRatetext=document.querySelector(".exchangeRate");
for (let index = 0; index < dropList.length; index++) {
  for (currencyCode in countriesISO) {
   // console.log(currencyCode);

    //selecting INR by default as FROM currency and CAD as TO currency 
    let selected;

    if(index==0){
        selected = currencyCode == "INR"? "selected" : "";
    } else if(index == 1){
        selected = currencyCode == "CAD"? "selected" : "";

    }
    //creating option elements here
    //creating option tag with passing currency code as a text and a value will pass all values created in countriesList.js object
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    
    //insert options tag inside select tag
    dropList[index].insertAdjacentHTML("beforeend",optionTag);
  }

  //to change flag images
  dropList[index].addEventListener('change',e=>{
    loadFlags(e.target); //calling loadFlag with passing target element as an argument 
  });
}

const loadFlags=(e)=>{
    for(code in countriesISO){
        if(code == e.value){ //if currency code of country list is equal to option value 
            let imgTag = e.parentElement.querySelector("img"); //selecting img tag of particular drop list 
            
            //passing country code of a selected currency code in a img url
            imgTag.src=`https://flagcdn.com/48x36/${countriesISO[code].toLowerCase()}.png`;
            console.log(countriesISO[code]);
        }
    }
}

//it will stop the flickering  
window.addEventListener('load',()=>{
 //   e.preventDefault(); //prevent form from submitting
    getExchangeRate(); //call exchangeRate Function
});


getExchangeRateBtn.addEventListener('click',e=>{
    e.preventDefault(); //prevent form from submitting
    getExchangeRate(); //call exchangeRate Function
});

//lets work on exchange button

const exchangeIcon = document.querySelector(".dropList .icon");
exchangeIcon.addEventListener('click', ()=>{
    let changeValue=fromCurrency.value; //temporary changeVALUE  from Drop list
    fromCurrency.value=toCurrency.value; //passing to currency code to -> from currency 
    toCurrency.value=changeValue; //passing exchangevalue again to currency code 
    getExchangeRate();
    loadFlags(fromCurrency);//calling loadFlag with passing select element(fromcurrency) of FROM 
    loadFlags(toCurrency);//calling loadFlag with passing select element(fromcurrency) to TO

});

const getExchangeRate=()=>{
    const amt=document.querySelector(".amount input");
    let amtValue = amt.value;

    //if the user dont enter any value or enter 0 then we will put 1 value by default in the input field
    if(amtValue == "" || amtValue =="0"){
        amtValue.value="1";
        amtValue=1
    }

    exchangeRatetext.innerHTML = "Getting exchange rate.....";
    //exchange rate API
    //fetching api response and returning it with parsing into javascrpt object and in another then method receiving that object 
    let url=`https://v6.exchangerate-api.com/v6/f6f730d1d4f0b7a2722c762d/latest/${fromCurrency.value}`;

   fetch(url).then(response => 
       // console.log(response.json());
        response.json())
    .then(results => {
        console.log(results); //check conversion_rates in console.log where all the currencies are converted
      let exchangeRates = results.conversion_rates[toCurrency.value];
      console.log(exchangeRates);
      //to update total prices .. if user update and amount it should calculate that amount with the currency conversion 
      let totalExchangeRate=(amtValue * exchangeRates).toFixed(2); //multiplying user entered value with selected TO Currency rate 
      console.log(totalExchangeRate);
      
      exchangeRatetext.innerHTML=`${amtValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRatetext.innerHTML="Something went wrong..Try Again!";
    }); 
    

}



