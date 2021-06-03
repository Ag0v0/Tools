class Enlarge {
	constructor(ele) {
		this.ele = document.querySelector(ele);
		this.show = this.ele.querySelector(".show");
		this.mask = this.ele.querySelector(".mask");
		this.enlarge = this.ele.querySelector(".enlarge");
		this.list = this.ele.querySelector(".list");
		this.init();
	}
	init() {
		this.getSize();
		this.overOut();
		this.setScale();
		this.moveMask();
		this.buigEvent();
	}
	overOut() {
		this.show.addEventListener("mouseover", () => {
			this.mask.classList.add("active");
			this.enlarge.classList.add("active");
		});
		this.show.addEventListener("mouseout", () => {
			this.mask.classList.remove("active");
			this.enlarge.classList.remove("active");
		});
	}
	getSize() {
		this.mask_width = parseInt(getStyle(this.mask, null, "width"));
		this.mask_height = parseInt(getStyle(this.mask, null, "height"));
		this.show_width = this.show.clientWidth;
		this.show_height = this.show.clientHeight;
		this.enlarge_width = parseInt(getStyle(this.enlarge, null, "width"));
		this.enlarge_height = parseInt(getStyle(this.enlarge, null, "height"));
	}
	setScale() {
		const bg_width = parseInt(this.enlarge_width / (this.mask_width / this.show_width));
		const bg_height = parseInt(this.enlarge_height / (this.mask_height / this.show_height));
		this.enlarge.style.backgroundSize = `${bg_width}px ${bg_height}px`;
	}
	moveMask() {
		this.show.addEventListener("mousemove", e => {
			e = e || window.event;
			let maskX = e.offsetX - this.mask_width / 2;
			let maskY = e.offsetY - this.mask_height / 2;
			if (maskX <= 0) maskX = 0;
			if (maskY <= 0) maskY = 0;
			if (maskX >= this.show_width - this.mask_width) maskX = this.show_width - this.mask_width;
			if (maskY >= this.show_height - this.mask_height) maskY = this.show_height - this.mask_height;
			this.mask.style.left = maskX + "px";
			this.mask.style.top = maskY + "px";
			let bg_moveX = -this.enlarge_width / (this.mask_width / maskX);
			let bg_moveY = -this.enlarge_height / (this.mask_height / maskY);
			this.enlarge.style.backgroundPosition = `${bg_moveX}px ${bg_moveY}px`;
		});
	}
	buigEvent() {
		this.list.addEventListener("click", e => {
			e = e || window.event;
			const target = e.target || e.srcElement;
			if (target.nodeName === "IMG") {
				for (let i = 0; i < this.list.children.length; i++) {
					this.list.children[i].classList.remove("active");
				}
				target.parentElement.classList.add("active");
				const showImgSrc = target.dataset.show;
				const enlargeImgSrc = target.dataset.big;
				this.show.firstElementChild.src = showImgSrc;
				this.enlarge.style.backgroundImage = `url(${enlargeImgSrc})`;
			}
		});
	}
}
