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
});
