// Listen for changes on each input checkbox tag.
$(document).ready(function () {
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
});
