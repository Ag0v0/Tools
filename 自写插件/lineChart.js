class linechart {
    constructor(ele, data, options = {}) {
        this.ele = document.querySelector(ele);
        this.ctx = this.ele.getContext('2d');
        this.data = data;
        this.options = options;
        this.default = {
            spaceTop: 20,
            spaceLeft: 20,
            space: 20,
            joinSize: 10,
            axisWidth: 2,
            lineWidth: 2,
            axisColor: 'rgb(0, 0, 0)',
            lineColor: 'rgb(0, 0, 0)',
            joinColor: 'rgb(0, 0, 0)'
        };
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.x = this.options.space || this.options.spaceLeft || this.default.spaceLeft;
        this.y = this.height - (this.options.space || this.options.spaceTop || this.default.spaceTop);
        this.canvasData = [];
        this.init();
    }
    init() {
        this.transformData();
        this.setAxis();
        this.points(this.canvasData);
        this.line(this.canvasData);
    }
    transformData() {
        this.data.forEach(item => {
            this.canvasData.push({
                x: this.x + item.x,
                y: this.y - item.y
            })
        });
    }
    setAxis() {
        this.ctx.lineWidth = this.options.axisWidth || this.default.axisWidth;
        this.ctx.strokeStyle = this.options.axisColor || this.default.axisColor;
        this.ctx.fillStyle = this.options.axisColor || this.default.axisColor;
        this.setAxisX();
        this.setAxisY();
    }
    setAxisX() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.width - (this.options.space || this.options.spaceLeft || this.default.spaceLeft), this.y);
        this.ctx.lineTo(this.width - (this.options.space || this.options.spaceLeft || this.default.spaceLeft) - 10, this.y + 5)
        this.ctx.lineTo(this.width - (this.options.space || this.options.spaceLeft || this.default.spaceLeft) - 10, this.y - 5)
        this.ctx.lineTo(this.width - (this.options.space || this.options.spaceLeft || this.default.spaceLeft), this.y);
        this.ctx.stroke();
        this.ctx.fill()
    }
    setAxisY() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x, (this.options.space || this.options.spaceTop || this.default.spaceTop));
        this.ctx.lineTo(this.x + 5, (this.options.space || this.options.spaceTop || this.default.spaceTop) + 10);
        this.ctx.lineTo(this.x - 5, (this.options.space || this.options.spaceTop || this.default.spaceTop) + 10);
        this.ctx.lineTo(this.x, (this.options.space || this.options.spaceTop || this.default.spaceTop));
        this.ctx.stroke();
        this.ctx.fill();
    }
    point(data) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.options.joinColor || this.default.joinColor;
        if (this.options.join == 'round') {
            this.ctx.arc(data.x, data.y, (this.options.joinSize || this.default.joinSize), 0, Math.PI * 2);
            this.ctx.fill();
        } else if (this.options.join == 'triangle') {
            this.ctx.moveTo(data.x + (this.options.joinSize || this.default.joinSize) / Math.sqrt(3), data.y - (this.options.joinSize || this.default.joinSize) / Math.sqrt(3));
            this.ctx.lineTo(data.x - (this.options.joinSize || this.default.joinSize) / Math.sqrt(3), data.y - (this.options.joinSize || this.default.joinSize) / Math.sqrt(3))
            this.ctx.lineTo(data.x, data.y + (this.options.joinSize || this.default.joinSize) / Math.sqrt(3))
            this.ctx.closePath();
            this.ctx.fill()
        } else {
            this.ctx.fillRect(data.x - (this.options.joinSize || this.default.joinSize) / 2, data.y - (this.options.joinSize || this.default.joinSize) / 2, (this.options.joinSize || this.default.joinSize), (this.options.joinSize || this.default.joinSize));
        }
    }
    points(data) {
        data.forEach(item => {
            this.point(item);
        })
    }
    line(data) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        data.forEach(item => {
            this.ctx.lineTo(item.x, item.y)
        });
        this.ctx.lineWidth = this.options.lineWidth || this.default.lineWidth;
        this.ctx.strokeStyle = this.options.lineColor || this.default.lineColor;
        this.ctx.stroke();
    }
}