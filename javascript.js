let timelineContainer = document.querySelector('#timeline-container');
let timelineSVGLink = './assets/timeline.svg';

fetch(timelineSVGLink).then((e) => e.text()).then((svgData) => appendSvgData(svgData));

function appendSvgData(svgData) {
	timelineContainer.innerHTML = svgData;
}

// Useful ids for timeline:
// #parent-container for the container
// #start-point for the bigger circle ( ellipse 1 + ellipse 2)
// #data-point for the smaller circle ( ellipse 3 + ellipse 4)
// #timeline-svg for the timeline svg

let dataPointsLink = './data-points.json';
let yearsArray = [];
fetch(dataPointsLink).then((e) => e.json()).then((dataEvents) => showDataEvents(dataEvents));

function showDataEvents(dataEvents) {
	let keys = Object.keys(dataEvents[0]);
	let lengthObject = keys.length;
	for (let i = 0; i < lengthObject; i++) {
		yearsArray.push(dataEvents[0][keys[i]]['year-of-discovery']);
	}

	populateTimeline();
}

// 1 year = 50;
// y = 450 data-point start

function populateTimeline() {
	let dataPoint = document.querySelector('#data-point');
	let parentContainer = document.querySelector('#parent-container');
	let lineLength;
	let startingYear = yearsArray[0];
	parseInt(startingYear);
	for (let i = 0; i < yearsArray.length - 1; i++) {
		let currentYear = yearsArray[i];
		parseInt(currentYear);
		console.log(currentYear - startingYear);
		let cloneDP = dataPoint.cloneNode(true);
		cloneDP
			.querySelector('.outer-circle')
			.setAttribute('transform', `matrix(1,0,0,1,918.5,${(currentYear - startingYear) * 30 + 498.5})`);
		cloneDP
			.querySelector('.inner-circle')
			.setAttribute('transform', `matrix(1,0,0,1,918.5,${(currentYear - startingYear) * 30 + 498.5})`);
		lineLength = (currentYear - startingYear) * 30 + 498.5;
		parentContainer.appendChild(cloneDP);
	}
	generateTimeline(lineLength);
}

function generateTimeline(lineLength) {
	document.querySelector('#timeline-svg').setAttribute('height', lineLength);
	document.querySelector('#timeline-svg').setAttribute('viewBox', `0 0 84 ${lineLength}`);
	document.querySelector('.timeline-line').setAttribute('y2', lineLength);
	document.querySelector('.filter-line').setAttribute('height', lineLength);
}
