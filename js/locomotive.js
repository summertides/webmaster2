import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.07,
    multiplier: 1.5
});

scroll.on('scroll', (obj) => {
    var newWidth = 102 - 0.02 * obj.scroll.y; // 102vw to 98vw
    var newHeight = 100 - 0.01 * obj.scroll.y; // 100vh to 95vh

    newWidth = Math.max(newWidth, 98);
    newHeight = Math.max(newHeight, 95);

    document.getElementById('hero-wrapper').style.width = newWidth + 'vw';
    document.getElementById('hero-wrapper').style.height = newHeight + 'vh';
});