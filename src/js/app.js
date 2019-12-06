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
		e.preventDefault();

		// General Email Regex (RFC 5322 Official Standard) (https://emailregex.com/)
		let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		let email = $('#subscriber_email').val();
        let formData = {};
        formData.email = email;

		if ( email !== '' && emailRegex.test(email) ) {

            $.ajax({
                type: 'POST',
                url: 'https://api.zpoker.uk/public/pre_sign_up',
                data: JSON.stringify(formData),
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                },
                failure: function (errMsg) {
                    // console.log(errMsg);
                }
            });

            $('.subscribe-form').addClass('success');

            setTimeout(function () {
                $('.form-msg_success').addClass('active');
            }, 600);

		} else {
			//$('.subscribe-form__input').addClass('error');
			$('.form-msg_error').addClass('active');

			// setTimeout(function () {
            //     $('.subscribe-form__input').removeClass('error');
            // }, 1000);
		}

	});

    $('.subscribe-form__input').on('keyup', function (e) {
        if ( $(this).val() !== '' ) {
            $('.form-msg_error').removeClass('active');
        }
    });

});

$(window).on('load', function (){

    AOS.init();

});