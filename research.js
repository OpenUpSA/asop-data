function fetchRelations() {

	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const searchTerm = params.get('search'); // Output: search
	const years = params.getAll('years'); // Output: 2022,2023
	const categories = params.getAll('categories'); // Output: ['asdsa','dsqwewqw']
	const subjects = params.getAll('subjects'); // Output: ['asdsa','dsqwewqw']
	const countries = params.getAll('countries'); // Output: ['wdwd','qwwwwww']
	const types = params.getAll('types'); // Output: ['asdsa','dsqwewqw']
	const page = params.get('page'); // Output: 1

	[categoriesTable, subjectsTable, countriesTable, typesTable].forEach(table => {

		let field = table == categoriesTable ? 'Category' : table == subjectsTable ? 'Subject' : table == typesTable ? 'Type' : 'country';

		let sort = `?sort[0][field]=${field}&sort[0][order]=asc`;

		let showFilter = table == countriesTable ? '&filterByFormula={Show}' : '';

		fetch(aitable + table + sort + showFilter + '&pageSize=1000', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((data) => {

				let tableCol = table == categoriesTable ? 'Category' :
					table == subjectsTable ? 'Subject' :
						table == countriesTable ? 'country' :
							'Type';

				let select = table == categoriesTable ? '.categories_select' :
					table == subjectsTable ? '.subjects_select' :
						table == countriesTable ? '.countries_select' :
							'.types_select';

				let placeholder = table == categoriesTable ? 'Categories' :
					table == subjectsTable ? 'Subjects' :
						table == countriesTable ? 'Countries' :
							'Types';

				data.data.records.forEach(record => {

					let filterArr = table == categoriesTable ? categories :
						table == subjectsTable ? subjects :
							table == countriesTable ? countries :
								types;

					if (filterArr.includes(record.fields[tableCol])) {

						if (tableCol == 'Category') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}

						if (tableCol == 'Subject') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}

						if (tableCol == 'Type') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}

						$(select).append('<option value="' + record.fields[tableCol] + '" selected>' + record.fields[tableCol] + '</option>');
					} else {

						if (tableCol == 'Category') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}

						if (tableCol == 'Subject') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}

						if (tableCol == 'Type') {
							if (record.fields.Section == 'Education') {
								return;
							}
						}



						$(select).append('<option value="' + record.fields[tableCol] + '">' + record.fields[tableCol] + '</option>');
					}

				})

				$(select).select2({
					placeholder: "Select " + placeholder,
					allowClear: true
				});


			})
			.catch((error) => {
				console.error(error);
			});

	})

	if (searchTerm != '' && searchTerm != null) {
		$('.research-search-box').val(searchTerm);
	}

	let start = years.length > 0 ? years[0] : 2000;
	let end = years.length > 0 ? years[1] : 2023;

	$('.acc_year').append('<div id="slider" style="margin: 1em 0"></div>');
	$('.acc_year').append('<div class="year_range"><span class="year_range_start">' + start.toString() + '</span> - <span class="year_range_end">' + end.toString() + '</span></div>');

	setTimeout(function () {
		var slider = document.getElementById('slider');

		noUiSlider.create(slider, {
			start: [start, end],
			connect: true,
			range: {
				'min': 2000,
				'max': 2023
			},
			step: 1,

		});

		slider.noUiSlider.on('change.one', function () {


			let start = parseInt(slider.noUiSlider.get()[0]);
			let end = parseInt(slider.noUiSlider.get()[1]);

			resetPageNum();

			getFilters([start, end]);

			$('.year_range_start').text(start);
			$('.year_range_end').text(end);
		});


	}, 1000);
}

function getFilters(sliderYears = null) {

	let search = $('.research-search-box').val() || '';
	let categories = $('.categories_select').val() || [];
	let subjects = $('.subjects_select').val() || [];
	let types = $('.types_select').val() || [];
	let countries = $('.countries_select').val() || [];
	let page = $('.pagenum').val() || 1;
	let years = sliderYears;

	let queryParams = [];

	if (search) {
		queryParams.push(`search=${search}`);
	}

	categories.forEach(category => {
		queryParams.push(`categories=${category}`);
	});

	subjects.forEach(subject => {
		queryParams.push(`subjects=${subject}`);
	});

	types.forEach(type => {
		queryParams.push(`types=${type}`);
	});

	countries.forEach(country => {
		queryParams.push(`countries=${country}`);
	});

	if (years != null) {
		years.forEach(year => {
			queryParams.push(`years=${year}`);
		});
	}


	queryParams.push(`page=${page}`);

	let queryString = queryParams.length > 1 ? '?' + queryParams.join('&') : (queryParams.length === 1 ? '?' + queryParams[0] : '');

	if (queryString.length > 0) {
		history.pushState(null, null, queryString);
	} else {
		history.pushState(null, null, window.location.pathname);
	}

	fetchRecords();

}

function fetchRecords() {

	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const searchTerm = params.get('search'); // Output: search
	const years = params.getAll('years'); // Output: 2022,2023

	if (years.length > 0) {
		years[0] = new Date(years[0]).getTime();
		years[1] = new Date(years[1]).getTime();
	}

	const categories = params.getAll('categories'); // Output: ['asdsa','dsqwewqw']
	const subjects = params.getAll('subjects'); // Output: ['asdsa','dsqwewqw']
	const countries = params.getAll('countries'); // Output: ['wdwd','qwwwwww']
	const types = params.getAll('types'); // Output: ['asdsa','dsqwewqw']
	const page = params.get('page'); // Output: 1

	let countriesFilter = countries.length > 0 ?
		(countries.length > 1 ?
			`OR(${countries.map(country => `FIND(LOWER('${country}'), LOWER({Countries_Lookup})) > 0`).join(',')})` :
			`FIND(LOWER('${countries[0]}'), LOWER({Countries_Lookup})) > 0`
		) : '';

	let categoriesFilter = categories.length > 0 ?
		(categories.length > 1 ?
			`OR(${categories.map(category => `FIND(LOWER('${category}'), LOWER({Categories_Lookup})) > 0`).join(',')})` :
			`FIND(LOWER('${categories[0]}'), LOWER({Categories_Lookup})) > 0`
		) : '';

	let subjectsFilter = subjects.length > 0 ?
		(subjects.length > 1 ?
			`OR(${subjects.map(subject => `FIND(LOWER('${subject}'), LOWER({Subjects_Lookup})) > 0`).join(',')})` :
			`FIND(LOWER('${subjects[0]}'), LOWER({Subjects_Lookup})) > 0`
		) : '';

	let typesFilter = types.length > 0 ?
		(types.length > 1 ?
			`OR(${types.map(type => `FIND(LOWER('${type}'), LOWER({Types_Lookup})) > 0`).join(',')})` :
			`FIND(LOWER('${types[0]}'), LOWER({Types_Lookup})) > 0`
		) : '';

	let yearsFilter = years.length > 0 ? `AND({Year} >= ${years[0]}, {Year} <= ${years[1]})` : '';

	let searchFilter = (searchTerm != '' && searchTerm != null) ?
		`OR(
		FIND(LOWER('${searchTerm}'), LOWER({Title})),
		FIND(LOWER('${searchTerm}'), LOWER({Description})), 
		FIND(LOWER('${searchTerm}'), LOWER({Keywords_Lookup}))
	)` : '';

	let showFilter = '{Show}';

	let filters = [searchFilter, countriesFilter, categoriesFilter, subjectsFilter, typesFilter, showFilter, yearsFilter].filter(Boolean);

	// Constructing the filterByFormula part
	if (filters.length > 1) {
		queryString = '?filterByFormula=' + encodeURIComponent('AND(' + filters.join(', ') + ')');
	} else if (filters.length > 0) {
		queryString = '?filterByFormula=' + encodeURIComponent(filters.join(', '));
	}

	if (page) {
		queryString += queryString ? '&' : '?';
		queryString += 'pageNum=' + encodeURIComponent(page);
	}

	queryString += queryString ? '&' : '?';
	queryString += 'pageSize=20&sort[0][field]=Year&sort[0][order]=desc&sort[1][field]=Title&sort[1][order]=asc';

	let records = [];
	let pages = 1;
	let pageNum = 1;
	let pageSize = 100;
	let total = 0;

	fetch(aitable + recordsTable + queryString, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
		.then((data) => {

			records = data.data.records;
			total = data.data.total;
			pageNum = data.data.pageNum;
			pageSize = data.data.pageSize;
			pages = Math.ceil(total / pageSize);

			renderRecords(records);

			renderPagination(pages, pageNum);

			$('.research-count-count').text(total);

		})
		.catch((error) => {
			console.error(error);
		});

}


function renderRecords(records) {

	const $directoryItem = $('.directory_item').first().clone(true, true);
	const $subjectPill = $directoryItem.find('.research-subject');
	const $categoryPill = $directoryItem.find('.research-category');
	const $countryPill = $directoryItem.find('.research-country');

	$('.directory_list_live').html('');

	records.forEach(record => {

		let recordItem = $directoryItem.clone();
		recordItem.removeClass('hidden_item');
		recordItem.find('a.is--hover-red').attr('href', 'https://www.africaonlinesafety.com/research-view?id=' + record.recordId);
		recordItem.find('h2').text(record.fields.Title);
		recordItem.find('p').text(record.fields.Description);
		recordItem.find('.research-year').text(new Date(record.fields.Year).getFullYear());
		recordItem.find('.research-type').text(record.fields.Types_Lookup);
		recordItem.find('.research-access').text(record.fields.Access);

		if (record.fields.Types_Lookup[0] == 'Report') {
			recordItem.find('.research-type-img-report').removeClass('hidden_item');
		} else if (record.fields.Types_Lookup[0] == 'Book') {
			recordItem.find('.research-type-img-book').removeClass('hidden_item');
		} else if (record.fields.Types_Lookup[0] == 'Journal') {
			recordItem.find('.research-type-img-journal').removeClass('hidden_item');
		} else {
			recordItem.find('.research-type-img-news').removeClass('hidden_item');
		}

		recordItem.find('.countries-placeholder').html('');
		recordItem.find('.categories-placeholder').html('');
		recordItem.find('.subjects-placeholder').html('');

		/* Subjects */

		if (record.fields.Subjects_Lookup != undefined && record.fields.Subjects_Lookup.length > 0) {
			record.fields.Subjects_Lookup.forEach((sub, index) => {
				let subjectPill = $subjectPill.clone();
				subjectPill.text(sub);
				if (index < 1) {
					recordItem.find('.subjects-placeholder').append(subjectPill);
				}
			})
			if (record.fields.Subjects_Lookup.length > 1) {

				let moreSubjectsPill = $subjectPill.clone();
				let moreSubjects = [];

				record.fields.Subjects_Lookup.forEach((sub, index) => {
					if (index > 0) {
						moreSubjects.push('<div style="white-space:nowrap">' + sub + '</div>');
					}
				})

				moreSubjectsPill.html('<div>...</div><div class="more-items">' + moreSubjects.join('') + '</div>');
				recordItem.find('.subjects-placeholder').append(moreSubjectsPill);
			}
		}

		/* Categories */

		if (record.fields.Categories_Lookup != undefined && record.fields.Categories_Lookup.length > 0) {
			record.fields.Categories_Lookup.forEach((cat, index) => {
				let categoryPill = $categoryPill.clone();
				categoryPill.text(cat);
				if (index < 1) {
					recordItem.find('.categories-placeholder').append(categoryPill);
				}
			})
			if (record.fields.Categories_Lookup.length > 1) {

				let moreCategoriesPill = $categoryPill.clone();
				moreCategoriesPill.text('...');
				let moreCategories = [];

				record.fields.Categories_Lookup.forEach((cat, index) => {
					if (index > 0) {
						moreCategories.push('<div style="white-space:nowrap">' + cat + '</div>');
					}
				})

				moreCategoriesPill.html('<div>...</div><div class="more-items">' + moreCategories.join('') + '</div>');
				recordItem.find('.categories-placeholder').append(moreCategoriesPill);
			}
		}

		/* Countries */

		if (record.fields.Countries_Lookup != undefined && record.fields.Countries_Lookup.length > 0) {
			record.fields.Countries_Lookup.forEach((country, index) => {
				let countryPill = $countryPill.clone();
				countryPill.text(country);
				if (index < 1) {
					recordItem.find('.countries-placeholder').append(countryPill);
				}
			})
			if (record.fields.Countries_Lookup.length > 1) {

				let moreCountriesPill = $countryPill.clone();
				moreCountriesPill.text('...');
				let moreCountries = [];

				record.fields.Countries_Lookup.forEach((country, index) => {
					if (index > 0) {
						moreCountries.push('<div style="white-space:nowrap">' + country + '</div>');
					}
				})

				moreCountriesPill.html('<div>...</div><div class="more-items">' + moreCountries.join('') + '</div>');
				recordItem.find('.countries-placeholder').append(moreCountriesPill);
			}

		}

		if (record.fields.Keywords_Lookup != undefined && record.fields.Keywords_Lookup.length > 0) {

			let keywords = '';

			record.fields.Keywords_Lookup.forEach(kw => {
				keywords = keywords + kw + ', ';
			})

			keywords = keywords.replace(/,+$/, '');

			recordItem.find('.keywords').html('<strong>KEYWORDS:</strong> ' + keywords);

		}

		$('.directory_list_live').append(recordItem);
	});

}

function renderPagination(pages, pageNum) {
	let count = 1;

	$('.directory-pagination').html('');

	if (pageNum > 1) {
		$('.directory-pagination').append('<div class="page-button page-button-prev" data-pagenumber="' + (pageNum - 1) + '">Prev</div>');
	}
	while (count <= pages) {
		if (count == pageNum) {
			$('.directory-pagination').append('<div class="page-button active" data-pagenumber="' + count + '">' + count + '</div>');
		} else {
			$('.directory-pagination').append('<div class="page-button" data-pagenumber="' + count + '">' + count + '</div>');
		}
		count++;
	}
	if (pageNum < pages) {
		$('.directory-pagination').append('<div class="page-button page-button-next" data-pagenumber="' + (pageNum + 1) + '">Next</div>');
	}

	$('.directory-pagination').append('<input type="hidden" class="pagenum" value="' + pageNum + '">');

	$('html, body').animate({
		scrollTop: $('.research-count').offset().top - 100
	}, 500);

	$('.page-button').on('click', function () {
		let page = $(this).data('pagenumber');
		if (page != undefined) {
			$('.pagenum').val(page);
			getFilters();
		}
	})
}


function resetPageNum() {
	$('.pagenum').val(1);
}

$(document).ready(() => {
	

	fetchRelations();

	fetchRecords();

	let timeoutId;

	$('.research-search-box').on('keyup', function () {
		if ($(this).val().length == 0 || $(this).val().length > 3) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(getFilters, 1000);
		}
	});

	$('.acc_trigger').on('click', function () {
		$(this).parent().toggleClass('hidden');
		if ($(this).parent().hasClass('hidden')) {
			$('.acc_openclose', this).text('+');
		} else {
			$('.acc_openclose', this).text('-');
		}
	});

	$('.categories_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.subjects_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.types_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.countries_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.select2-selection__choice__remove').on('click', function () { resetPageNum(); getFilters(); });
})


