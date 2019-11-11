let timelineContainer = document.querySelector('#timeline-container');
let timelineSVGLink = './assets/timeline.svg';

fetch(timelineSVGLink).then((e) => e.text()).then((svgData) => appendSvgData(svgData));

function appendSvgData(svgData) {
	timelineContainer.innerHTML = svgData;
}

// Useful ids for timeline:
// #timeline-line for timeline itself
// #start-point for the bigger circle ( ellipse 1 + ellipse 2)
// #data-point for the smaller circle ( ellipse 3 + ellipse 4)

let dataPointsLink = './data-points.json';
let yearsArray = [];
fetch(dataPointsLink).then((e) => e.json()).then((dataEvents) => showDataEvents(dataEvents));

function showDataEvents(dataEvents) {
	let keys = Object.keys(dataEvents[0]);
	let lengthObject = keys.length;
	for (let i = 0; i < lengthObject; i++) {
		yearsArray.push(dataEvents[0][keys[i]]['year-of-discovery']);
	}
}
