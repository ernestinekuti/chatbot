const TypeWriter = function(txtElement, words, wait= 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){
    // Current Index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullText = this.words[current];
    
    // Check if deleting
    if(this.isDeleting){
        // Remove char
        this.txt = fullText.substring(0, this.txt.length - 1);
    }else{
// add Char
this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
 // Type speeed

 let typeSpeed = 300;

 if(this.isDeleting){
     typeSpeed /= 2;
 }

 //check if word is complete
 if(!this.isDeleting && this.txt === fullText){
     // pause at end
     typeSpeed = this.wait;
     // set deleting to true

    this.isDeleting = true;
 }else if(this.isDeleting && this.txt === ''){
     this.isDeleting = false;
     // Move to next word
     this.wordIndex++;
// pause before start typing
typeSpeed = 400;

 }
  setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM Load

document.addEventListener('DOMContentLoaded', init);

/// init

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
// Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}