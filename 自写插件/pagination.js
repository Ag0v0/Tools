class Pagination {
	constructor(ele, options = {}) {
		this.ele = document.querySelector(ele);
		this.default = {
			current: options.current || 1,
			total: options.total || 0,
			totalpage: 0,
			pagesize: options.pagesize || 10,
			first: options.first || "首页",
			prev: options.prev || "上一页",
			next: options.next || "下一页",
			last: options.last || "尾页",
			go: options.go || "Go",
			change: options.change || (() => {})
		};
		this.cursor = {
			cursor: "pointer"
		};
		this.flex = {
			display: "flex",
			justifyContent: "space-evenly",
			alignItems: "center",
		};
		this.init();
	}
	init() {
		this.default.totalpage = Math.ceil(this.default.total / this.default.pagesize);
		this.randerHtml();
		this.setBoxStyle();
		this.bindEvent();
	}
	randerHtml() {
		this.ele.innerHTML = "";
		const {
			first,
			prev,
			next,
			last,
			current
		} = this.default;
		const frag = document.createDocumentFragment();
		frag.appendChild(setCss(createEle("div", "first", first), this.cursor));
		frag.appendChild(setCss(createEle("div", "prev", prev), this.cursor));
		const list = setCss(createEle("ul", "list", ""), {
			...this.flex,
			width: "50%",
			alignSelf: "center"
		});
		list.appendChild(this.createListItem());
		frag.appendChild(list);
		frag.appendChild(setCss(createEle("div", "next", next), this.cursor));
		frag.appendChild(setCss(createEle("div", "last", last), this.cursor));
		const jump = setCss(createEle("div", "jump", ""), this.flex)
		jump.appendChild(this.createJumpItem());
		frag.appendChild(jump);
		this.ele.appendChild(frag);
		this.default.change(current);
	}
	createListItem() {
		const {
			current,
			totalpage
		} = this.default;
		const frag = document.createDocumentFragment();
		if (totalpage <= 9) {
			for (let i = 1; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li);
			}
			return frag;
		}
		const point = setCss(createEle("li", "ignore", "..."), {});
		if (current < 5) {
			for (let i = 1; i <= 5; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li);
			}
			frag.appendChild(point.cloneNode(true));
			for (let i = totalpage - 1; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			return frag;
		}
		if (current === 5) {
			for (let i = 1; i <= 7; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li);
			}
			frag.appendChild(point.cloneNode(true));
			for (let i = totalpage - 1; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			return frag;
		}
		if (current > 5 && current < totalpage - 4) {
			for (let i = 1; i <= 2; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			frag.appendChild(point.cloneNode(true));
			for (let i = current - 2; i <= current + 2; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li.cloneNode(true));
			}
			frag.appendChild(point);
			for (let i = totalpage - 1; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			return frag;
		}
		if (current === totalpage - 4) {
			for (let i = 1; i <= 2; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			frag.appendChild(point.cloneNode(true));
			for (let i = totalpage - 6; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li);
			}
			return frag;
		}
		if (current > totalpage - 4) {
			for (let i = 1; i <= 2; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				frag.appendChild(li);
			}
			frag.appendChild(point.cloneNode(true));
			for (let i = totalpage - 4; i <= totalpage; i++) {
				const li = setCss(createEle("li", "item", i), this.cursor);
				li.dataset.id = i;
				if (i === current) setCss(li, {
					color: "#B83F45"
				});
				frag.appendChild(li);
			}
			return frag;
		}
	}
	createJumpItem() {
		const {
			go,
			current
		} = this.default;
		const frag = document.createDocumentFragment();
		const inp = setCss(createEle("input", "page-inp", ""), {
			width: "30px",
			outline: "none",
			marginRight: "5px"
		});
		inp.value = current;
		const goTo = setCss(createEle("span", "go", go), this.cursor);
		frag.appendChild(inp);
		frag.appendChild(goTo);
		return frag;
	}
	setBoxStyle() {
		setCss(this.ele, {
			...this.flex,
			width: "800px",
			height: "60px"
		});
	}
	bindEvent() {
		const inp = this.ele.querySelector(".page-inp");
		this.ele.addEventListener("click", e => {
			e = e || window.event;
			const target = e.target || e.srcElement;
			const {
				current,
				totalpage
			} = this.default;
			if (target.className === "first" && current > 1) {
				this.default.current = 1;
				this.randerHtml();
			}
			if (target.className === "prev" && current > 1) {
				this.default.current--;
				this.randerHtml();
			}
			if (target.className === "next" && current < totalpage) {
				this.default.current++;
				this.randerHtml();
			}
			if (target.className === "last" && current < totalpage) {
				this.default.current = totalpage;
				this.randerHtml();
			}
			if (target.className === "item") {
				let index = +target.dataset.id
				if (index === current) return;
				this.default.current = index;
				this.randerHtml();
			}
			if (target.className === "go") {
				let index = +target.previousElementSibling.value;
				if (index === current) return;
				if (index <= 1) index = 1;
				if (index >= totalpage) index = totalpage;
				this.default.current = index;
				this.randerHtml();
			}
		});

		document.onselectstart = function() {
			return false;
		};
	}
}

function createEle(nodeName, className, text) {
	const ele = document.createElement(nodeName);
	ele.className = className;
	ele.innerHTML = text;
	return ele;
}

function setCss(ele, styles) {
	for (let key in styles) {
		ele.style[key] = styles[key];
	}
	return ele;
}
