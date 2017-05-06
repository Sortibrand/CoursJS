$(document).ready( function(){

	$('#menu_button').click( function(){
		showMenu( true );
	});

	//Para la imagen ajustable
	$(window).resize( function(){
		resizeImage();
	});

	resizeImage();

	setTimeout( function(){

		resizeImage();
	}, 500);
	//


	//Movimiento del carousel
	$('#main-carousel-indicator span').click( function(){
		var position = 0;

		position = $('#main-carousel-indicator span').index( $(this) );

		moveCarousel ( position );
		clearInterval( startAnimation );
	});

	var increment = 0;
	var startAnimation = setInterval( function() {
		var limit = $('#carousel .main_block').length;

		increment++;

				if ( increment > limit ) {
					increment = 0;
				}

		moveCarousel( increment );

	}, 2000);
	//

	//Efecto Parallax
	jQuery('.parallax_img').parallax();

});

function showMenu ( estado ) {
	var menu = $('#menu');

	if ( estado ) {
		menu.animate({
			'left': '0',
		});
	} else {
		menu.animate({
			'left': '-320px',
		});

	}
}


function resizeImage() {
	$('img[ajustable]').each( function(){
		var imgWidth = parseInt( $(this).get(0).naturalWidth );
		var imgHeight = parseInt( $(this).get(0).naturalHeight );
		var width = parseInt( $(this).parent().outerWidth() );
		var height = parseInt( $(this).parent().outerHeight() );

		var proporcion = width / height; 
		var imgProporcion = imgWidth / imgHeight;

			if ( imgProporcion > proporcion ) {
				$(this).addClass('h_100').removeClass('w_100');
			} else {
				$(this).addClass('w_100').removeClass('h_100');
			}

	});


}

function moveCarousel( position )  {
	var carousel = $('#carousel');
	var elemento = carousel.find( '.main_block' ).eq( position );
	var indicator =  $('#main-carousel-indicator i.indicator');

	carousel.animate({
		'left': -elemento.position().left,
	});

	indicator.animate({
		'left': $('#main-carousel-indicator span').eq( position ).position().left, 
	});
}

function hideSearchbar( estado ){
	if ( estado ) {
		$('#search-bar').fadeIn();
	} else {

		$('#search-bar').fadeOut();
	}
	
}

//Cerrar Popup
function popup( estado, id_popup ) {
	 if ( estado ) {
	 	$(id_popup).fadeIn();
	 } else {
	 	$(id_popup).fadeOut();
	 }

}


//Plugin con Jquery
(function($) {
	$.fn.parallax = function() {
		return this.each(function() {
			var _this = $(this);
			var offset_top = _this.offset().top;
			var parent_offset_top = _this.parent().offset().top;
			var parent_height = _this.parent().outerHeight();
			var window_height = $(window).height();
			var elem_size = $(window).height();

				if ( parent_height > $(window).height() - 100 ) {
					elem_size = parseFloat(parent_height) * 1.15;
				}

			var diference = elem_size - parent_height;	

			_this.parent().css({
				'position': 'relative',
				'overflow': 'hidden',
			});

			_this.css({
				'height': elem_size,
				'position': 'absolute',
				'top': -(diference/2),
			});

			var min_top = parent_offset_top - window_height;
			var max_top = (parent_offset_top + parent_height) + window_height;

			var x1=0, x2=0, y1=0, y2=0, y=0, m=0, x=0;

			y2 = -(diference/2);
			y1 = parent_height * 0.7;
			x2 = parent_offset_top - ((window_height - parent_height)/2);
			x1 = max_top;

			m = (y2 - y1)/(x2 - x1);

			$(window).scroll( function(){
				x = $(window).scrollTop();

				if ( x >= min_top && x <= max_top ) {
					y = (m * (x - x1) + y1);
					_this.css({
						'top': y,
					});	
				}
			});

		});
	}

})(jQuery);



