class Banner {
	constructor(ele, effect) {
		this.ele = document.querySelector(ele);
		this.imgBox = this.ele.querySelector(".img-box");
		this.pointBox = this.ele.querySelector(".point-box");
		this.effect = effect;
		this.timer = 0;
		this.imgIndex = 1;
		this.flag = true;
		this.banner_width = this.ele.clientWidth;
		this.init();
	}
	init() {
		this.setPoint();
		this.autoPlay();
		this.overOut();
		this.bindEvent();
		this.changeTab();
		if (this.effect === "translation") this.copyImg();
	}
	setPoint() {
		const frag = document.createDocumentFragment();
		for (let i = 0; i < this.imgBox.children.length; i++) {
			const li = document.createElement("li");
			li.setAttribute("type", "point");
			li.dataset.id = i + 1;
			if (i === 0) li.classList.add("active");
			frag.appendChild(li);
		}
		this.pointBox.appendChild(frag);
	}
	changeOne(type) {
		this.imgBox.children[this.imgIndex - 1].classList.remove("active");
		this.pointBox.children[this.imgIndex - 1].classList.remove("active");

		if (type === true) {
			this.imgIndex++;
		} else if (type === false) {
			this.imgIndex--;
		} else {
			this.imgIndex = type;
		}
		if (this.imgIndex > this.imgBox.children.length) this.imgIndex = 1;
		if (this.imgIndex <= 0) this.imgIndex = this.imgBox.children.length;
		this.imgBox.children[this.imgIndex - 1].classList.add("active");
		this.pointBox.children[this.imgIndex - 1].classList.add("active");
	}
	copyImg() {
		const first = this.imgBox.firstElementChild.cloneNode(true);
		const last = this.imgBox.lastElementChild.cloneNode(true);
		this.imgBox.appendChild(first);
		this.imgBox.insertBefore(last, this.imgBox.firstElementChild);
	}
	autoPlay() {
		if (this.effect === "translation") {
			this.timer = setInterval(() => {
				this.imgIndex++;
				move(this.imgBox, {
					left: -this.imgIndex * this.banner_width
				}, 10, this.moveEnd.bind(this));
			}, 2000);
		} else if (this.effect === "fadeOut") {
			this.timer = setInterval(() => {
				this.changeOne(true);
			}, 2000);
		}
	}
	moveEnd() {
		if (this.imgIndex === this.imgBox.children.length - 1) {
			this.imgIndex = 1;
			this.imgBox.style.left = -this.imgIndex * this.banner_width + "px";
		}
		if (this.imgIndex <= 0) {
			this.imgIndex = this.imgBox.children.length - 2;
			this.imgBox.style.left = -this.imgIndex * this.banner_width + "px";
		}
		for (let i = 0; i < this.pointBox.children.length; i++) {
			this.pointBox.children[i].classList.remove("active");
		}
		this.pointBox.children[this.imgIndex - 1].classList.add("active");
		this.flag = true;
	}
	overOut() {
		this.ele.addEventListener("mouseover", () => clearInterval(this.timer));
		this.ele.addEventListener("mouseout", () => this.autoPlay());
	}
	bindEvent() {
		if (this.effect === "translation") {
			this.ele.addEventListener("click", e => {
				e = e || window.event;
				const target = e.target || e.srcElement;
				if (target.className === "prev") {
					if (!this.flag) return;
					this.flag = false;
					this.imgIndex--;
					move(this.imgBox, {
						left: -this.imgIndex * this.banner_width
					}, 10, this.moveEnd.bind(this));
				}
				if (target.className === "next") {
					if (!this.flag) return;
					this.flag = false;
					this.imgIndex++;
					move(this.imgBox, {
						left: -this.imgIndex * this.banner_width
					}, 10, this.moveEnd.bind(this));
				}
				if (target.getAttribute("type") === "point") {
					if (!this.flag) return;
					this.flag = false;
					this.imgIndex = +target.dataset.id;
					move(this.imgBox, {
						left: -this.imgIndex * this.banner_width
					}, 10, this.moveEnd.bind(this));
				}
			});
		} else if (this.effect === "fadeOut") {
			this.ele.addEventListener("click", e => {
				e = e || window.event;
				const target = e.target || e.srcElement;
				if (target.className === "prev") {
					this.changeOne(false);
				}
				if (target.className === "next") {
					this.changeOne(true);
				}
				if (target.getAttribute("type") === "point") {
					const pointIndex = +target.dataset.id;
					this.changeOne(pointIndex);
				}
			});
		}
	}
	changeTab() {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden") {
				clearInterval(this.timer);
			} else if (document.visibilityState === "visible") {
				this.autoPlay();
			}
		});
	}
}
