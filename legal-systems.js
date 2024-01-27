const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const country = params.get('country');
const countries = [
	{
		"iso_code": "DZA",
		"iso2": "DZ",
		"location": "Algeria"
	},
	{
		"iso_code": "AGO",
		"iso2": "AO",
		"location": "Angola"
	},
	{
		"iso_code": "BEN",
		"iso2": "BJ",
		"location": "Benin"
	},
	{
		"iso_code": "BWA",
		"iso2": "BW",
		"location": "Botswana"
	},
	{
		"iso_code": "BFA",
		"iso2": "BF",
		"location": "Burkina Faso"
	},
	{
		"iso_code": "BDI",
		"iso2": "BI",
		"location": "Burundi"
	},
	{
		"iso_code": "CMR",
		"iso2": "CM",
		"location": "Cameroon"
	},
	{
		"iso_code": "CPV",
		"iso2": "CV",
		"location": "Cape Verde"
	},
	{
		"iso_code": "CAF",
		"iso2": "CF",
		"location": "Central African Republic"
	},
	{
		"iso_code": "TCD",
		"iso2": "TD",
		"location": "Chad"
	},
	{
		"iso_code": "COM",
		"iso2": "KM",
		"location": "Comoros"
	},
	{
		"iso_code": "COG",
		"iso2": "CG",
		"location": "Congo"
	},
	{
		"iso_code": "CIV",
		"iso2": "CI",
		"location": "Cote d'Ivoire"
	},
	{
		"iso_code": "COD",
		"iso2": "CD",
		"location": "Democratic Republic of Congo"
	},
	{
		"iso_code": "DJI",
		"iso2": "DJ",
		"location": "Djibouti"
	},
	{
		"iso_code": "EGY",
		"iso2": "EG",
		"location": "Egypt"
	},
	{
		"iso_code": "GNQ",
		"iso2": "GQ",
		"location": "Equatorial Guinea"
	},
	{
		"iso_code": "ERI",
		"iso2": "ER",
		"location": "Eritrea"
	},
	{
		"iso_code": "SWZ",
		"iso2": "SZ",
		"location": "Eswatini"
	},
	{
		"iso_code": "ETH",
		"iso2": "ET",
		"location": "Ethiopia"
	},
	{
		"iso_code": "GAB",
		"iso2": "GA",
		"location": "Gabon"
	},
	{
		"iso_code": "GMB",
		"iso2": "GM",
		"location": "Gambia"
	},
	{
		"iso_code": "GHA",
		"iso2": "GH",
		"location": "Ghana"
	},
	{
		"iso_code": "GIN",
		"iso2": "GN",
		"location": "Guinea"
	},
	{
		"iso_code": "GNB",
		"iso2": "GW",
		"location": "Guinea-Bissau"
	},
	{
		"iso_code": "KEN",
		"iso2": "KE",
		"location": "Kenya"
	},
	{
		"iso_code": "LSO",
		"iso2": "LS",
		"location": "Lesotho"
	},
	{
		"iso_code": "LBR",
		"iso2": "LR",
		"location": "Liberia"
	},
	{
		"iso_code": "LBY",
		"iso2": "LY",
		"location": "Libya"
	},
	{
		"iso_code": "MDG",
		"iso2": "MG",
		"location": "Madagascar"
	},
	{
		"iso_code": "MWI",
		"iso2": "MW",
		"location": "Malawi"
	},
	{
		"iso_code": "MLI",
		"iso2": "ML",
		"location": "Mali"
	},
	{
		"iso_code": "MRT",
		"iso2": "MR",
		"location": "Mauritania"
	},
	{
		"iso_code": "MUS",
		"iso2": "MU",
		"location": "Mauritius"
	},
	{
		"iso_code": "MAR",
		"iso2": "MA",
		"location": "Morocco"
	},
	{
		"iso_code": "MOZ",
		"iso2": "MZ",
		"location": "Mozambique"
	},
	{
		"iso_code": "NAM",
		"iso2": "NA",
		"location": "Namibia"
	},
	{
		"iso_code": "NER",
		"iso2": "NE",
		"location": "Niger"
	},
	{
		"iso_code": "NGA",
		"iso2": "NG",
		"location": "Nigeria"
	},
	{
		"iso_code": "RWA",
		"iso2": "RW",
		"location": "Rwanda"
	},
	{
		"iso_code": "STP",
		"iso2": "ST",
		"location": "Sao Tome and Principe"
	},
	{
		"iso_code": "SEN",
		"iso2": "SN",
		"location": "Senegal"
	},
	{
		"iso_code": "SYC",
		"iso2": "SC",
		"location": "Seychelles"
	},
	{
		"iso_code": "SLE",
		"iso2": "SL",
		"location": "Sierra Leone"
	},
	{
		"iso_code": "SOM",
		"iso2": "SO",
		"location": "Somalia"
	},
	{
		"iso_code": "ZAF",
		"iso2": "ZA",
		"location": "South Africa"
	},
	{
		"iso_code": "SSD",
		"iso2": "SS",
		"location": "South Sudan"
	},
	{
		"iso_code": "SDN",
		"iso2": "SD",
		"location": "Sudan"
	},
	{
		"iso_code": "TZA",
		"iso2": "TZ",
		"location": "Tanzania"
	},
	{
		"iso_code": "TGO",
		"iso2": "TG",
		"location": "Togo"
	},
	{
		"iso_code": "TUN",
		"iso2": "TN",
		"location": "Tunisia"
	},
	{
		"iso_code": "UGA",
		"iso2": "UG",
		"location": "Uganda"
	},
	{
		"iso_code": "ZMB",
		"iso2": "ZM",
		"location": "Zambia"
	},
	{
		"iso_code": "ZWE",
		"iso2": "ZW",
		"location": "Zimbabwe"
	}
];


$(document).ready(function () {

	let style = document.createElement('style');
	style.innerHTML = `
 		.country-select {
   			width: 100%;
      			padding: 0.5em;
	 		font-size: 18px;
    			border-radius: 5px;
       			color: #333;
	  		border: 1px solid #ccc;
     		}

       		.country-flag {
	 		max-width: 200px;
    			border-radius: 5px;
       			display: block;
	  		margin-bottom: 2em;
     			box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
		}

		.section-intro-par {
			margin: 1em 0 2em 0;
   			font-size: 1.1em;
      			text-align: justify;
		}

  		.section-intro-par li {
    			margin: 1em 0;
       			color: #666;
	  		text-align: justify;
      		}
 	`;


	document.getElementsByTagName('head')[0].appendChild(style);

	$('.country-select-wrapper').append('<select class="country-select"><option>Select A Country</option></select>');

	let searchTerms = document.location.search.split('&');

	let countrysearch = searchTerms.filter(term => term.includes('country='))[0];

	let country_url = countrysearch != undefined ? countrysearch.split('=')[1] : '';


	countries.forEach(country => {

		let selected = country_url == country.iso_code ? 'selected' : '';

		$('.country-select').append('<option value="' + country.iso_code + '" ' + selected + '>' + country.location + '</option>');
	})


	$('.country-select-wrapper').on('change', '.country-select', function () {

		const selectedCountry = $(this).val();

		const url = new URL(window.location);

		url.searchParams.set('country', selectedCountry);

		window.location.href = url.href;

	});

	if (country != '' && country != null) {

		let countryName = countries.find(c => c.iso_code === country)?.location;
		let iso2 = countries.find(c => c.iso_code === country)?.iso2;


		let promises = [];

		let tables = [
			lawsTable,
			descriptionsTable,
			internationalAgreementsTable,
			enforcementTable
		];

		let countriesFilter = `?filterByFormula=(FIND(LOWER('${country}'), LOWER({Country})) > 0)`;

		tables.forEach(table => {
			let promise = fetch(aitable + table + countriesFilter + '&pageSize=500', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				}
			})
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				});

			promises.push(promise);
		});

		Promise.all(promises).then(results => {
			let [laws, descriptions, internationalAgreements, enforcementAgencies] = results;

			let data = {
				laws: results[0],
				descriptions: results[1],
				internationalAgreements: results[2],
				enforcementAgencies: results[3]
			};

			console.log(data);

			$('.laws-country-info').prepend('<img class="country-flag" alt="' + countryName + '" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/' + iso2 + '.svg"/>');

			$('.laws-country-info h2').text(countryName);

			$('.laws-country-laws').removeClass('hidden_item');
			

			if (data.descriptions.data.records[0].fields.Laws != '' && data.descriptions.data.records[0].fields.Laws != undefined && data.descriptions.data.records[0].fields.Laws != null) {
				$('.laws').append('<div class="section-intro-par">' + converter.makeHtml(data.descriptions.data.records[0].fields.Laws) + '</div>');
			}

			if (data.descriptions.data.records[0].fields['International Agreements'] != '' && data.descriptions.data.records[0].fields['International Agreements'] != undefined && data.descriptions.data.records[0].fields['International Agreements'] != null) {
				$('.international-agreements').append('<div class="section-intro-par">' + converter.makeHtml(data.descriptions.data.records[0].fields['International Agreements']) + '</div>');
			}

			if (data.descriptions.data.records[0].fields['Enforcement Agencies'] != '' && data.descriptions.data.records[0].fields['Enforcement Agencies'] != undefined && data.descriptions.data.records[0].fields['Enforcement Agencies'] != null) {
				$('.enforcement-agencies').append('<div class="section-intro-par">' + converter.makeHtml(data.descriptions.data.records[0].fields['Enforcement Agencies']) + '</div>');
			}

			const $lawsItem = $('.laws_item_compact').first().clone(true, true);


			let lawsget = data.laws.data.records;
			lawsget.forEach(law => {

				let lawsItem = $lawsItem.clone();

				lawsItem.removeClass('hidden_item');
				if(law.fields.Link != undefined){
					lawsItem.find('a.is--hover-red').attr('href', law.fields.Link.text);
				}
				lawsItem.find('h2').text(law.fields.Legislation);
				if (law.fields.Description != '' && law.fields.Description != undefined && law.fields.Description != null) {
					lawsItem.find('.laws-description').text(law.fields.Description);
				} else {
					lawsItem.find('.laws-description').remove();
				}

				$('.laws').append(lawsItem);
			})

			let internationalAgreementsget = data.internationalAgreements.data.records;
			internationalAgreementsget.forEach(agreement => {

				let lawsItem = $lawsItem.clone();

				lawsItem.removeClass('hidden_item');
				if(agreement.fields.Link != undefined){
					lawsItem.find('a.is--hover-red').attr('href', agreement.fields.Link.text);
				}
				lawsItem.find('h2').text(agreement.fields.Agreement);
				if (agreement.fields.Description != '' && agreement.fields.Description != undefined && agreement.fields.Description != null) {
					lawsItem.find('.laws-description').text(agreement.fields.Description);
				} else {
					lawsItem.find('.laws-description').remove();
				}

				$('.international-agreements').append(lawsItem);
			})

			let enforcementAgenciesget = data.enforcementAgencies.data.records;
			enforcementAgenciesget.forEach(agency => {

				let enforcementItem = $lawsItem.clone();

				enforcementItem.removeClass('hidden_item');
				if(agencyfields.Link != undefined){
					enforcementItem.find('a.is--hover-red').attr('href', agency.fields.Link.text);
				}
				enforcementItem.find('h2').text(agency.fields.Agency);
				if (agency.fields.Description != '' && agency.fields.Description != undefined && agency.fields.Description != null) {
					enforcementItem.find('.laws-description').html(converter.makeHtml(agency.fields.Description));
				} else {
					enforcementItem.find('.laws-description').remove();
				}

				$('.enforcement-agencies').append(enforcementItem);
			})

			if (data.descriptions.data.records[0].fields['Reporting Process'] != '' && data.descriptions.data.records[0].fields['Reporting Process'] != undefined && data.descriptions.data.records[0].fields['Reporting Process'] != null) {
				$('.reporting-process').append('<div class="section-intro-par">' + converter.makeHtml(data.descriptions.data.records[0].fields['Reporting Process']) + '</div>');
			} else {
				$('.reporting-process').append('<div class="section-intro-par">How and where to report different types of cybercrime is currently being researched by the African Online Safety team. This page will be updated as new information is discovered</div>');
			}

		});

	}

})
