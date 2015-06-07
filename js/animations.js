$(document).ready(function() {

	$('.forecast-box').mouseenter(function() {
		console.log('zoom in');
		$(this).css({ 'font-size' : '1.5em' });
	}).mouseleave(function() {
		console.log('zoom out');
		$(this).css({ 'font-size' : '1em' });
	})

});