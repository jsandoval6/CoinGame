function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const rightBtn = document.querySelector('.right');
const leftBtn = document.querySelector('.left');
const upBtn = document.querySelector('.up');
const downBtn = document.querySelector('.down');
const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');
const score = document.querySelector('#scoreNumber');
let collectedCoin = 0;


rightBtn.addEventListener('click', function (e) {
	const currLeft = extractPosition(avatar.style.left);
	if (currLeft + 50 < window.innerWidth - avatar.getBoundingClientRect().width) {
		moveHorizontal(avatar, 50, currLeft)
		avatar.style.transform = 'scale(1,1)';
	}
	CheckIsTouching();
});

leftBtn.addEventListener('click', function (e) {
	const currLeft = extractPosition(avatar.style.left);
	if (currLeft - 50 > 0) {
		moveHorizontal(avatar, -50, currLeft)
		avatar.style.transform = 'scale(-1,1)';
	}
	CheckIsTouching();
});

upBtn.addEventListener('click', function (e) {
	const currTop = extractPosition(avatar.style.top);
	if (currTop - 50 > 0) {
		moveVertical(avatar, -50, currTop);
	}
	CheckIsTouching();
});

downBtn.addEventListener('click', function (e) {
	const currTop = extractPosition(avatar.style.top);
	if (currTop + 50 < window.innerHeight - avatar.getBoundingClientRect().height) {
		moveVertical(avatar, 50, currTop);
	}
	CheckIsTouching();
});

window.addEventListener('keydown', function (e) {
	const currTop = extractPosition(avatar.style.top);
	const currLeft = extractPosition(avatar.style.left);
	if ((e.key === 'ArrowDown' || e.key === 'Down' || e.className === 'right') && currTop + 50 < window.innerHeight - avatar.getBoundingClientRect().height) {
		moveVertical(avatar, 50, currTop);
	}
	else if ((e.key === "ArrowUp" || e.key === 'Up') && currTop - 50 > 0) {
		moveVertical(avatar, -50, currTop);
	}
	else if ((e.key === "ArrowRight" || e.key === 'Right') && currLeft + 50 < (window.innerWidth - avatar.getBoundingClientRect().width)) {
		moveHorizontal(avatar, 50, currLeft)
		avatar.style.transform = 'scale(1,1)';
	}
	else if ((e.key === "ArrowLeft" || e.key === 'Left') && currLeft - 50 > 0) {
		moveHorizontal(avatar, -50, currLeft)
		avatar.style.transform = 'scale(-1,1)';
	}
	CheckIsTouching();
});


const CheckIsTouching = () => {
	if (isTouching(avatar, coin)) {
		moveCoin();
		collectedCoin++;
		score.innerText = collectedCoin;
	}
}

const moveVertical = (element, amount, top) => {
	element.style.top = `${top + amount}px`;
}

const moveHorizontal = (element, amount, left) => {
	element.style.left = `${left + amount}px`;
}

const extractPosition = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
}

const moveCoin = () => {
	const y = ~~(Math.random() * (window.innerHeight - coin.getBoundingClientRect().width));
	const x = ~~(Math.random() * (window.innerWidth - coin.getBoundingClientRect().height));
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
}

moveCoin();