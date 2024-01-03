document.addEventListener('mousemove', (event) => {
    const blob = document.getElementById('blob');
    const x = event.clientX - blob.clientWidth / 2;
    const y = event.clientY - blob.clientHeight / 2;

    blob.animate({
        left: x + 'px',
        top: y + 'px'
    }, { duration: 3000, fill: "forwards" });
});