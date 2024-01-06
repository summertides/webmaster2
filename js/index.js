import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/rRKMbzr1HiXTgr8N/scene.splinecode');


var menuToggle = document.querySelector('.menu-toggle');
  
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');

    document.body.dataset.nav = document.body.dataset.nav === 'true' ? 'false' : 'true';
});
