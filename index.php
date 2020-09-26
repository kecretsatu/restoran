
<?php
	session_start();
	session_destroy();
	include 'modul/koneksi.php';
	$con = koneksi();

	$BASE_URL	= 'http://localhost/mine/travel';
	$JS_URL		= '';
	
	$BASE_URL		= "http://".$_SERVER["HTTP_HOST"].""; 
	$URI			= $_SERVER["REQUEST_URI"];
	
	// FOR LOCALHOST \\
	$PRIMARY_DIR	= "/mine/restoran";
	$URI			= str_replace($PRIMARY_DIR, "", $URI);
	$URI			= substr($URI, 1, strlen($URI));
	// END \\
	
	$BASE 			= $BASE_URL.$PRIMARY_DIR;
	
	$PAGE = "home";
	if($URI != ""){
		$URI	= explode("/", $URI);
		$PAGE	= $URI[0];	
			
		if($PAGE == "category"){
			$PAGE = "home";
		}		
	}
	$parent_category	= mysqli_query($con, "select * from category where parent_category = '0' order by name");
	$child_category		= mysqli_query($con, "select * from category where parent_category <> '0' order by name");
	
	
?>

<!DOCTYPE html>
<html lang="en">
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="<?php echo $BASE ;?>/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="<?php echo $BASE ;?>/contents/css/style.css" rel="stylesheet">
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="<?php echo $BASE ;?>/bootstrap/js/jquery.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap.min.js"></script>
				
		<link href="<?php echo $BASE ;?>/bootstrap/css/bootstrap-timepicker.min.css" rel="stylesheet">
        <script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap-timepicker.js"></script>
		
		<link href="<?php echo $BASE ;?>/bootstrap/css/datepicker.css" rel="stylesheet">
        <script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap-datepicker.js"></script>
		
		<title>TES</title>
	</head>	
	<body>
	
	<?php include "contents/header.html"; ?>
	<?php include "contents/".$PAGE.".html"; ?>	
	<?php include "contents/footer.html"; ?>
	
		<script>var JS_URL = '<?php echo $BASE ;?>/';</script>
        <script src="<?php echo $BASE ;?>/js/sm-slider.js"></script>
        <script src="<?php echo $BASE ;?>/js/sm-cart.js"></script>
        <script src="<?php echo $BASE ;?>/js/script.js"></script>
		<script src="<?php echo $BASE ;?>/js/jquery-ui.js"></script>
	</body>
</html>