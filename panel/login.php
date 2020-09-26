<?php	
	//include 'modul/koneksi.php';
	if(isset($_POST['token'])){
		$uid = $_POST['uname'];
		$pwd = $_POST['upwd'];
		
		$pwdDB = execqueryreturn("user", "select upwd from user where uname = '".$uid."'");
		
		if($pwd == $pwdDB){
			$_SESSION['userlogin'] = $uid;
			echo '[{"status":"1"}]';
		}
		else{
			echo '[{"status":"0"}]';
		}
		
		
		exit;
	}
	
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Bootstrap Plugin -->
		<link href="<?php echo $BASE_URL ;?>/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="<?php echo $BASE_URL ;?>/bootstrap/css/bootstrap-timepicker.min.css" rel="stylesheet">
		<link href="<?php echo $BASE_URL ;?>/bootstrap/css/datepicker.css" rel="stylesheet">
		<link href="<?php echo $BASE_URL ;?>/css/dataTables.bootstrap.min.css" rel="stylesheet">
		
		<script src="<?php echo $BASE_URL ;?>/bootstrap/js/jquery.js"></script>
		<script src="<?php echo $BASE_URL ;?>/bootstrap/js/jquery.min.js"></script>
		<script src="<?php echo $BASE_URL ;?>/bootstrap/js/bootstrap.min.js"></script>		
		<script>var JS_URL = '<?php echo $BASE; ?>/panel/';</script>
		<script>
			$(document).ready(function(){
				$('form').submit(function(e){
					e.preventDefault();
					var data = [];
					data.push({ name: "token", value: "12345" });
					data.push({ name: "uname", value: $('#uname').val() });
					data.push({ name: "upwd", value: $('#upwd').val() });
					$.ajax({
						type: "POST",
						url: JS_URL+'',
						dataType: 'json',
						cache: false,
						data: data,
						success: function(data){
							if(data[0].status == 0){
								alert("Maaf, Login Gagal");
							}
							else{
								alert('login berhasil');
								window.location.reload();
							}
						},
						error: function(xhr,textStatus,err) {
							alert('Error: ' + xhr.readyState + '; ' + xhr.responseText + '; ' + xhr.status + '; ' + textStatus +'; ' + err);
						}
					});
				});
			});
		</script>
		
	</head>
	<body>
		<div style="padding-top:13%;">
			<div class="col-md-4"></div>
			<div class="col-md-4" align="center">
				<div  align="left" class="panel panel-primary" style="width:90%;">
					<div class="panel-heading">Login Panel</div>
					<div class="panel-body">
						<form role="form" method="post" action="">
						  <div class="form-group">
							<label for="email">Username:</label>
							<input type="text" class="form-control input-sm" id="uname">
						  </div>
						  <div class="form-group">
							<label for="pwd">Password:</label>
							<input type="password" class="form-control input-sm" id="upwd">
						  </div>
						  <div class="checkbox">
							<label><input type="checkbox"> Remember me</label>
						  <button type="submit" class="btn btn-default pull-right">Masuk</button>
						  </div>
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-4"></div>
		</div>
	</body>
</html>