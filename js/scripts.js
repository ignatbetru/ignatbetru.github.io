$(document).ready(function(){
	
	$(".wrapper-tab .tab").click(function() {
		if(!$(this).hasClass('active')){
			$(this).closest(".wrapper-tab").find(".tab-item").hide().eq($(this).index()).fadeIn();
			$(this).closest(".wrapper-tab").find(".tab").removeClass("active");
			$(this).addClass("active");
		}
	});
	$('.form-icon input,.form-icon textarea').focus(function() {
 		$(this).closest('.form-icon').addClass('focused');
	});
	$('.form-icon input,.form-icon textarea').focusout(function() {
 		$(this).closest('.form-icon').removeClass('focused');
	});
	$('body').on('click','.touch-menu', function(){
		$('.wrapper-menu').fadeIn(100);
		$('.wrapper-overlay').fadeIn(100);	
	});
	$('.wrapper-menu__close,.wrapper-overlay,.wrapper-menu a').on('click', function(){
		$('.wrapper-menu').fadeOut(100);
		$('.wrapper-overlay').fadeOut(100);
	});
	$('.popup-handler').on('click', function(e){
		var popupId = $(this).attr('rel');
		$(popupId).fadeIn();
		$(popupId).find('.popup__window').addClass('popup__window_opened');
		$(popupId).addClass('popup__overlay_opened');
		e.preventDefault();
	});
	$('.popup-close-handler').on('click', function(){
		$('.popup').fadeOut();
		$('.popup__window').removeClass('popup__window_opened');
		$('.popup__overlay').removeClass('popup__overlay_opened');
	});
	$('.section-tabs button').on('click', function(){
		var fc_name = $(this).closest('.section-tabs').find('.tab.active').html();
		var fc_num = $(this).closest('.section-tabs__item').find('.section-tabs__head').html();
		var fc_price = $(this).closest('.section-tabs__item').find('.price-new').html();
		$('.popup-pay-priceinfo__1').html(fc_name);
		$('.popup-pay-priceinfo__2').html(fc_num);
		$('.popup-pay-priceinfo__3').html(fc_price);
	});
	$('.section-statistic__more button').on('click', function(){
		$(this).closest('.section-statistic__more').next('table').show();
		$(this).closest('.section-statistic__more').hide();
	});
	$(".filter-select :first").attr("selected", "selected");
	$('a[href^="#"]').click(function(){
		var el = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(el).offset().top}, 500);
		return false; 
	});
	/*$("[data-fancybox]").fancybox({
		afterShow: function() {
		var vid = $(".fancybox-stage .myVideo")[0];
			alert(vid);
		vid.play(); 
		  this.content.find('video').on('ended', function() {
		  $.fancybox.next();
		});
	  },
		beforeClose: function() {
		var vidPlay = $(".myVideo")[0];
		vidPlay.pause();
	  }
	});*/
	$("a.fancybox").fancybox({
		helpers: {
			overlay: {
				locked: false,
			}
		},
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'titlePosition' 	: 'over',
		'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
		    return '<span id="fancybox-title-over">Image ' +  (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '</span>';
		}
	});
	$('#form-page').submit(function(){
		var form = $(this);
		var error = false;
		form.find('input[name="your-name"],input[name="your-email"],textarea[name="your-message"]').each( function(){
			if ($(this).val() == '') {
				$(this).addClass('input-error');
				error = true;
			}
		});
		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: '../php/form-page.php',
			   dataType: 'json',
			   data: data,
			   beforeSend: function(data) {
					form.find('input[type="submit"]').attr('disabled', 'disabled');
				  },
			   success: function(data){
					if (data['error']) {
						alert(data['error']);
					}
				   alert('Ваше сообщение отправлено!');
				 },
			   error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				 },
			   complete: function(data) {
					form.find('input[type="submit"]').prop('disabled', false);
				 }

				 });
			$('input').removeClass('input-error');
		}
		return false;
	});
	$('#form-popup').submit(function(){
		var form = $(this);
		var error = false;
		form.find('input[name="your-email"],textarea[name="your-message"]').each( function(){
			if ($(this).val() == '') {
				$(this).addClass('input-error');
				error = true;
			}
		});
		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: '../php/form-popup.php',
			   dataType: 'json',
			   data: data,
			   beforeSend: function(data) {
					form.find('input[type="submit"]').attr('disabled', 'disabled');
				  },
			   success: function(data){
					if (data['error']) {
						alert(data['error']);
					}
				   alert('Ваше сообщение отправлено!');
				 },
			   error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				 },
			   complete: function(data) {
					form.find('input[type="submit"]').prop('disabled', false);
				 }

				 });
			$('input').removeClass('input-error');
		}
		return false;
	});
	$('.scrollup').click(function() {
		$("html, body").animate({
		  scrollTop:0
		},1000);
	  })
});
$(window).scroll(function() {
  if ($(this).scrollTop()>200) {
    $('.scrollup').fadeIn();
  }
  else {
    $('.scrollup').fadeOut();
  }
});




function showTable(elem){
	var popupId = elem.value;
	$('.section-statistic__table').hide();
	$('[rel='+popupId+']').show();
}