/* =======Solar Compass========= */

$(document).ready(function(){
	var init = function(){
 	    checkLogin();  //starts to see if login and password were entered, even if its cached.
 	    // console.log("hello init");
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
			entrybtns();
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
		// console.log("hello load app function");
        $('#wrap').empty();
        $.get('templates/template.html',function(htmlArg){
			var app = $(htmlArg).find('#app-template').html();
			$.template('apptemplate', app);
			var html= $.render('','apptemplate');
			// console.log("load app");
			$('#wrap').append(html);// adds the template to the html container
            //logout button
            $('#logout').on('click', function(e){//activates a button for logging out.
                e.preventDefault();
                $.get('xhr/logout.php', function(){
                    loadLanding();// after log out loads landing
                });
            });
            jload();// loads the jquery ui scripts
            // console.log("in the loadapp");
            pget();// 
        });
    };
    var loadTaskApp = function(pid){
		console.log("hello load app function");
		taskGet(pid);
    };
	<!-- ===================================== login function =================================== -->
	var entrybtns=function(){
		$('#login, #register').on('click', function(e){//activates a button for logging out.
            e.preventDefault();
        	loadForm();
		});
	};
	var checkLogin = function(){
		$.ajax({
			url:'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				if(response.user){
					console.log("in the check_login");
					loadApp();// if the login response is correct it loads this page
				}else{
										// console.log("in the check_login else"+response);

					loadLanding();// if not returns the user to landing.
				};
			}//end of object;
		});
	};
	function login(){// this is used when the button is submitted
		// console.log("login start");
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
					// console.log("in the login");
				};
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
					// console.log("in the reg")
				};
			}//end of object;
		})
	};

	<!-- ===================================== project function =================================== -->
	function pget(){
		// console.log("pget call");
		$.ajax({
			url: 'xhr/get_projects.php',
			data: {
				projectID: "user"
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					// console.log( "in the if of pget"+response);
				}else{
					// console.log("here is the thing- "+response.projects.id);
					loadProject(response.projects);
					jload();
				};
			}
		});
	};
	// var idcount
	// var resLoop =function({
	// 	for(var i = 0; i < response.projects.length-1; i++ ){
	// 		return i;
	// 	};
	// });

	function taskGet(pid){
		// console.log("task call");
		$.ajax({
			url: 'xhr/get_tasks.php',
			data: {
				projectID: pid
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					// console.log( "in the if of taskget"+response);
				}else{
					// console.log("here is the taskget- "+response);
					$('#wrap').empty();
			        $.get('templates/template.html',function(htmlArg){
						var app = $(htmlArg).find('#task-template').html();
						$.template('tasktemplate', app);
						var html= $.render(response.tasks,'tasktemplate');
						// console.log("load tasktemp");
						$('#wrap').append(html);// adds the template to the html container
			            //logout button
			            $('#logout').on('click', function(e){//activates a button for logging out.
			                e.preventDefault();
			                $.get('xhr/logout.php', function(){
			                    loadLanding();// after log out loads landing
			                });
			            });
			            $('.ptasks').on('click',function(e){
			            	loadApp();
			            });
						$('.task-new').on('click',function(e){
							// console.log('click in edit');
							newT(pid);
							loadApp();
						});

			            jload();// loads the jquery ui scripts
			            return false;
			        });
					jload();
				};
			}// end of object so no ;
		});
	};
	<!-- =================================== proj template loads ================== -->
	function loadProject(prj){
		// console.log("load prj");
		$('#shortscript-Cont, #longscript-Cont,#current,#edit-template').empty();
		$.get('templates/template.html',function(htmlArg){
			var shortprojct = $(htmlArg).find('#short-scriptTemp').html();
			$.template('shortscripttemplate', shortprojct);
			var projcthtml = $.render(prj,'shortscripttemplate');
			// console.log("hello load short");			
			$('#shortscript-Cont').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#long-scriptTemp').html();
			$.template('longscripttemplate', projct);
			var projcthtml = $.render(prj,'longscripttemplate');
			// console.log("hello load long");			
			$('.longscript-Cont').append(projcthtml);
			jclass();
		});
		$.get('templates/template.html',function(htmlArg){
			var projct = $(htmlArg).find('#current').html();
			$.template('currenttemplate', projct);
			var projcthtml = $.render(prj,'currenttemplate');
			// console.log("hello load current");			
			$('#current-select').append(projcthtml);
			editTemp(prj);
			$('.project').on('click', function(e){//activates a button for logging out.
            	console.log('click '+prj);
                $('#edit').empty();
            	e.preventDefault();
            	var current=$(this).attr('id');// p[asss this number into ajax to confimr what app the task belongs too.
            								  // i will need to use .atr(id)
            	$.get('templates/template.html',function(htmlArg){
					var projct = $(htmlArg).find('#edit-click-template').html();
					$.template('edittemplate', projct);
					var projcthtml = $.render(current[0],'edittemplate');
					console.log("projects? "+current[0]);
					$('#edit').append(projcthtml);
					jclass();
					$('#project-new').on('click',function(e){
						console.log('click in edit temp');
						newp();
						loadApp();
					})
				});
            	console.log("pid"+prj);
            });
			$('.taskbtn').on('click', function(e){//activates a button for logging out.
            	// console.log('click');
                $('#wrap').empty();
            	e.preventDefault();
            	var pid=$(this).attr('id');// p[asss this number into ajax to confimr what app the task belongs too.
            								// i will need to use .atr(id)
            	loadTaskApp(pid);
            	// console.log("pid"+pid);
            });
            return false;
			jclass();
			function editTemp(prj){
				$.get('templates/template.html',function(htmlArg){
					var projct = $(htmlArg).find('#edit-template').html();
					$.template('edittemplate', projct);
					var projcthtml = $.render(prj[0],'edittemplate');
					// console.log("projects? "+prj[0]);
					$('#edit').append(projcthtml);
					jclass();
					$('#project-new').on('click',function(e){
						// console.log('click in edit temp');
						newp();
						loadApp();
					})
				});
			};
		});
	};
	
	function loadForm(){
		$.get('templates/template.html',function(htmlArg){
				var entry = $(htmlArg).find('#entry-form').html();
				$.template('entrytemplate', entry);
				var html= $.render('','entrytemplate');
				$('#view').append(html);
				$('#submit_login').on('click', function(e) {
				// console.log("halp");
                e.preventDefault();
                login();// logs into application and ensure login
            });
            $('#submit_reg').on('click',function(e){
            	e.preventDefault();
            	reg();// adds new user to database if fields are filled correctly
            });
        	});
	};

	function loadTasks(response){
		// console.log("task entry");
		$('.last-task').empty();
		$.get('templates/template.html',function(htmlArg){
			var taskprjct = $(htmlArg).find('#task-edit-template').html();
			$.template('tasktemp', taskprjct);
			var taskhtml = $.render(response,'tasktemp');
			// console.log("hello load short");//if($('#last-task')!= ""){}		

			$('#last-task').append(taskhtml);

			jclass();
		});
	};
	/* ==============================   create delete tasks and projects ============= */
	function newp(){
		var name=$('#editAddproject-name').val();
		var due=$('#editAddDue').val();
		var desc=$('#editAddproject-description').val();
		var start=$('#editAddStart').val();
		var stat=$('#editAddproject-status').val;

		$.ajax({
			url:'xhr/new_project.php',
			data:{
				projectName:name,
				status:stat,
				dueDate:due,
				projectDescription:desc,
				startDate:start
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.newproject){
					// console.log('yayy')

				}else{
					// console.log('damnit'+response);
				};
			}// end of object so no ;
		})
	};
		function editP(){
		var name=$('#editAddproject-name').val();
		var due=$('#editAddDue').val();
		var desc=$('#editAddproject-description').val();
		var start=$('#editAddStart').val();
		var stat=$('#editAddproject-status').val;

		$.ajax({
			url:'xhr/new_project.php',
			data:{
				projectName:name,
				status:stat,
				dueDate:due,
				projectDescription:desc,
				startDate:start
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.newproject){
					console.log('edit p yayy')

				}else{
					console.log('edit p damnit'+response);
				};
			}// end of object so no ;
		})
	};
	function newT(pid){
		var name=$('#editAddtask-name').val();
		var due=$('#taskDueDate').val();
		var desc=$('#editAddtask-description').val();
		var start=$('#taskStartDate').val();
		var stat=$('#editAddtask-status').val;
		var tPid=pid;
		$.ajax({
			url:'xhr/new_task.php',
			data:{
				projectID:pid,
				taskName:name,
				status:stat,
				dueDate:due,
				projectDescription:desc,
				startDate:start
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.newproject){
					// console.log('yayy')

				}else{
					// console.log('damnit in task');
				};
			}// end of object so no ;
		})
	};
	function editT(pid){
		var name=$('#editAddtask-name').val();
		var due=$('#taskDueDate').val();
		var desc=$('#editAddtask-description').val();
		var start=$('#taskStartDate').val();
		var stat=$('#editAddtask-status').val;
		var tPid=pid;
		$.ajax({
			url:'xhr/new_task.php',
			data:{
				projectID:pid,
				taskName:name,
				status:stat,
				dueDate:due,
				projectDescription:desc,
				startDate:start
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.newproject){
					console.log('edit t yayy')

				}else{
					console.log('edit t damnit in task');
				};
			}// end of object so no ;
		})
	};
	jload();
	init();
});