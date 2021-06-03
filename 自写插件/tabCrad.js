class Tabs {
	constructor(ele, options = {}) {
		this.ele = document.querySelector(ele);
		this.btns = this.ele.querySelectorAll(".btns > li");
		this.cards = this.ele.querySelectorAll(".cards > li");
		this.options = options;
		this.change();
	}
	Tabs.prototype.change = function() {
		this.btns.forEach((item, index) => {
			item.addEventListener(this.options.type || "click", () => {
				this.btns.forEach((t, i) => {
					t.className = "";
					this.cards[i].className = "";
				});
				item.className = "active";
				this.cards[index].className = "active";
			});
		});
	}
}
