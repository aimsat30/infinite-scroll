const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 5;
const apiKey = 'X1UC704Yn5WRz66WL4MpbizxrDlmpa6pj6o5JVn3zt4';
const query = 'red panda'
const apiUri = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// image loaded function
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// helper function to set attributes on DOM element
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// display photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // add event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a> then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUri);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){}
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }   
})

// onload
getPhotos();