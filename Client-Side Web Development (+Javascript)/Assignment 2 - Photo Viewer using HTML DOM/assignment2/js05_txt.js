"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Yaatu Adem
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; 
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   let imgFavourite = new Array(12);

   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.id = i;
      imgFavourite[i] = false;
      image.onclick = createModal;
      slideBox.appendChild(image);
   }

   // Data to setup favourites gallery at top of webpage
   let favouritesGallery = document.getElementById("favourites");
   let favouritesTitle = document.createElement("h1");
   favouritesTitle.id = "favouritesTitle";
   favouritesTitle.textContent = "My Favourite Images";
   favouritesGallery.appendChild(favouritesTitle);

   // sets a count for favourite images (maximum 5)
   let favouriteCount = 0;
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
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
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);

      // creates "add to favourites" button
      let favouriteContainer = document.createElement("div");
      favouriteContainer.id = "favouriteContainer";
      figureBox.appendChild(favouriteContainer);
      let addFavourite = document.createElement("button");
      addFavourite.id = "addToFavourites";

      // creates "remove from favourites" button so users can remove from favourites in the same screen
      let modalRemoveButton = document.createElement("button");
      modalRemoveButton.id = "modalRemoveButton";
      modalRemoveButton.innerHTML = 'remove favourite';
      
      //add to favourites button changes depending on whether or not favourite has been previously added or not
      if (imgFavourite[modalImage.id] == true) {
         addFavourite.innerHTML = 'added to favourites <img src="favourite.png" />';
         favouriteContainer.appendChild(addFavourite);
         favouriteContainer.appendChild(modalRemoveButton);
      } else {
         addFavourite.innerHTML = 'add to favourites <img src="notfavourite.png" />';
         favouriteContainer.appendChild(addFavourite);
      }

      // When "add to favourites" button is clicked, the webpage will check to see if this is a valid request before adding to favourites
      addFavourite.onclick = function() {
         if (imgFavourite[modalImage.id] == true) {
            alert("Error: Image has already been added to favourites. To remove from favourites, select the remove favourite button or click on the image in the favourites section on the main page and select the remove button that appears below the image.");
         } else if (favouriteCount >= 5) {
            alert("Error: Maximum number of pictures have been added to favourites. Please remove at least one image from the favourite list before trying to add another image.");
         } else {
            imgFavourite[modalImage.id] = true;
            newFavourite(modalImage, modalImage.id);
            addFavourite.innerHTML = 'added to favourites <img src="favourite.png" />';
            favouriteContainer.appendChild(addFavourite);
            favouriteContainer.appendChild(modalRemoveButton);
         }
      }

      // when "remove favourite" button is pressed, the favourite is removed from the main webpage and the window is reset to how it was before favourite was added
      modalRemoveButton.onclick = function() {
         addFavourite.innerHTML = 'add to favourites <img src="notfavourite.png" />';
         favouriteContainer.appendChild(addFavourite);
         favouriteContainer.removeChild(modalRemoveButton);

         imgFavourite[modalImage.id] = false;
         let divToRemove = document.getElementById("newImageDiv" + modalImage.id)
         favouritesGallery.removeChild(divToRemove);
         favouriteCount--;
      }
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }

   function newFavourite(favouriteImg, imgID) {
      favouriteCount++;
      let newImg = favouriteImg.cloneNode("true");
      let newImageDiv = document.createElement("div");
      newImageDiv.id = "newImageDiv" + imgID;
      newImageDiv.className = "favouriteImgDiv";
      favouritesGallery.appendChild(newImageDiv);
      newImageDiv.appendChild(newImg);

      let removeButtonDiv = document.createElement("div");
      removeButtonDiv.className = "removeButtonDiv";
      newImageDiv.appendChild(removeButtonDiv);
      let removeFavourite = document.createElement("button");
      removeFavourite.className = "removeFavourite";
      removeFavourite.innerHTML = 'remove';
      removeButtonDiv.appendChild(removeFavourite);
      let removeButtonSwitch = 0;

      newImg.onclick = function() {
         if (removeButtonSwitch == 1) {
            removeFavourite.style.display = "none";
            removeButtonSwitch = 0;
         } else {
            removeButtonSwitch = 1;
            removeFavourite.style.display = "block";
         }
      }

      removeFavourite.onclick = function() {
         imgFavourite[newImg.id] = false;
         favouritesGallery.removeChild(newImageDiv);
         favouriteCount--;
      }
   }

}