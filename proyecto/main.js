$(document).ready(function() {
	var items = $(".gallery-item");
	var currentItem = 0;
	var totalItems = items.length;
	var slideDirection;
	var scrollDirection;

	$(".gallery-wrapper").on("wheel", function(event) {
		event.preventDefault();

		if (event.originalEvent.deltaY < 0) {
			scrollDirection = "up";
		} else {
			scrollDirection = "down";
		}

		if (slideDirection === "horizontal" && scrollDirection === "up") {
			slideDirection = "";
			return;
		}

		if (slideDirection === "horizontal" && scrollDirection === "down") {
			return;
		}

		if (slideDirection === "vertical" && scrollDirection === "down") {
			slideDirection = "";
			return;
		}

		if (slideDirection === "vertical" && scrollDirection === "up") {
			return;
		}

		if (Math.abs(event.originalEvent.deltaY) >= 100) {
			if (scrollDirection === "up") {
				move("prev");
			} else {
				move("next");
			}

			if (currentItem === 0) {
				slideDirection = "vertical";
			} else {
				var currentOffset = $(items[currentItem]).offset().left;
				var prevOffset = $(items[currentItem - 1]).offset().left;

				if (currentOffset === prevOffset) {
					slideDirection = "vertical";
				} else {
					slideDirection = "horizontal";
				}
			}
		}
	});

	function move(direction) {
		if (direction === "next") {
			if (currentItem === totalItems - 1) {
				currentItem = 0;
			} else {
				currentItem++;
			}
		} else {
			if (currentItem === 0) {
				currentItem = totalItems - 1;
			} else {
				currentItem--;
			}
		}

		$(".gallery-item").removeClass("active");
		$(items[currentItem]).addClass("active");

		if (currentItem === 0) {
			$(".gallery-item").css("border-left", "none");
		} else {
			$(".gallery-item").css("border-left", "5px solid #fff");
			$(items[currentItem - 1]).css("border-right", "none");
		}

		if (currentItem === totalItems - 1) {
			$(".gallery-item").css("border-right", "none");
		} else {
			$(".gallery-item").css("border-right", "5px solid #fff");
			$(items[currentItem + 1]).css("border-left", "none");
		}
	}
});