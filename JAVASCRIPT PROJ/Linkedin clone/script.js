let profileMenu = document.querySelector(".profileMenuWrap");
let navProfileImage=document.querySelector(".navProfileImage");
let showMoreLink = document.getElementById("showMoreLink");
let sideActivity=document.getElementById("sideBarActivity");
let moreLink = document.getElementById("showMoreLink");
const toggleMenu = () =>{
    profileMenu.classList.toggle("active");
};

navProfileImage.addEventListener('click',toggleMenu);

const toggleActive = () =>{
    sideActivity.classList.toggle("active");

    if(sideActivity.classList.contains("active")){
        moreLink.innerHTML="Show less <b>-</b>";
    }else{
        moreLink.innerHTML="Show more <b>+</b>";

    }
};

navProfileImage.addEventListener('click',toggleActive);
moreLink.addEventListener('click',toggleActive);