// 背景遮盖
// var ModalEffects = (function() {
// 	function init() {
// 		// 友联
// 		var overlay = document.querySelector( '.md-overlay' );
// 		// 留言板
// 		var overlay_2 = document.querySelector('md-overlay_2');

// 		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

// 			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
// 				close = modal.querySelector( '.md-close' );

// 			function removeModal( hasPerspective ) {
// 				classie.remove( modal, 'md-show' );

// 				if( hasPerspective ) {
// 					classie.remove( document.documentElement, 'md-perspective' );
// 				}
// 			}

// 			function removeModalHandler() {
// 				removeModal( classie.has( el, 'md-setperspective' ) ); 
// 			}

// 			el.addEventListener( 'click', function( ev ) {
// 				classie.add( modal, 'md-show' );
// 				// 友联
// 				overlay.removeEventListener( 'click', removeModalHandler );
// 				overlay.addEventListener( 'click', removeModalHandler );
// 				// 留言板
// 				overlay_2.removeEventListener( 'click', removeModalHandler );
// 				overlay_2.addEventListener( 'click', removeModalHandler );


// 				if( classie.has( el, 'md-setperspective' ) ) {
// 					setTimeout( function() {
// 						classie.add( document.documentElement, 'md-perspective' );
// 					}, 25 );
// 				}
// 			});

// 			// close.addEventListener( 'click', function( ev ) {
// 			// 	ev.stopPropagation();
// 			// 	removeModalHandler();
// 			// });

// 		} );

// 	}

// 	init();

// })();