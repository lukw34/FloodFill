window.addEventListener('load', function () {
    const img = document.querySelector('img'),
        canvas = document.querySelector('canvas'),
        startButton = document.getElementById('start');
    canvas.width = img.width;
    canvas.height = img.height;

    const cc = canvas.getContext('2d');
    cc.drawImage(img, 0, 0);


    /**
     * Obsluguje klikniecie przycisku
     * Rozpoczyna dzialanie algorytmu
     * Usuwa przycisk
     */
    startButton.onclick = () => {
        const bitmap = cc.getImageData(0, 0, canvas.width, canvas.height),
            filledImage = document.createElement('img'),
            floodFill = new FloodFill(bitmap, [0, 255, 0, 128], 30, 0, 0);

        cc.clearRect(0, 0, canvas.width, canvas.height);
        floodFill.run();

        cc.putImageData(bitmap, 0, 0);

        filledImage.src = canvas.toDataURL();
        canvas.parentNode.insertBefore(filledImage, canvas);
        canvas.parentNode.removeChild(canvas);

        startButton.remove();
    };


}, false);
