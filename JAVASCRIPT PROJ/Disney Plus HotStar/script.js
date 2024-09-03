let movies = [
    {
      name: "falcon and the winter soldier",
      des:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia adipisci autem mollitia quidem totam.",
      image: "images/slider 2.png"
    },
    {
      name: "loki",
      des:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia adipisci autem mollitia quidem totam.",
      image: "images/slider 1.png"
    },
    {
      name: "wanda vision",
      des:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia adipisci autem mollitia quidem totam.",
      image: "images/slider 3.png"
    },
    {
      name: "raya and the last dragon",
      des:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia adipisci autem mollitia quidem totam.",
      image: "images/slider 4.png"
    },
    {
      name: "luca",
      des:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus officia adipisci autem mollitia quidem totam.",
      image: "images/slider 5.png"
    }
  ];

// Creating Middle Slider

 const carousel=document.querySelector('.carousel');

//Creating slider with Empty Array 
let slideIndex=0; // to track and to keep counter on current slide
let sliders=[];

const createSlide = () =>{
    if(slideIndex >= movies.length){
        slideIndex=0;
    }

    //create DOM Elements

    let slide=document.createElement('div');
    let imgElements=document.createElement('img');
    let content=document.createElement('div');
    let h1=document.createElement('h1');
    let p=document.createElement('p');

  
    //attaching all the elements 
    imgElements.appendChild(document.createTextNode(''));
    h1.appendChild(document.createTextNode(movies[slideIndex].name));
    p.appendChild(document.createTextNode(movies[slideIndex].des));
    content.appendChild(h1);
    content.appendChild(p);
    slide.appendChild(imgElements);
    slide.appendChild(content);
    console.log(slide.appendChild(imgElements));
    carousel.appendChild(slide);

    //setting up images 

    imgElements.src=movies[slideIndex].image;
    slideIndex++;


    //setting up the elements classnames according to CSS SETTINGS

    slide.className='carouselSlider';
    content.className='content';
    h1.className='moviesTitle';
    p.className='moviesDescription';

    //pushing carouselSlider elements

    sliders.push(slide);
    //pushing slide effect (Animation)

    //-2 is second slider in middle
    console.log(sliders.length);
    if(sliders.length){
        //we need negative left margin -100 
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length -2)}% - ${30 * (sliders.length - 2)}px)`;

        //30 margin on the right
    }
};

//to call this function multiple times for animation
for(let i=0;i<3;i++){
    createSlide();
}

//setting sliders to slide on certain interval

setInterval(() => {
    createSlide();
}, 3000);

 
// VIDEO CARD animation

const videoCards = [...document.querySelectorAll('.videoCard')];

videoCards.forEach(item => {
    item.addEventListener('mouseover', () => {
        let video = item.children[1];
        video.play();
    })
    item.addEventListener('mouseleave', () => {
        let video = item.children[1];
        video.pause();
    })
})


//MOVIE CARD SLIDERS -3RD SECTION RECOMMENDED FOR YOU AND POPULAR SHOWS

let cardContainers = [...document.querySelectorAll('.card-container')];
let preBtns = [...document.querySelectorAll('.pre-btn')];
let nxtBtns = [...document.querySelectorAll('.nxt-btn')];

cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtns[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth - 200;
    })

    preBtns[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth + 200;
    })
})