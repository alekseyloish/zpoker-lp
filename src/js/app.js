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

    (function($){
        $.fn.serializeObject = function(){

            var self = this,
                json = {},
                push_counters = {},
                patterns = {
                    "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                    "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                    "push":     /^$/,
                    "fixed":    /^\d+$/,
                    "named":    /^[a-zA-Z0-9_]+$/
                };


            this.build = function(base, key, value){
                base[key] = value;
                return base;
            };

            this.push_counter = function(key){
                if(push_counters[key] === undefined){
                    push_counters[key] = 0;
                }
                return push_counters[key]++;
            };

            $.each($(this).serializeArray(), function(){

                // Skip invalid keys
                if(!patterns.validate.test(this.name)){
                    return;
                }

                var k,
                    keys = this.name.match(patterns.key),
                    merge = this.value,
                    reverse_key = this.name;

                while((k = keys.pop()) !== undefined){

                    // Adjust reverse_key
                    reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                    // Push
                    if(k.match(patterns.push)){
                        merge = self.build([], self.push_counter(reverse_key), merge);
                    }

                    // Fixed
                    else if(k.match(patterns.fixed)){
                        merge = self.build([], k, merge);
                    }

                    // Named
                    else if(k.match(patterns.named)){
                        merge = self.build({}, k, merge);
                    }
                }

                json = $.extend(true, json, merge);
            });

            return json;
        };
    })(jQuery);

	$('#subscribe_submit').on('click', function (e) {
		e.preventDefault();

		let email = $('#subscriber_email').val();
		//var formData = $('.subscribe-form').serializeArray();
		let formData = $('.subscribe-form').serializeObject();

		console.log( formData );

		if ( email !== '' ) {

			$.ajax({
				type: 'POST',
				url: 'api.zpoker.uk/public/pre_sign_up',
				data: formData,
				// crossDomain: true,
				dataType: 'json',
				success: function(data) {
					console.log(data);
				},
				failure: function(errMsg) {
					console.log(errMsg);
				}
			});

		} else {
			console.log('Email field is empty!');
			$('.subscribe-form__input').addClass('error');

			setTimeout(function () {
                $('.subscribe-form__input').removeClass('error');
            }, 1000);
		}

	});

});

$(window).on('load', function (){

    AOS.init();

});