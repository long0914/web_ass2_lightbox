



// Title of the slideshow
let lightboxTitle = "My Western Vacation";

// Names of the image files shown in the slideshow
let imgFiles = ["photo01.jpg", "photo02.jpg", "photo03.jpg", "photo04.jpg",
                "photo05.jpg", "photo06.jpg", "photo07.jpg", "photo08.jpg",
                "photo09.jpg", "photo10.jpg", "photo11.jpg", "photo12.jpg"]

// Captions associated with each image
let imgCaptions = new Array(12);
imgCaptions[0]="Sky Pond (Rocky Mountain National Park)";
imgCaptions[1]="Buffalo on the Plains (South Dakota)"; 
imgCaptions[2]="Garden of the Gods (Colorado Springs)"; 
imgCaptions[3]="Elephant Head Wild Flower (Rocky Mountain National Park)"; 
imgCaptions[4]="Double Rainbow (Colorado National Monument)";
imgCaptions[5]="Moose in the Wild (Grand Lake, Colorado)";
imgCaptions[6]="Camas Wild Flower (Rocky Mountain National Park)";
imgCaptions[7]="Chasm Lake (Rocky Mountain National Park)";
imgCaptions[8]="Teton Crest Trail (Grand Teton National Park)";
imgCaptions[9]="The Notch Trail (Badlands National Park)";
imgCaptions[10]="Sprague Lake (Rocky Mountain National Park)";
imgCaptions[11]="Longs Peak Trail (Rocky Mountain National Park)";

// Count of images in the slideshow
let imgCount = imgFiles.length;

let favouriteImages = [];

window.addEventListener("load", createLightbox);


function createLightbox() {
   let imageCount = imgFiles.length;
   let lightBox = document.getElementById("lightbox");
   console.log("lightBox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
let article = document.querySelector("article");

   
   let lbTitle = document.createElement("h1");
   lbTitle.id = "lbTitle";
   lbTitle.textContent = lightboxTitle;
   lightBox.appendChild(lbTitle);
   
   let lbCounter = document.createElement("div");
   lbCounter.id = "lbCounter";
   lbCounter.textContent = currentSlide + "/" + imageCount;
   lightBox.appendChild(lbCounter);
   
   let lbPrev = document.createElement("div");
   lbPrev.id = "lbPrev";
   lbPrev.innerHTML = "&#9664;";
   lbPrev.onclick = moveToLeft;   
   lightBox.appendChild(lbPrev);
   
   let lbNext = document.createElement("div");
   lbNext.id = "lbNext";
   lbNext.innerHTML = "&#9654;";  
   lbNext.onclick = moveToRight;   
   lightBox.appendChild(lbNext);
   
   let lbPlay = document.createElement("div");
   lbPlay.id = "lbPlay";
   lbPlay.innerHTML = "&#9199;";
   lbPlay.onclick = startStopShow;
   lightBox.appendChild(lbPlay);
   
   let lbImages = document.createElement("div");
   lbImages.id = "lbImages";
   lightBox.appendChild(lbImages);

   let lbFav = document.createElement("div");
   lbFav.id = "lbFav";
   lbFav.textContent = "Favourites";
   article.appendChild(lbFav);
   lbFav.onclick = function(){
   
   


   }



   

   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      lbImages.appendChild(image);
   }
   

   
   
   function moveToRight() {
      let firstImage = lbImages.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      lbImages.appendChild(firstImage);
      lbImages.removeChild(lbImages.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      lbCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = lbImages.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      lbImages.removeChild(lbImages.lastElementChild);
      lbImages.insertBefore(lastImage, lbImages.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      lbCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   




   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";

      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);


      //add favorite button
      let favButton = document.createElement("div");
      favButton.id = "favButton";
      favButton.textContent = "Add to Favorites";
      modalWindow.appendChild(favButton);
       favButton.onclick = function() {


         addFavourite(modalImage.src);
         //debug here
         console.log(modalImage);
     };  
     let closeBox = document.createElement("div");
         closeBox.id = "modalClose";
         closeBox.innerHTML = "&times;";
         closeBox.onclick = function() {
          document.body.removeChild(modalWindow);
      }
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);


      
      }
      function addFavourite(imageSrc) {

         let url = new URL(imageSrc);
         let filename = url.pathname.slice(1); // remove the leading slash
         console.log("added filename: " + filename);
         if (favouriteImages.length < 5) {
             favouriteImages.push(filename);
         } else {
             alert("You can only have 5 favourite images. First image will be removed.");
             favouriteImages.shift();
             favouriteImages.push(filename);
         }
         console.log(favouriteImages);
     }

      
         

      }
      
  

   