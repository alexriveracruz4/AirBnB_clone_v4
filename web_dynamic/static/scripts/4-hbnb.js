// Listen for changes on each input checkbox tag.
$(document).ready(function () {
  const api = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(api, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const p = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
  $.ajax({
    url: p,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    }
  });

  const amenityid = {};
  $("input[type='checkbox']").click(function () {
  // If the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list).
    if ($(this).is(':checked')) {
      amenityid[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // If the checkbox is unchecked, you must remove the Amenity ID from the variable.
      delete amenityid[$(this).attr('data-id')];
    }
    // Update the h4 tag inside the div Amenities with the list of Amenities checked.
    $('.amenities h4').text(Object.values(amenityid).join(', '));
  });

  $('button').click(function () {
    $.ajax({
	url: p,
	type: 'POST',
	headers: { 'Content-Type': 'application/json' },
	data: JSON.stringify({'amenities': Object.keys(amenityid)}),
	success:  function (response) {
	    $('SECTION.places').empty();
	    for (const r of response) {
		const article = ['<article>',
			'<div class="title_box">',
		`<h2>${r.name}</h2>`,
		`<div class="price_by_night">$${r.price_by_night}</div>`,
		'</div>',
		'<div class="information">',
		`<div class="max_guest">${r.max_guest} Guest(s)</div>`,
		`<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
		`<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
		'</div>',
		'<div class="description">',
		`${r.description}`,
		'</div>',
		'</article>'];
		$('SECTION.places').append(article.join(''));
	    }
	}
    });
  });
});
