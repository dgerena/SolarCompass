/* =======Solar Compass========= */

$(document).ready(function(){
	var init = function(){
 	        checkLogin();
 	        // console.log("hello init");
    };
	// console.log("runing out of reasons for this not to work"+' '+loadLanding());
	function loadLanding(){
		$('#wrap').empty();
		$.get('templates/template.html',function(htmlArg){
			var land = $(htmlArg).find('#landing-template').html();
			$.template('landingtemplate', land);
			var landhtml = $.render('','landingtemplate');
			// console.log("hello load land");			
			$('#wrap').append(landhtml);
			jload();
			$('#submit_login').on('click', function(e) {
                e.preventDefault();
                login();
            });
            $('#submit_reg').on('click',function(e){
            	e.preventDefault();
            	reg();
            });
		});
	};
<!-- ===================================== jquery functions =================================== -->
	var jclass=function(){
		$('#shortscript-Cont').addClass('accordion');
	};
	var jload=function(){
		$(function() {		
			$( ".accordion" ).accordion({collapsible: true});
			$( "#button" ).button();
			$( "#radioset" ).buttonset();
			$( "#tabs" ).tabs();
			$( "#dialog" ).dialog({
				autoOpen: false,
				width: 400,
				buttons: [
					{
						text: "Ok",
						click: function() {
							$( this ).dialog( "close" );
						}
					},
					{
						text: "Cancel",
						click: function() {
							$( this ).dialog( "close" );
						}
					}
				]
			});
			// Link to open the dialog
			$( "#dialog-link" ).click(function( event ) {
				$( "#dialog" ).dialog( "open" );
				event.preventDefault();
			});
			$( "#datepicker" ).datepicker({
				inline: true
			});
			$( "#slider" ).slider({
				range: true,
				values: [ 17, 67 ]
			});
			$( "#progressbar" ).progressbar({
				value: 20
			});
			// Hover states on the static widgets
			$( "#dialog-link, #icons li" ).hover(
				function() {
					$( this ).addClass( "ui-state-hover" );
				},
				function() {
					$( this ).removeClass( "ui-state-hover" );
				}
			);
			 $(function() {
		    var icons = {
		      header: "ui-icon-circle-arrow-e",
		      activeHeader: "ui-icon-circle-arrow-s"
		    };
		    $( ".accordion" ).accordion({
		      icons: icons
		    });
		    $( "#toggle" ).button().click(function() {
		      if ( $( ".accordion" ).accordion( "option", "icons" ) ) {
		        $( ".accordion" ).accordion( "option", "icons", null );
		      } else {
		        $( ".accordion" ).accordion( "option", "icons", icons );
		      }
		    });
		  });
		});
	};
	var loadApp = function(){
		console.log("hello load app function");
        $('#wrap').empty();
        $.get('templates/template.html',function(htmlArg){
			var app = $(htmlArg).find('#app-template').html();
			$.template('apptemplate', app);
			var html= $.render('','apptemplate');
			console.log("load app");
			$('#wrap').append(html);
            //logout button
            $('#logout').on('click', function(e){
                e.preventDefault();
                $.get('xhr/logout.php', function(){
                    loadLanding();
                });
            });

            jload();
            return false;
            console.log("in the loadapp")
            pget();
        });
    };
	<!-- ===================================== login function =================================== -->
	var checkLogin = function(){
		$.ajax({
			url:'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.user){
					loadApp();
					console.log("in the check_login")
					pget();
				}else{
					loadLanding();
				};
			}
		});
	}
	function login(){
		console.log("login start");
		var username=$('#username').val();
		var pass =$('#password').val();
		$.ajax({
			url: 'xhr/login.php',
			data: {
				username: username,
				password: pass
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					showLoginError();
				}else{
					loadApp();
					console.log("in the login")
					pget();
				}
			}
		});
	};
	function reg(){
		var user=$('#userReg').val();
		var pass=$('.passReg').val();
		var email=$('.emailReg').val();
		$.ajax({
			url:'xhr/register.php',
			data:{
				username:user,
				password:pass,
				email:email
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					showLoginError();
				}else{
					loadApp();
					console.log("in the login")
				}
			}
		})
	};
	<!-- ===================================== project function =================================== -->
	function pget(){
		console.log("this is in the pget function")
		$.ajax({
			url: 'xhr/get_projects.php',
			data: {
				projectID: "user"
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log( "in the if of pget"+response);
				}else{
					loadProject(response.projects);
					jload();
				}
			}
		});
	};
	function loadProject(prj){
		$('#shortscript-Cont, longscript-Cont').empty();
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#short-scriptTemp').html();
			$.template('shortscripttemplate', projct);
			var projcthtml = $.render(prj,'shortscripttemplate');
			// console.log("hello load land");			
			$('#shortscript-Cont').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#longscript-Cont').html();
			$.template('longscripttemplate', projct);
			var projcthtml = $.render(prj,'longscripttemplate');
			// console.log("hello load land");			
			$('#longscript-Cont').append(projcthtml);
			jclass();
		});
	};
	jload();
	init();
});