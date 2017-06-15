
const sections = document.querySelectorAll('section');
let colorizedParts = [];
colorizedParts.push( document.querySelector('.full-width') ); 
colorizedParts.push( document.querySelector('.half-width > div') );

(function(){ 
    setRandomBackgroundColor();
}());

document.getElementById('randomColor').addEventListener('click',function(){
    setRandomBackgroundColor();
})

document.getElementById('imageDependentColor').addEventListener('click',function(){
    colorizedParts.forEach(function(el){
        setImageDependentBackgroundColor(el);
    });
})

function setImageDependentBackgroundColor(containerElement){
    const imageToParse = containerElement.querySelector('img');
    const width = imageToParse.width;
    const height = imageToParse.height;
 
    // create an unattached canvas element and draw the image onto it
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(imageToParse, 0, 0, width, height);
    

    let colorArray = Array.from(  // using that canvas element, create an array of color information by...
      canvas.getContext('2d').getImageData( 
        // getting ImageData object for a 1x1 pixel located at right edge in the vertical middle (X coordinate, Y coordinate, width, height)
        width-1, Math.ceil(height/2), 1, 1
      ).data // and return that pixel data in the form of an Uint8ClampedArray: an array of 8-bit (0-255) unsigned integers 
    );

    colorArray.splice(-1,1); // slice off the unneeded alpha value from that array 
    
    // Use that colorArray to construct a style definition for the background color
    containerElement.style.backgroundColor = 'rgb('+ colorArray.toString() +')';
}


function setRandomBackgroundColor(){
    const randomColor = '#' + Math.floor(Math.random() * (parseInt("FFFFFF", 16) + 1)).toString(16);

    colorizedParts.forEach(function(el){
        el.style.backgroundColor = randomColor;
    });
}




/* 
note: Array.from() which is used in setImageDependentBackgroundColor() may need to be polyfilled to work on older browsers. 
See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from?v=example#Polyfill 
*/