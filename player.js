
var player = function  (name) {
	var src , carX;
	this.name = name;


	this.src = src;
	this.carX = carX;

	Object.defineProperty(this, 'src', {configurable:true,
		enumerable:true,

		set:function (n) {
			src = n;
		},

		get:function () {
			return this.src;
		}
	});

	Object.defineProperty(this, 'carX', {configurable:true,
		enumerable:true,
		set:function (n) {
			carX = n;
		},
		get:function () {
			return this.carX;
		}
	});
	this.move = function (event) {
		switch (event.keyCode) {
			var car1 = window.getElementById('car1');
			case 37:
				//var car1 = window.getElementById('car1');

				car1.style.marginLeft=parseInt(car1.style.marginLeft) - 5 + 'px';

				break;
			case 39:
				//var car1 = window.getElementById('car1');

				car1.style.marginLeft=parseInt(car1.style.marginLeft) - 5 + 'px';

				break;
		}


	}


};
