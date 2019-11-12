let timelineContainer = document.querySelector('#timeline-container');
let timelineSVGLink = './assets/timeline.svg';

fetch(timelineSVGLink).then((e) => e.text()).then((svgData) => appendSvgData(svgData));

function appendSvgData(svgData) {
	timelineContainer.innerHTML += svgData;
}

// Useful ids for timeline:
// #parent-container for the container
// #start-point for the bigger circle ( ellipse 1 + ellipse 2)
// #data-point for the smaller circle ( ellipse 3 + ellipse 4)
// #timeline-svg for the timeline svg

let dataPointsLink = './data-points.json';
let yearsArray = [];
let yDataPointsArray = [ 450 ];
fetch(dataPointsLink).then((e) => e.json()).then((dataEvents) => showDataEvents(dataEvents));

function showDataEvents(dataEvents) {
	let keys = Object.keys(dataEvents[0]);
	let lengthObject = keys.length;
	for (let i = 0; i < lengthObject; i++) {
		yearsArray.push(dataEvents[0][keys[i]]['year-of-discovery']);
	}

	populateTimeline();
}

// 1 year = 30;
// y = 450 data-point start

function populateTimeline() {
	let dataPoint = document.querySelector('#data-point');
	let parentContainer = document.querySelector('#parent-container');
	let lineLength;
	let startingYear = yearsArray[0];
	parseInt(startingYear);
	for (let i = 1; i < yearsArray.length; i++) {
		let currentYear = yearsArray[i];
		parseInt(currentYear);

		let yDistance = (currentYear - startingYear) * 30 + 498.5;

		yDataPointsArray.push(yDistance);

		let cloneDP = dataPoint.cloneNode(true);
		cloneDP.querySelector('.outer-circle').setAttribute('transform', `matrix(1,0,0,1,918.5,${yDistance})`);
		cloneDP.querySelector('.inner-circle').setAttribute('transform', `matrix(1,0,0,1,918.5,${yDistance})`);
		lineLength = (currentYear - startingYear) * 30 + 498.5;
		parentContainer.appendChild(cloneDP);
	}

	createYearsTimeline();
	generateTimeline(lineLength);
}

function createYearsTimeline() {
	let yearsContainer = document.querySelector('#years-container');
	for (let i = 0; i < yearsArray.length; i++) {
		let p = document.createElement('p');
		p.textContent = yearsArray[i];
		p.setAttribute('class', 'yearParagraph');
		yearsContainer.appendChild(p);
	}
	positionYearsTimeline();
}

function positionYearsTimeline() {
	let yearsParagraphsArray = document.querySelectorAll('.yearParagraph');
	for (let i = 0; i < yDataPointsArray.length; i++) {
		yearsParagraphsArray[i].style.marginTop = yDataPointsArray[i] + 'px';
	}
}

function generateTimeline(lineLength) {
	document.querySelector('#timeline-svg').setAttribute('height', lineLength);
	document.querySelector('#timeline-svg').setAttribute('viewBox', `0 0 84 ${lineLength}`);
	document.querySelector('.timeline-line').setAttribute('y2', lineLength);
	document.querySelector('.filter-line').setAttribute('height', lineLength);

	fetchFutureTimeline();
}

// add second half of timeline

function fetchFutureTimeline() {
	let futureTimelineSVGLink = './assets/timeline-after2019.svg';
	fetch(futureTimelineSVGLink).then((e) => e.text()).then((svgData) => addFutureTimeline(svgData));
}

function addFutureTimeline(svgData) {
	timelineContainer.innerHTML += svgData;
	fetchEndTimeline();
}

// #Repeat_Grid_1 for the first set of dashed lines
// #Repeat_Grid_2 for the second set of lines
// #Group_20 for the whole formation

function fetchEndTimeline() {
	let endTimeline = './assets/timeline-end.svg';
	fetch(endTimeline).then((e) => e.text()).then((svgData) => addTimelineEnd(svgData));
}

// Margin left added as an inline style to the end element

function addTimelineEnd(svgData) {
	timelineContainer.innerHTML += svgData;
}
