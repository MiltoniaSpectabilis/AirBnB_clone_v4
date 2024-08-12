$(document).ready(function() {
	const amenities = {};

	$('input[type="checkbox"]').change(function() {
		if (this.checked) {
			amenities[$(this).data('id')] = $(this).data('name');
		} else {
			delete amenities[$(this).data('id')];
		}

		const amenitiesList = Object.values(amenities).join(', ');
		$('.amenities h4').text(amenitiesList);
	});

	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/status/',
		type: 'GET',
		success: function(response) {
			if (response.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		},
		error: function() {
			$('#api_status').removeClass('available');
		}
	});

	function fetchPlaces(amenityIds = []) {
		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ amenities: amenityIds }),
			success: function(places) {
				$('section.places').empty();
				for (let place of places) {
					const article = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>
                    `;
					$('section.places').append(article);
				}
			},
			error: function(error) {
				console.log('Error fetching places:', error);
			}
		});
	}

	fetchPlaces(); // Initial fetch of all places

	$('button').click(function() {
		const amenityIds = Object.keys(amenities);
		fetchPlaces(amenityIds);
	});
});
