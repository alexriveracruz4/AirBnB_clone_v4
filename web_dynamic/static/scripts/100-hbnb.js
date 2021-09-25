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

// Listen to changes on each input checkbox tag.
  const amenityid = {};
  $('.amenities .popover ul li input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityid[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityid[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityid).join(', '));
  });

  const stateDict = {};
  $('.locations .popover ul li h2 input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      stateDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete stateDict[$(this).attr('data-id')];
    }
    $('.locations h4').text(Object.values(stateDict).join(', '));
  });

  const cityDict = {}
  $('.locations .popover ul li ul li input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      cityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cityDict[$(this).attr('data-id')];
    }
    $('.locations h4').text(Object.values(cityDict).join(', '));
  });

// When button tag is clicked, a new POST request to places_search should be made.
  $('button').click(function () {
    $.ajax({
      url: p,
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ amenities: Object.keys(amenityid), states: Object.keys(stateDict), cities: Object.keys(cityDict) }),
      success: function (response) {
	$('').empty();
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
