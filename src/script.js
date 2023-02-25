import plotGraph from './plot.js';
import {
	StateWise,
	SortStatewise,
	putIcon,
	removeIcon,
	PutComma,
	searchResult,
	putDelta,
} from './utility.js';

// document.querySelector('.home').href = window.location.origin;

// fetch statewise data from api
var url = 'https://data.covid19india.org/state_district_wise.json';

var stateResponse = fetch(url).then((response) => response.json());

class District {
	constructor(name, active, deceased, recovered) {
		this.name = name;
		this.active = active;
		this.deceased = deceased;
		this.recovered = recovered;
	}
}

class State {
	constructor(name, active, deceased, recovered, districts) {
		this.name = name;
		this.active = active;
		this.deceased = deceased;
		this.recovered = recovered;
		this.confirm = this.active + this.deceased + this.recovered;
		this.districts = districts;
	}
}

var data = [];
var totalActive = 0;
var totalDeceased = 0;
var totalRecovered = 0;
var totalConfirmed = 0;

// creating list of state objects
stateResponse.then(function (response) {
	for (let state in response) {
		if (state == 'State Unassigned') continue;

		let active = 0;
		let deceased = 0;
		let recovered = 0;

		let obj = Object.create(null);

		for (let current in response[state].districtData) {
			let curr_active = response[state].districtData[current].active;
			let curr_deceased = response[state].districtData[current].deceased;
			let curr_recovered =
				response[state].districtData[current].recovered;

			let currDistrict = new District(
				current,
				curr_active,
				curr_deceased,
				curr_recovered
			);

			active += curr_active;
			deceased += curr_deceased;
			recovered += curr_recovered;

			obj[current] = currDistrict;
		}

		let currState = new State(state, active, deceased, recovered, obj);
		data.push(currState);

		totalActive += active;
		totalDeceased += deceased;
		totalRecovered += recovered;
	}

	totalConfirmed = totalDeceased + totalActive + totalRecovered;

	var ConfirmedElement = document.querySelector('.isConfirmed');
	ConfirmedElement.innerHTML = PutComma(totalConfirmed);

	var ActiveElement = document.querySelector('.isActive');
	ActiveElement.innerHTML = PutComma(totalActive);

	var RecoveredElement = document.querySelector('.isRecovered');
	RecoveredElement.innerHTML = PutComma(totalRecovered);

	var DeceasedElement = document.querySelector('.isDeceased');
	DeceasedElement.innerHTML = PutComma(totalDeceased);
});

// time series data
url = 'https://data.covid19india.org/data.json';

let response = fetch(url).then((response) => response.json());

//preparing data for graph
response.then(function (response) {
	let confirm = [];
	let active = [];
	let deceased = [];
	let recovered = [];
	let date = [];

	let data = response['cases_time_series'];
	for (let index in data) {
		confirm.push(data[index].dailyconfirmed);
		deceased.push(data[index].dailydeceased);
		recovered.push(data[index].dailyrecovered);
		active.push(
			confirm[confirm.length - 1] -
				deceased[deceased.length - 1] -
				recovered[recovered.length - 1]
		);
	}

	for (let index in data) {
		date.push(data[index].date);
	}

	confirm = confirm.slice(confirm.length - 20);
	active = active.slice(active.length - 20);
	deceased = deceased.slice(deceased.length - 20);
	recovered = recovered.slice(recovered.length - 20);
	date = date.slice(date.length - 20);

	putDelta('confirm', confirm[confirm.length - 1]);
	putDelta('Deceased', deceased[deceased.length - 1]);
	putDelta('Recovered', recovered[recovered.length - 1]);
	putDelta('Active', active[active.length - 1]);

	plotGraph(confirm, active, deceased, recovered, date);
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
			StateWise(stateResponse, data);
			removeIcon();
			putIcon(attribute, 1);
		} else {
			SortStatewise(attribute, -1, data);
			StateWise(stateResponse, data);
			removeIcon();
			putIcon(attribute, -1);
		}
	});
}

StateWise(stateResponse, data);

var searchBox = document.querySelector('.form-control');
searchBox.addEventListener('input', search);
searchBox.addEventListener('keydown', search);
searchBox.addEventListener('search', (e) => {
	e.preventDefault();
});

function search(e) {
	let query = e.target.value;

	var SearchElement = document.querySelector('.navbar');

	if (query == '') {
		let child = SearchElement.lastElementChild;

		while (SearchElement.childElementCount > 1) {
			SearchElement.removeChild(child);
			child = SearchElement.lastElementChild;
		}
		return;
	}
	let results = searchResult(query.toLowerCase(), data);

	var child = SearchElement.lastElementChild;

	while (SearchElement.childElementCount > 1) {
		SearchElement.removeChild(child);
		child = SearchElement.lastElementChild;
	}
	for (let result of results) {
		SearchElement.appendChild(result);
	}
}
