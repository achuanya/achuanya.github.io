背景遮盖
var ModalEffects = (function() {
	function init() {
		// 留言板
		var overlay = document.querySelector( '.md-overlay' );
		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {
            
			el.addEventListener( 'click', function( ev ) {
                classie.add( modal, 'md-show' );
                // 留言板
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

			});

		});

	}

	init();

})();