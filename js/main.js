/* =======Solar Compass========= */
$(document).ready(function(){
	var init = function(){
 	        checkLoginState();
 	        console.log("hello init");
    };
	// console.log("runing out of reasons for this not to work"+' '+loadLanding());
	function loadLanding(){
		$('#wrap').empty();
		$.get('templates/template.html',function(htmlArg){
			var land = $(htmlArg).find('#landing-template').html();
			$.template('landingtemplate', land);
			var landhtml= $.render('','landingtemplate');
			console.log("hello load land");
			$('#wrap').append(landhtml);
		});
	};
	function loadApp(){
		$.get('templates/template.html',function(htmlArg){
			var app = $(htmlArg).find('#app-template').html();
			$.template('apptemplate', app);
			var html= $.render('','apptemplate');
			console.log("load app");
			$('#wrap').append(html);
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
                    $('#log-out').on('click', function(e){
                            e.preventDefault();
                            $.get('xhr/logout.php', function(){
                                    loadLanding();
                            });
                    })
                    return false;
                });
                $.get('templates/app.html', function(html){
                        var appCode = $(html).find('#app-temp').html();
                        $.template('appTemp', appCode);                // compile template
                        var appTemp = $.render('', 'appTemp');                // use template
                        container.append(appTemp);
                        getProjects();
                });
    };
	<!-- ===================================== login function =================================== -->
	var checkLoginState = function(){
		console.log("shit.... its loading this at least")
                $.ajax({
                        url: 'xhr/check_login.php',
                        type: 'get',
                        dataType: 'json',
                        success: function(response){
                                // if user, loadApp()
                                // if error, loadLanding()
                                if(response.user){
                                        loadApp();
                                        console.log("login to app");
                                } else {
                                        loadLanding();
                                        console.log("loadlanding log check state");
                                }
                        }
                });
        };
	function login(){
		var username=$('#username').val();
		var pass =$('#password').val();
		$.ajax({
			url:'xhr/login.php',
			data:{
				user:username,
				pass:pass
			},
			type:'post',
			dataType:"json",
			success:function(response){
				console.log(response);
				if(response.user){
					loadApp();
				}else{
					loadLanding();
				}
			}
		});
	};
	init();
});