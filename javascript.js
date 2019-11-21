let timelineContainer = document.querySelector("#timeline-container");
let timelineSVGLink = "./assets/NEWtimeline.svg";

let hyperjump = false;

fetch(timelineSVGLink)
  .then(e => e.text())
  .then(svgData => appendSvgData(svgData));

function appendSvgData(svgData) {
  timelineContainer.innerHTML += svgData;
}

// Useful ids for timeline:
// #parent-container for the container
// #start-point for the bigger circle ( ellipse 1 + ellipse 2)
// #data-point for the smaller circle ( ellipse 3 + ellipse 4)
// #timeline-svg for the timeline svg
// .fallingStar for moving star circle

let dataPointsLink = "./data-points.json";
let yearsArray = [];
let futureYearsArray = [];
let totalYearsArray = [];
let yDataPointsArray = [450];
let yFutureDataPointsArray = [2450];
let yTotalDataPointsArray = [];
let globalDataEvents = [];
let bigGaps = [];

fetch(dataPointsLink)
  .then(e => e.json())
  .then(dataEvents => showDataEvents(dataEvents));

function showDataEvents(dataEvents) {
  globalDataEvents = dataEvents;
  let keys = Object.keys(dataEvents[0]);
  let lengthObject = keys.length;
  for (let i = 0; i < lengthObject; i++) {
    if (dataEvents[0][keys[i]]["time"] == "Past") {
      yearsArray.push(dataEvents[0][keys[i]]["year-of-discovery"]);
    } else {
      futureYearsArray.push(dataEvents[0][keys[i]]["year-of-discovery"]);
    }
  }

  populateTimeline();
}

// 1 year = 40;
// y = 450 data-point start

function populateTimeline() {
  let dataPoint = document.querySelector("#data-point");
  let parentContainer = document.querySelector("#parent-container");
  let lineLength;
  let startingYear = yearsArray[0];
  parseInt(startingYear);

  // Create data point circles and append them by year

  for (let i = 1; i < yearsArray.length; i++) {
    let currentYear = yearsArray[i];
    parseInt(currentYear);

    let yDistance = (currentYear - startingYear) * 40 + 498.5;

    yDataPointsArray.push(yDistance);

    let cloneDP = dataPoint.cloneNode(true);
    cloneDP
      .querySelector(".outer-circle")
      .setAttribute("transform", `matrix(1,0,0,1,918.5,${yDistance})`);
    cloneDP
      .querySelector(".inner-circle")
      .setAttribute("transform", `matrix(1,0,0,1,918.5,${yDistance})`);
    cloneDP.setAttribute("height", yDistance);
    parentContainer.appendChild(cloneDP);

    // Calculates total length of SVG

    lineLength = (currentYear - startingYear) * 40 + 498.5;
  }

  generateTimeline(lineLength);
}

// q: to run an npm package like lodash, underscore you are required
// to use parcel for them which makes some magic in the bg.
// if you upload them on github is it necessary to make your
// whole code go through something else in order for everything
// to fit or you can upload it just like that.

// Using throttle from underscore

function moveFallingStar() {
  window.addEventListener("scroll", _.throttle(changePosition, 100));
  let body = document.querySelector("body");

  function changePosition() {
    // https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array

    let goal = body.scrollTop;
    let closest = yTotalDataPointsArray.reduce(function(prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });

    setStarPosition(closest);
  }
}

function setStarPosition(closest) {
  document
    .querySelector(".fallingStar")
    .setAttribute("transform", "matrix(1,0,0,1,918.5," + (closest + 130) + ")");
}

function createYearsTimeline() {
  let yearsContainer = document.querySelector("#years-container");
  totalYearsArray = yearsArray.concat(futureYearsArray);

  for (let i = 0; i < totalYearsArray.length; i++) {
    let p = document.createElement("p");
    p.textContent = totalYearsArray[i];
    p.setAttribute("class", "yearParagraph");
    yearsContainer.appendChild(p);
  }
  positionYearsTimeline();
}

function positionYearsTimeline() {
  let yearsParagraphsArray = document.querySelectorAll(".yearParagraph");
  let lastVal = yDataPointsArray[yDataPointsArray.length - 1];

  for (let i = 0; i < yFutureDataPointsArray.length; i++) {
    yFutureDataPointsArray[i] += lastVal;
    yFutureDataPointsArray[i] -= 1970;
  }

  yTotalDataPointsArray = yDataPointsArray.concat(yFutureDataPointsArray);

  findBigGaps();

  for (let i = 0; i < yTotalDataPointsArray.length; i++) {
    yearsParagraphsArray[i].style.marginTop = yTotalDataPointsArray[i] + "px";
  }

  moveFallingStar();
}

function generateTimeline(lineLength) {
  document.querySelector("#timeline-svg").setAttribute("height", lineLength);
  document
    .querySelector("#timeline-svg")
    .setAttribute("viewBox", `0 0 84 ${lineLength}`);
  document.querySelector(".timeline-line").setAttribute("y2", lineLength);
  document.querySelector(".filter-line").setAttribute("height", lineLength);

  fetchFutureTimeline();
}

// add second half of timeline

function fetchFutureTimeline() {
  let futureTimelineSVGLink = "./assets/timeline-after2019.svg";
  fetch(futureTimelineSVGLink)
    .then(e => e.text())
    .then(svgData => addFutureTimeline(svgData));
}

function addFutureTimeline(svgData) {
  timelineContainer.innerHTML += svgData;
  populateFutureTimeline();
  fetchEndTimeline();
}

// #Repeat_Grid_1 for the first set of dashed lines
// #Repeat_Grid_2 for the second set of lines
// #future-data-point id for data point included in the future timeline
// #future-parent-container for the whole formation
// 1 year = 240;
// y = 2450 data-point start

function populateFutureTimeline() {
  // Same as with the past timeline

  let dataPoint = document.querySelector("#future-data-point");
  let parentContainer = document.querySelector("#future-parent-container");

  let startingYear = futureYearsArray[0];
  parseInt(startingYear);

  for (let i = 1; i < futureYearsArray.length; i++) {
    let currentYear = futureYearsArray[i];
    parseInt(currentYear);

    let yDistance = (currentYear - startingYear) * 240 + 2450;

    yFutureDataPointsArray.push(yDistance);

    let cloneDP = dataPoint.cloneNode(true);
    cloneDP
      .querySelector(".outer-circle")
      .setAttribute("transform", `matrix(1,0,0,1,918.5,${yDistance})`);
    cloneDP
      .querySelector(".inner-circle")
      .setAttribute("transform", `matrix(1,0,0,1,918.5,${yDistance})`);
    parentContainer.appendChild(cloneDP);
  }

  createYearsTimeline();
}

function fetchEndTimeline() {
  let endTimeline = "./assets/timeline-end.svg";
  fetch(endTimeline)
    .then(e => e.text())
    .then(svgData => addTimelineEnd(svgData));
}

// margin-left added as an inline style to the end element

function addTimelineEnd(svgData) {
  timelineContainer.innerHTML += svgData;
  addIconsTimeline();
}

function addIconsTimeline() {
  let parentContainer = document.querySelector("#svg-icons");

  // because it is an object you can go through it through object.keys

  let keys = Object.keys(globalDataEvents[0]);
  let lengthObject = keys.length;
  for (let i = 0; i < lengthObject; i++) {
    let theIcon = document.createElement("div");
    let nameOfIcon = globalDataEvents[0][keys[i]]["image-link"];
    fetch(`assets/svg-icons/${nameOfIcon}.svg`)
      .then(e => e.text())
      .then(svg => {
        theIcon.innerHTML = svg;
      });

    theIcon.setAttribute("class", "svg-icon");
    parentContainer.appendChild(theIcon);
  }
  positionIcons();
}

function positionIcons() {
  let icons = document.querySelectorAll(".svg-icon");

  for (let i = 0; i < yTotalDataPointsArray.length; i++) {
    icons[i].style.marginTop = yTotalDataPointsArray[i] + "px";
  }

  addEventsDP();
}

function addEventsDP() {
  let dataPoints = document.querySelectorAll(".general-data-point");
  let i = 0;
  dataPoints.forEach(el => {
    el.classList.add("dp-no" + i);
    i++;
  });
  dataPoints.forEach(el => {
    el.addEventListener("click", e => {
      // search for any previous instances open
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });

      document.querySelector("#three-line-svg") != undefined
        ? document.querySelector("#three-line-svg").remove()
        : console.log();

      // getBoundingClientRect gives you relative coords to the whole doc
      // let coordsClickedObj = event.target.getBoundingClientRect();

      let dpNo =
        event.target.parentElement.parentElement.parentElement.classList[1];
      dpNo = dpNo.slice(5);

      fetch(threeBranchLink)
        .then(e => e.text())
        .then(svgData => {
          let parentContainer = document.querySelector("#svg-info");
          parentContainer.innerHTML += svgData;
          positionSVGInfo(dpNo);
        });

      setTimeout(function() {
        let iAmTired = yDataPointsArray[dpNo] + 130;

        if (iAmTired) {
          document
            .querySelector(".fallingStar")
            .setAttribute(
              "transform",
              "matrix(1,0,0,1,918.5," + iAmTired + ")"
            );
        } else {
          iAmTired = yFutureDataPointsArray[dpNo - 13] + 130;
          let godamnstar = document.querySelector(".fallingStar");
          document
            .querySelector("#timeline-container > svg:nth-child(2)")
            .append(godamnstar);
          document
            .querySelector(".fallingStar")
            .setAttribute(
              "transform",
              "matrix(1,0,0,1,53," + (iAmTired - 17281) + ")"
            );
        }
      }, 600);
    });
  });
}

let threeBranchLink = "./assets/NEWESTconstelation.svg";

// #line-three-svg id for the group itself
// #three-line-svg for the whole svg selection

// difference between top-right infobox and line center y = 82 px
// difference between line center and bottom-left infobox x = 388 px

function positionSVGInfo(dpNo) {
  let svgBranch = document.querySelector("#three-line-svg");
  svgBranch.style.marginTop = yTotalDataPointsArray[dpNo] - 545 + "px";
  addInfoboxes(dpNo);
}

function addInfoboxes(dpNo) {
  let infoboxes = document.querySelector(".infoboxes");
  infoboxes.style.display = "block";
  let keys = Object.keys(globalDataEvents[0]);
  let titleEvent = globalDataEvents[0][keys[dpNo]]["events"];

  infoboxes.querySelector("h2").innerHTML = titleEvent;
  infoboxes.querySelector(".country-involved").textContent =
    globalDataEvents[0][keys[dpNo]]["country-organization"];
  infoboxes.querySelector(".memorable-contributors").textContent =
    globalDataEvents[0][keys[dpNo]]["memorable-contributors"];

  infoboxes.querySelector(".quick-fact").textContent =
    globalDataEvents[0][keys[dpNo]]["event-description"];

  infoboxes.style.marginTop = yTotalDataPointsArray[dpNo] - 435 + "px";
}

function findBigGaps() {
  for (let i = 0; i <= yTotalDataPointsArray.length; i++) {
    let gap = yTotalDataPointsArray[i + 1] - yTotalDataPointsArray[i];
    if (gap >= 2000) {
      bigGaps.push({
        startPoint: yTotalDataPointsArray[i],
        endPoint: yTotalDataPointsArray[i + 1]
      });
    }
  }
}

window.addEventListener("scroll", e => {
  let scroller = Math.round(window.scrollY);

  let shown = false;
  for (let i = 0; i < bigGaps.length; i++) {
    const gap = bigGaps[i];
    if (scroller > gap.startPoint && scroller < gap.endPoint - 900) {
      shown = true;
      document.querySelector("#start").addEventListener("click", e => {
        window.scrollTo(0, gap.endPoint);
        hyperjump = true;
        setTimeout(() => {
          hyperjump = false;
        }, 1200);
      });
    }
  }
  if (shown) {
    document.querySelector("#start").style.visibility = "visible";
    document.querySelector("#start").style.opacity = 1;
  } else {
    document.querySelector("#start").style.opacity = 0;
    document.querySelector("#start").style.visibility = "hidden";
  }
});
