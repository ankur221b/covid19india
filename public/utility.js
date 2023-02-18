// statewise data
export function StateWise(stateResponse, data) {
	stateResponse.then(function (response) {
		let element = document.querySelector('.container-statewise');

		var child = element.lastElementChild;
		while (element.childElementCount > 1) {
			element.removeChild(child);
			child = element.lastElementChild;
		}

		for (let state in data) {
			let wrapperElement = document.createElement('div');
			wrapperElement.className = 'wrapper-statewise';

			let element = document.createElement('div');
			element.className = 'statename';
			element.innerHTML = data[state].name;
			element.onclick = () =>
				(window.location.href = `/${data[state].name}`);
			wrapperElement.appendChild(element);

			let active = data[state].active;
			let deceased = data[state].deceased;
			let recovered = data[state].recovered;
			let confirm = active + deceased + recovered;

			element = document.createElement('div');
			element.className = 'confirmeddata';
			element.innerHTML = PutComma(confirm);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'activedata';
			element.innerHTML = PutComma(active);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'recovereddata';
			element.innerHTML = PutComma(recovered);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'deceaseddata';
			element.innerHTML = PutComma(deceased);
			wrapperElement.appendChild(element);

			let node = document.querySelector('.container-statewise');
			node.appendChild(wrapperElement);
		}
	});
}

export function SortStatewise(Key, x, data) {
	if (!(data[0][Key] >= 0)) Key = 'confirm';
	if (x == 1) {
		data.sort((a, b) => {
			return a[Key] - b[Key];
		});
	} else {
		data.sort((a, b) => {
			return b[Key] - a[Key];
		});
	}
}

export function putIcon(attribute, x) {
	let node;
	let element = document.createElement('i');

	if (x == 1) {
		element.classList.add('fas');
		element.classList.add('fa-sort-up');
	} else {
		element.classList.add('fas');
		element.classList.add('fa-sort-down');
	}
	if (attribute == 'confirmed')
		node = document.querySelector('.confirmeddata');
	else if (attribute == 'active')
		node = document.querySelector('.activedata');
	else if (attribute == 'recovered')
		node = document.querySelector('.recovereddata');
	else if (attribute == 'deceased')
		node = document.querySelector('.deceaseddata');

	node.appendChild(element);
}

export function removeIcon(attribute) {
	let nodelist = [];
	nodelist.push(document.querySelector('.confirmeddata'));
	nodelist.push(document.querySelector('.activedata'));
	nodelist.push(document.querySelector('.recovereddata'));
	nodelist.push(document.querySelector('.deceaseddata'));

	for (let node of nodelist) {
		var child = node.lastElementChild;
		while (node.childElementCount >= 1) {
			node.removeChild(child);
			child = node.lastElementChild;
		}
	}
}

export function DistrictWise(response, data) {
	response.then(function (response) {
		let element = document.querySelector('.container-statewise');

		var child = element.lastElementChild;
		while (element.childElementCount > 1) {
			element.removeChild(child);
			child = element.lastElementChild;
		}

		for (let district in data) {
			let wrapperElement = document.createElement('div');
			wrapperElement.className = 'wrapper-statewise';

			let element = document.createElement('div');
			element.className = 'statename';
			element.innerHTML = data[district].name;
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'confirmeddata';
			element.innerHTML = PutComma(data[district].confirmed);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'activedata';
			element.innerHTML = PutComma(data[district].active);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'recovereddata';
			element.innerHTML = PutComma(data[district].recovered);
			wrapperElement.appendChild(element);

			element = document.createElement('div');
			element.className = 'deceaseddata';
			element.innerHTML = PutComma(data[district].deceased);
			wrapperElement.appendChild(element);

			let node = document.querySelector('.container-statewise');
			node.appendChild(wrapperElement);
		}
	});
}

export function Mapping(state) {
	let response = fetch('https://api.covid19india.org/data.json', {
		mode: 'no-cors'
	  });
	response = response.then((response) => response.json());

	let map = {
		'Andaman and Nicobar Islands': 'AN',
		'Andhra Pradesh': 'AP',
		'Arunachal Pradesh': 'AR',
		Assam: 'AS',
		Bihar: 'BR',
		Chandigarh: 'CH',
		Chhattisgarh: 'CT',
		'Dadra and Nagar Haveli and Daman and Diu': 'DN',
		Delhi: 'DL',
		Goa: 'GA',
		Gujarat: 'GJ',
		Haryana: 'HR',
		'Himachal Pradesh': 'HP',
		'Jammu and Kashmir': 'JK',
		Jharkhand: 'JH',
		Karnataka: 'KA',
		Kerala: 'KL',
		Ladakh: 'LA',
		Lakshadweep: 'LD',
		'Madhya Pradesh': 'MP',
		Maharashtra: 'MH',
		Manipur: 'MN',
		Meghalaya: 'ML',
		Mizoram: 'MZ',
		Nagaland: 'NL',
		Odisha: 'OR',
		Puducherry: 'PY',
		Punjab: 'PB',
		Rajasthan: 'RJ',
		Sikkim: 'SK',
		'Tamil Nadu': 'TN',
		Telangana: 'TG',
		Tripura: 'TR',
		'Uttar Pradesh': 'UP',
		Uttarakhand: 'UT',
		'West Bengal': 'WB',
	};

	return map[state];
}

export function PutComma(number) {
	let num = [];
	number = number.toString();

	number = number.split('').reverse().join('');

	for (let i = 0; i < number.length; i++) {
		if (i == 1) {
			num.push(number[i]);
			continue;
		}
		if (i & 1) {
			num.push(',');
		}
		num.push(number[i]);
	}

	return num.reverse().join('');
}

export function searchResult(query, data) {
	const regex = RegExp(`^${query}`);
	let match = [];
	for (let state of data) {
		if (regex.test(state.name.toLowerCase())) {
			match.push({ district: null, state: state.name });
		}

		for (let district of Object.values(state.districts)) {
			if (regex.test(district.name.toLowerCase())) {
				match.push({ district: district.name, state: state.name });
			}
		}
	}

	match = match.slice(0, 4);

	return match.map((result) => {
		let wrapper = document.createElement('div');
		let element = document.createElement('div');
		wrapper.className = 'result-wrap';
		element.className = 'result';
		wrapper.onclick = () => (window.location.href = `/${result.state}`);

		if (result.district != null)
			element.innerHTML = `${result.district}, ${result.state}`;
		else element.innerHTML = `${result.state}`;
		wrapper.appendChild(element);
		return wrapper;
	});
}

export function putDelta(Class, data) {
	if (Class == 'confirm') Class = 'Confirmed';
	Class = '.delta' + Class;
	var element = document.querySelector(Class);
	element.innerHTML = '+' + PutComma(data);
	element.style.color = getComputedStyle(
		element.parentElement.firstElementChild
	).color;
}
