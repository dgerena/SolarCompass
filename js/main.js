/* =======Solar Compass========= */
$(document).ready(function(){
console.log("runing out of reasons for this not to work"+' '+loadLanding());
	
	function loadLanding(){
		$.get('templates/template.html',function(htmlArg){
			var land = $(htmlArg).find('#landing-template').html();
			$.template('landingtemplate', land);
			var html= $.render('','landingtemplate');
			// console.log(htmlArg);
			$('#wrap').append(html);
		});
	};
	function loadApp(){
		$.get('templates/template.html',function(htmlArg){
			var app = $(htmlArg).find('#app-template').html();
			$.template('apptemplate', app);
			var html= $.render('','apptemplate');
			console.log(htmlArg);
			$('#wrap').append(html);
		});
	};
	var loadApp = function(){

                container.empty();

                $.get('templates/app.html', function(html){
                        var appCode = $(html).find('#template_app').html();
                        $.template('appHeader', appCode);                // compile template
                        var appHeader = $.render('', 'appHeader');                // use template
                        container.append(appHeader);

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
        }

	<!-- ===================================== login function =================================== -->
	var checkLoginState = function(){
                $.ajax({
                        url: 'xhr/check_login.php',
                        type: 'get',
                        dataType: 'json',
                        success: function(response){
                                // if user, loadApp()
                                // if error, loadLanding()

                                if(response.user){
                                        loadApp();
                                        console.log("cool");
                                } else {
                                        loadLanding();
                                        console.log("wtf");
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
});