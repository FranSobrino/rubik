var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$menu = $('nav.outer-nav')
		$iterate = $('div#pt-main'),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );
    
    setSectionMenu();
		
		$iterate.on( 'click', function() {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67 ) {
				animcursor = 1;
			}
			nextPage( animcursor );
			++animcursor;
		} );

	}

	function setSectionMenu() {
    var $sections =  $pages.filter('.pt-section')
    if ($sections){
     	$sections.each(function(){
     		var $link = $.parseHTML('<a class="link-section" data-target="'+ ($(this).data('slide')-1) +'">' + $(this).data('section') + '. ' + $(this).data('section-name') + '</a>')
     		$menu.append($link);
     	})
     	$menu.children('a').on('click', function () {
     			goToSlide($(this).data('target'));
     		})
    }

	}


	function nextPage(options, reverse ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );
		if(options.showPage !== undefined){
			if( options.showPage < pagesCount ) {
				current = options.showPage;
			}
			else {
				current = 0;
			}
		}
		else{
			if (reverse == true) {
				if( current > 0 ) {
					--current;
				}
				else {
					current = pagesCount - 1;
				}
			}
			else {
				if( current < pagesCount - 1 ) {
					++current;
				}
				else {
					current = 0;
				}
			}
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';
		switch( animation ) {
			case 1:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 2:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 3:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 4:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 5:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 6:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 7:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 8:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 9:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 10:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 11:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 12:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 13:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 14:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 15:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 16:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
		}
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		$('#section_indicator p').text($inpage.data('section'))

		if($('#pt-view').length > 0 && $('#speaker-notes').length > 0) {
			$('.notes[data-slide').each(function(){ 
				if (!$(this).hasClass("hide"))
					$(this).addClass('hide');
			})
			$('.notes[data-slide="'+ $inpage.data('slide') +'"]').removeClass('hide')
		}

		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}


	var nextSlide = function(){
	  nextPage(Math.floor((Math.random() * 10) + 1));
	} 

	var prevSlide = function(){
	  nextPage(Math.floor((Math.random() * 10) + 1),true);
	}

	var goToSlide = function(page_id){
	  nextPage({animation: Math.floor((Math.random() * 10) + 1), showPage: page_id});
	}

	init();

	return { 
		init : init,
		nextSlide : nextSlide,
		prevSlide : prevSlide,
		goToSlide : goToSlide
	};

})();