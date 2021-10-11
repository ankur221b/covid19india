import {
	DistrictWise,
	SortStatewise,
	putIcon,
	PutComma,
	removeIcon,
	Mapping,
	putDelta,
} from './utility.js';

import plotGraph from './plot.js';

const URL = 'https://data.covid19india.org/state_district_wise.json';
document.querySelector('.home').href = window.location.origin;

const state = document.querySelector('.title').innerHTML;
document.querySelector('title').innerHTML = `${state} COVID-19 Data`;

var response = fetch(URL).then((response) => response.json());

var data = [];
var totalActive = 0;
var totalDeceased = 0;
var totalRecovered = 0;
var totalConfirmed = 0;

response.then(function (response) {
	let tmp = Object.values(response[state])[0];

	for (let district in tmp) {
		tmp[district].name = district;
		data.push(tmp[district]);
	}

	for (let district in data) {
		totalConfirmed += data[district].confirmed;
		totalActive += data[district].active;
		totalDeceased += data[district].deceased;
		totalRecovered += data[district].recovered;
	}

	var ConfirmedElement = document.querySelector('.isConfirmed');
	ConfirmedElement.innerHTML = PutComma(totalConfirmed);

	var ActiveElement = document.querySelector('.isActive');
	ActiveElement.innerHTML = PutComma(totalActive);

	var RecoveredElement = document.querySelector('.isRecovered');
	RecoveredElement.innerHTML = PutComma(totalRecovered);

	var DeceasedElement = document.querySelector('.isDeceased');
	DeceasedElement.innerHTML = PutComma(totalDeceased);
});

var buttonlist = [];
buttonlist.push(document.querySelector('.confirmeddata'));
buttonlist.push(document.querySelector('.activedata'));
buttonlist.push(document.querySelector('.recovereddata'));
buttonlist.push(document.querySelector('.deceaseddata'));

for (let button of buttonlist) {
	button.addEventListener('click', function (e) {
		let list = button.classList;

		let attribute = list[0].replace('data', '');

		if (list.contains('changed')) {
			if (list.contains('ascending')) {
				button.classList.remove('ascending');
				button.classList.add('descending');
			} else {
				button.classList.add('ascending');
				button.classList.remove('descending');
			}
		} else {
			button.classList.add('changed');
			button.classList.add('ascending');
		}

		if (list.contains('ascending')) {
			SortStatewise(attribute, 1, data);
			DistrictWise(response, data);
			removeIcon();
			putIcon(attribute, 1);
		} else {
			SortStatewise(attribute, -1, data);
			DistrictWise(response, data);
			removeIcon();
			putIcon(attribute, -1);
		}
	});
}

DistrictWise(response, data);

response = fetch('https://data.covid19india.org/v4/timeseries.json');
response = response.then((response) => response.json());

response.then((response) => {
	let dates = [];
	let confirmed = [];
	let active = [];
	let recovered = [];
	let deceased = [];
	dates = Object.keys(response[Mapping(state)].dates);
	let data = Object.values(response[Mapping(state)].dates);

	for (let date of data) {
		if (!date.delta) continue;

		confirmed.push(date.delta.confirmed);
		recovered.push(date.delta.recovered);
		deceased.push(date.delta.deceased || 0);
		active.push(
			date.delta.confirmed -
				date.delta.recovered -
				(date.delta.deceased || 0)
		);
	}
	confirmed = confirmed.slice(confirmed.length - 20);
	active = active.slice(active.length - 20);
	recovered = recovered.slice(recovered.length - 20);
	deceased = deceased.slice(deceased.length - 20);
	dates = dates.slice(dates.length - 20);

	putDelta('confirm', confirmed[confirmed.length - 1]);
	putDelta('Deceased', deceased[deceased.length - 1]);
	putDelta('Recovered', recovered[recovered.length - 1]);
	putDelta('Active', active[active.length - 1]);

	plotGraph(confirmed, active, deceased, recovered, dates);
});
