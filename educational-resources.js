function fetchRelations() {

	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const searchTerm = params.get('search'); // Output: search
	const categories = params.getAll('categories'); // Output: ['asdsa','dsqwewqw']
	const subjects = params.getAll('subjects'); // Output: ['asdsa','dsqwewqw']
	const types = params.getAll('types'); // Output: ['asdsa','dsqwewqw']
	const page = params.get('page'); // Output: 1

	[categoriesTable, subjectsTable, typesTable].forEach(table => {

		let field = table == categoriesTable ? 'Category' : table == subjectsTable ? 'Subject' : 'Type';

		let sort = `?sort[0][field]=${field}&sort[0][order]=asc`;

		fetch(aitable + table + sort + '&pageSize=500', {
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
						'Type';

				let select = table == categoriesTable ? '.categories_select' :
					table == subjectsTable ? '.subjects_select' :
						'.types_select';

				let placeholder = table == categoriesTable ? 'Categories' :
					table == subjectsTable ? 'Subjects' :
						'Content Types';

				data.data.records.forEach(record => {

					let filterArr = table == categoriesTable ? categories :
						table == subjectsTable ? subjects : types;


					if (filterArr.includes(record.fields[tableCol])) {

						if (tableCol == 'Category') {
							if (record.fields.Section == 'Research') {
								return;
							}
						}

						if (tableCol == 'Subject') {
							if (record.fields.Section == 'Research') {
								return;
							}
						}

						if (tableCol == 'Type') {
							if (record.fields.Section == 'Research') {
								return;
							}
						}


						$(select).append('<option value="' + record.fields[tableCol] + '" selected>' + record.fields[tableCol] + '</option>');
					} else {

						if (tableCol == 'Category') {
							if (record.fields.Section == 'Research') {
								return;
							}
						}

						if (tableCol == 'Subject') {
							if (record.fields.Section == 'Research') {
								return;
							}
						}

						if (tableCol == 'Type') {
							if (record.fields.Section == 'Research') {
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
}

function getFilters() {
	let categories = $('.categories_select').val() || [];
	let subjects = $('.subjects_select').val() || [];
	let types = $('.types_select').val() || [];
	let page = $('.pagenum').val() || 1;

	let queryParams = [];

	categories.forEach(category => {
		queryParams.push(`categories=${category}`);
	});

	subjects.forEach(subject => {
		queryParams.push(`subjects=${subject}`);
	});

	types.forEach(type => {
		queryParams.push(`types=${type}`);
	});

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

	const categories = params.getAll('categories'); // Output: ['asdsa','dsqwewqw']
	const subjects = params.getAll('subjects'); // Output: ['asdsa','dsqwewqw']
	const types = params.getAll('types'); // Output: ['asdsa','dsqwewqw']
	const page = params.get('page'); // Output: 1



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



	let searchFilter = (searchTerm != '' && searchTerm != null) ? `find(LOWER('${searchTerm}'), LOWER({Title})) > 0` : '';

	let showFilter = '{Show}';

	let filters = [searchFilter, categoriesFilter, subjectsFilter, typesFilter, showFilter].filter(Boolean);

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

	fetch(aitable + educationalResourcesTable + queryString, {
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

			console.log(data);

			records = data.data.records;
			total = data.data.total;
			pageNum = data.data.pageNum;
			pageSize = data.data.pageSize;
			pages = Math.ceil(total / 20);

			renderRecords(records);

			renderPagination(pages, pageNum);



		})
		.catch((error) => {
			console.error(error);
		});

}


function renderRecords(records) {

	const $directoryItem = $('.educational-resource-item').first().clone(true, true);
	const $subjectPill = $('.educational-resource-item .research-subject').first().clone(true, true);
	const $categoryPill = $('.educational-resource-item .research-category').first().clone(true, true);
	const $typePill = $('.educational-resource-item .research-type').first().clone(true, true);

	$('.educational-resources-list').html('');

	records.forEach(record => {

		let recordItem = $directoryItem.clone();
		recordItem.removeClass('hidden_item');
		recordItem.find('a.is--hover-red').attr('href', 'https://www.africaonlinesafety.com/educational-resource-view?id=' + record.recordId);
		recordItem.find('h3').text(record.fields.Title);
		recordItem.find('.rl-text-style-small').text(record.fields.Description);

		recordItem.find('.item-meta').html('');

		if (record.fields.Types_Lookup != undefined && record.fields.Types_Lookup.length > 0) {
			record.fields.Types_Lookup.forEach(type => {
				let typePill = $typePill.clone();
				typePill.text(type);

				recordItem.find('.item-meta').append(typePill);
			})
		}


		if (record.fields.Categories_Lookup != undefined && record.fields.Categories_Lookup.length > 0) {
			record.fields.Categories_Lookup.forEach(cat => {
				let categoryPill = $categoryPill.clone();
				categoryPill.text(cat);

				recordItem.find('.item-meta').append(categoryPill);
			})
		}

		if (record.fields.Subjects_Lookup != undefined && record.fields.Subjects_Lookup.length > 0) {
			record.fields.Subjects_Lookup.forEach(sub => {
				let subjectPill = $subjectPill.clone();
				subjectPill.text(sub);

				recordItem.find('.item-meta').append(subjectPill);
			})
		}

		$('.educational-resources-list').append(recordItem);
	});

}

function renderPagination(pages, pageNum) {

	console.log(pages, pageNum);

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
		scrollTop: $('.w-form').offset().top - 100
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

	$('.categories_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.subjects_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.types_select').on('change', function () { resetPageNum(); getFilters(); });
	$('.select2-selection__choice__remove').on('click', function () { resetPageNum(); getFilters(); });
})