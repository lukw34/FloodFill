/**
 * Flood fill to algorytm używany np. w programach graficznych do wypełniania zamkniętych obszarów bitmapy kolorem. Korzysta z kolejki lub stosu.
 */

class FloodFill {
    constructor(bitmap, replacementColor = [0, 0, 0, 0], tolerance = 10, x = 0, y = 0) {
        this.bitmap = bitmap;
        this.tolerance = tolerance;
        this.x = x;
        this.RGBA = 4;
        this.queue = [];
        this.y = y;
        this.node = this._getPixelArrayIndex();
        this.replacementColor = replacementColor;
        this.targetColor = Array.prototype.slice.call(bitmap.data, this.node, this.node + this.RGBA);

    }

    _getPixelArrayIndex() {
        return (this.y * this.bitmap.width + this.x) * this.RGBA;
    }

    /**
     * Ustawia zdefiniowany kolor dla konkretnego pixela
     * @private
     */
    _setColor() {
        for (let i = 0; i < this.RGBA; i += 1) {
            this.bitmap.data[this.node + i] = this.replacementColor[i];
        }
    }

    /**
     * Sprawdza czy kolor na podanej pozycji jest taki jak ten, który zmieniamy
     * @returns {boolean}
     * @private
     */
    _colorEquals() {
        if (this.node < 0 || this.node + this.RGBA - 1 > this.bitmap.data.length) {
            return false;
        }

        let diff = 0;
        for (let i = 0; i < this.RGBA; i += 1) {
            diff += Math.abs(this.bitmap.data[this.node + i] - this.targetColor[i]);
        }
        return diff <= this.tolerance;
    }

    /**
     * Pobiera kolejny pixel
     *
     * @param direction
     * @returns {*}
     * @private
     */
    _getNode(direction) {
        let n = 0;
        switch (direction) {
            case 'west':
                n = 1;
                break;
            case 'east':
                n = -1;
                break;
            case 'north':
                n = -this.bitmap.width;
                break;
            case 'south':
                n = this.bitmap.width;
                break;
        }

        return this.node + n * this.RGBA;
    }

    /**
     * Dopoki istnieją pixele do sprawdzenia. Wykonuje sprawdzenie i ustawia kolor
     */
    run() {
        this.queue.push(this.node);
        while (this.queue.length) {
            this.node = this.queue.pop();

            if (this._colorEquals()) {
                this._setColor();

                this.queue.push(
                    this._getNode('west'),
                    this._getNode('east'),
                    this._getNode('north'),
                    this._getNode('south')
                );
            }
        }
    }
}
