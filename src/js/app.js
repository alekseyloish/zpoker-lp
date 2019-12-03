import './vendor/jquery-global.js';
import AOS from 'aos';

//import LazyLoad from 'vanilla-lazyload';
//import select2 from 'select2';
//import moment from 'moment';
//import daterangepicker from 'daterangepicker';
//import Cleave from 'cleave.js';
//import Tooltipster from 'tooltipster';
 
//select2($);


$(document).ready(function () {

	$('#subscribe_submit').on('click', function (e) {
		/*e.preventDefault();

		var email = $('#subscriber_email').val();
		var formData = $('.subscribe-form').serializeArray();

		console.log( formData );

		if ( email !== '' ) {

			$.ajax({
				type: 'POST',
				url: 'http://api.zpoker.uk/public/pre_sign_up',
				data: formData,
				crossDomain: true,
				dataType: 'jsonp',
				success: function(data) {
					console.log(data);
				},
				failure: function(errMsg) {
					console.log(errMsg);
				}
			});

		} else {
			console.log('Email field is empty!');
		}*/

	});

});

$(window).on('load', function (){

    AOS.init();

});