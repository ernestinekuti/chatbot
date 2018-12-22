const countdown = document.querySelector('.countdown');
const launchDate = new Date('Jan 1, 2019 13:00:00 ').getTime();
// update every second
const intvl = setInterval(() => {
// get todays date and time in (ms)

const now = new Date().getTime();
// distance from now to the launche date in ms
const distance = launchDate - now;

// Time Calculations

const days = Math.floor(distance/ (1000 * 60 * 60 * 24));

const hours = Math.floor( (distance % (1000 * 60 * 60 * 24))/ (1000 * 60 * 60));

const mins = Math.floor( (distance % (1000 * 60 * 60 ))/ (1000 * 60 ));

const second =  Math.floor( (distance % (1000 * 60 ))/ 1000 );

countdown.innerHTML = `
<div>${days}<span>Days</span></div>
<div>${hours}<span>Hour</span> </div>
<div>${mins}<span>Minutes</span></div>
<div>${second}<span>Seconds</span> </div>`;

// if launch date passed
if(distance < 0){
    clearInterval(intvl);
    // style and output text;
   // comingsoon.innerHTML = 'We are live';
    countdown.style.color = '#17a2b8';
    countdown.innerHTML = 'Launched';
   // comingsoon.innerHTML = 'We are live';
   
}

}, 1000);