/* =======Solar Compass========= */

$(document).ready(function(){
	var init = function(){
 	        checkLogin();  //starts to see if login and password were entered, even if its cached.
 	        console.log("hello init");
    };
	// console.log("runing out of reasons for this not to work"+' '+loadLanding());
	function loadLanding(){
		$('#wrap').empty();
		$.get('templates/template.html',function(htmlArg){
			var land = $(htmlArg).find('#landing-template').html();
			$.template('landingtemplate', land);
			var landhtml = $.render('','landingtemplate');
			console.log("hello load land");			
			$('#wrap').append(landhtml);// adds landing to html coantainer
			jload();
			$('#submit_login').on('click', function(e) {
                e.preventDefault();
                login();// logs into application and ensure login
            });
            $('#submit_reg').on('click',function(e){
            	e.preventDefault();
            	reg();// adds new user to database if fields are filled correctly
            });
		});
	};
<!-- ===================================== jquery functions =================================== -->
	var jclass=function(){// adds class to make jquery work. hasnt work yet.
		$('#shortscript-Cont').addClass('accordion');
	};
	var jload=function(){
		$(function() {		
			$( ".accordion" ).accordion();
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
		}); //loads jquery scripts
	};
	var loadApp = function(){
		console.log("hello load app function");
        $('#wrap').empty();
        $.get('templates/template.html',function(htmlArg){
			var app = $(htmlArg).find('#app-template').html();
			$.template('apptemplate', app);
			var html= $.render('','apptemplate');
			console.log("load app");
			$('#wrap').append(html);// adds the template to the html container
            //logout button
            $('#logout').on('click', function(e){//activates a button for logging out.
                e.preventDefault();
                $.get('xhr/logout.php', function(){
                    loadLanding();// after log out loads landing
                });
            });

            jload();// loads the jquery ui scripts
            console.log("in the loadapp");
            pget();// 
            return false;
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
					loadApp();// if the login response is correct it loads this page
					console.log("in the check_login")
				}else{
					loadLanding();// if not returns the user to landing.
				};
			}
		});
	};
	function login(){// this is used when the button is submitted
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
				}
			}
		});
	};
	<!-- ==================== new user projects and tasks ======================== -->
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
	function newp(){
		var name=$('#pname').val();
		var due=$('#pdue').val();
		var desc=$('#pdesc').val();
		var start=$('#pstart').val();
		$.ajax({
			url:'xhr/new_project.php',
			data:{
				username:user,
				password:pass,
				email:email
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.newproject){

				};
			}
		})
	};
	<!-- ===================================== project function =================================== -->
	function pget(){
		console.log("pget call");
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
					console.log("here is the thing- "+response);
					loadProject(response.projects);
					jload();
				};
			}
		});
	};
	function taskGet(){
		console.log("task call");
		$.ajax({
			url: 'xhr/get_tasks.php',
			data: {
				projectID: "user"
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log( "in the if of taskget"+response);
				}else{
					console.log("here is the task thing- "+response);
					loadTasks(response.tasks);
					jload();
				};
			}
		});
	};
	<!-- =================================== proj template loads ================== -->
	function loadProject(prj){
		console.log("load prj");
		$('#shortscript-Cont, #longscript-Cont,#current,#edit-template').empty();
		$.get('templates/template.html',function(htmlArg){
			var shortprojct = $(htmlArg).find('#short-scriptTemp').html();
			$.template('shortscripttemplate', shortprojct);
			var projcthtml = $.render(prj,'shortscripttemplate');
			console.log("hello load short");			
			$('#shortscript-Cont').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#long-scriptTemp').html();
			$.template('longscripttemplate', projct);
			var projcthtml = $.render(prj,'longscripttemplate');
			console.log("hello load long");			
			$('.longscript-Cont').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#current').html();
			$.template('currenttemplate', projct);
			var projcthtml = $.render(prj,'currenttemplate');
			console.log("hello load current");			
			$('#current-select').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#edit-template').html();
			$.template('edittemplate', projct);
			var projcthtml = $.render(prj[0],'edittemplate');
			console.log("projedts?"+prj);			
			$('#edit').append(projcthtml);
			jclass();
		});
	};
	function loadTasks(prj){
		console.log("task entry");

	};
	jload();
	init();
});