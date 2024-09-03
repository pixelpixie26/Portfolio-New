
//first lets work on select tag so we can get all the countries options from our JS 
//file from countries.js in both our select boxes 
icons = document.querySelectorAll(".row i");

//FROM TRANSLATION 
const fromTxt = document.querySelector(".fromText");

//to TRANSALTION 
const toTxt = document.querySelector(".toText");

//now lets work on translate text option 
translateBtn = document.querySelector("button");

//exchange Icon 

exchangeIcon = document.querySelector(".exchange");

//lets work on copy and volume button 
const selectTag = document.querySelectorAll("select");



selectTag.forEach((tag, id) => {
  // console.log(tag);
  //selecting Hindi by default as FROM Language and English as TO Language

  for (const countryCode in countries) {
    //forin loop
    //console.log(countries[countryCode]);
     //selected = id == 0 ? countryCode == "en-GB" ? "selected" : "" : countryCode == "hi-IN" ? "selected" : "";
     let selected;

    if (id == 0 && countryCode == "en-GB") {
      selected = "selected";
      console.log(selected);
    } else if (id == 1 && countryCode == "hi-IN") {
      selected = "selected";
      console.log(selected);

    } 
    let optionTag = `<option ${selected} value="${countryCode}"  >${countries[countryCode]}</option>`;
    
   // console.log(optionTag);
   
    tag.insertAdjacentHTML("beforeend", optionTag); //adding options tag inside select tag
  }
});


//EXCHANGE ICON 


exchangeIcon.addEventListener('click', ()=>{
    let temp = fromTxt.value ;
    fromTxt.value = toTxt.value;
    toTxt.value = temp;

    let tempLanguage = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLanguage;
});


// on translate text button click event 
translateBtn.addEventListener('click', ()=>{
    let text = fromTxt.value; //its taking the user input values from user in FROM INPUT FIELD 
    let translateFrom = selectTag[0].value; //getting fromSelect tag value 
    let translateTo = selectTag[1].value; //getting toSelect tag value 

   console.log(text,translateFrom,translateTo);

   //now lets use 3rd party api to translate the text 
   //in this example im using mymemory api 
   //it will do 5000 characters free a day
   
    //lets stop from calling api if the textarea is empty 
    if(!text) return;
    toTxt.setAttribute("placeholder","Translating...");


   let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

     fetch(apiUrl).then(response => response.json()).then(result => {
        console.log(result);

        //find in console.log(result) there is responseData and under there, there is translatedText where language is translated 
        
        toTxt.value = result.responseData.translatedText;
        toTxt.setAttribute("placeholder","Translation");

     })

});

icons.forEach(icon => {
    icon.addEventListener('click', (e)=>{
        console.log(e.target);
       
        if(e.target.classList.contains("fa-copy")) {
           
           //if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value 

            if(e.target.id == "from") {
                //console.log("from click");
                //writeText() property writes the specified text string to the system clipboard 
                navigator.clipboard.writeText(fromTxt.value);

            } else {
                //console.log("to click");
                navigator.clipboard.writeText(toTxt.value);

            }
        } else{
            let talk;
            //if clicked icon has "from" id, speak the fromTextarea value else speak the toTextarea value 
            //console.log("speech icon clicked");
            if(e.target.id == "from") {
                //console.log("from click");
                talk= new SpeechSynthesisUtterance(fromTxt.value);
                 talk.lang=selectTag[0].value; //setting talk language to fromSelect tag value 

            } else {
                //console.log("to click");
                talk= new SpeechSynthesisUtterance(toTxt.value);
                talk.lang=selectTag[1].value;//setting talk language to toSelect tag value 
            }
            speechSynthesis.speak(talk); //speak the passed talk 
        }
    });
});


