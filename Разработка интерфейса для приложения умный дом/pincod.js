function EnterPin() {
	let input = "";
	let settingsStr = localStorage.getItem("password");
	let settings = JSON.parse(settingsStr);
	let pin = settings.pin;





	let line = document.querySelectorAll(".input_line"),
		buttons = document.querySelectorAll(".btn");

	buttons.forEach((btn, i) => {
		btn.addEventListener('click', (e) => {

			if (input.length < 4) {
				input += e.target.dataset.val;
				try {

					line[input.length - 1].className += ' active';
				}
				catch {
					debugger
				}
			}
			if (input.length >= 4) {
				if (input !== pin) {
					line.forEach((input_line) => {
						input_line.className += " notСorrect";
					});
					document.body.className += " notСorrect";

					setTimeout(function () {
						line.forEach((input_line) => {
							input_line.className = "input_line";
						});
						input = "";
					}, 900);
				}
				else {
					line.forEach((input_line) => {
						input_line.className += " correct";
					});
					document.body.className += " correct";

					setTimeout(function () {
						window.location.href = "index.html"
					}, 900);
				}

			}
		});
	});
}

EnterPin();