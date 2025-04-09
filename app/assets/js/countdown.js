import confetti from "canvas-confetti";
/**
 * Creates a countdown timer object that calculates the time remaining until a target date and hour.
 *
 * @param {string} targetDate - The target date in a format recognized by the Date constructor.
 * @param {string} targetHour - The target hour in "HH:MM" format.
 * @param {string} targetElement - The ID of the HTML element that will display the countdown.
 */
function countdown(targetDateTime, targetElement) {
	const target = new Date(targetDateTime).getTime();
	const daySpan = targetElement.querySelector(".days");
	const hourSpan = targetElement.querySelector(".hours");
	const minuteSpan = targetElement.querySelector(".minutes");
	const secondSpan = targetElement.querySelector(".seconds");

	const itv = setInterval(() => {
		const now = new Date().getTime();
		const diff = target - now;

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor(
			(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		);
		let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((diff % (1000 * 60)) / 1000);

		if (days < 10) {
			days = `0${days}`;
		}
		if (hours < 10) {
			hours = `0${hours}`;
		}
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}

		if (diff <= 0) {
			clearInterval(itv);
			explodeConfetti(60);
		} else {
			daySpan.textContent = days;
			hourSpan.textContent = hours;
			minuteSpan.textContent = minutes;
			secondSpan.textContent = seconds;
		}
	}, 1000);
}

function explodeConfetti(seconds) {
	let duration = seconds * 1000;
	let animationEnd = Date.now() + duration;
	let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	let interval = setInterval(function () {
		let timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		let particleCount = 50 * (timeLeft / duration);
		// since particles fall down, start a bit higher than random
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			}),
		);
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			}),
		);
	}, 250);
}

export default countdown;
