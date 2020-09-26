<?php
	session_start();
	session_destroy();
	include '../modul/koneksi.php';
	$con = koneksi();

	$JS_URL		= '';
	
	$BASE_URL		= "http://".$_SERVER["HTTP_HOST"].""; 
	$URI			= $_SERVER["REQUEST_URI"];
	
	// FOR LOCALHOST \\
	$PRIMARY_DIR	= "/mine/restoran/panel";
	$URI			= str_replace($PRIMARY_DIR, "", $URI);
	$URI			= substr($URI, 1, strlen($URI));
	// END \\
	
	$BASE 			= $BASE_URL.$PRIMARY_DIR;
	
	$PAGE = "home";
	if($URI != ""){
		$URI	= explode("/", $URI);
		$PAGE	= $URI[0];		
	}
	$parent_category	= mysqli_query($con, "select * from category where parent_category = '0' and removed = 0 order by date_saved desc");
	$child_category		= mysqli_query($con, "select * from category where parent_category <> '0' and removed = 0 order by date_saved desc");
		
?>
<!DOCTYPE html>
<html lang="id">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title>PANEL</title>
		
		<!-- Bootstrap Plugin -->
		<link href="<?php echo $BASE ;?>/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="<?php echo $BASE ;?>/bootstrap/css/bootstrap-timepicker.min.css" rel="stylesheet">
		<link href="<?php echo $BASE ;?>/bootstrap/css/datepicker.css" rel="stylesheet">
		<link href="<?php echo $BASE ;?>/css/dataTables.bootstrap.min.css" rel="stylesheet">
		
		<script src="<?php echo $BASE ;?>/bootstrap/js/jquery.js"></script>
		<script src="<?php echo $BASE ;?>/bootstrap/js/jquery.min.js"></script>
		<script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap.min.js"></script>				
        <script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap-timepicker.js"></script>
        <script src="<?php echo $BASE ;?>/bootstrap/js/bootstrap-datepicker.js"></script>
        <script src="<?php echo $BASE ;?>/js/jquery.dataTables.min.js"></script>
        <script src="<?php echo $BASE ;?>/js/dataTables.bootstrap.min.js"></script>
		
		
		<!-- include summernote css/js-->
		<link href="<?php echo $BASE ;?>/summernote/summernote.css" rel="stylesheet">
		<script src="<?php echo $BASE ;?>/summernote/summernote.js"></script>
		
		<script>var BASE = '<?php echo $BASE; ?>'; var JS_URL = '<?php echo str_replace("/panel","", $BASE); ?>/'; var page = '<?php echo $PAGE; ?>';</script>
	</head>
	<body>
		<?php include 'form/header.html'; ?>
		
		<div class="content">
			<?php include 'form/'.$PAGE.'/index.html'; ?>
		</div>
		
		<?php include 'form/modal.html'; ?>
	</body>
	
	<!-- Custom Plugin -->
	<link href="<?php echo $BASE ;?>/css/default.css" rel="stylesheet">
	<link href="<?php echo $BASE ;?>/css/style.css" rel="stylesheet">
	<script src="<?php echo $BASE ;?>/js/loading.js"></script>
	<script src="<?php echo $BASE ;?>/js/datacrud.js"></script>
	<script src="<?php echo $BASE ;?>/js/dataview.js"></script>
	<script src="<?php echo $BASE ;?>/js/modal.js"></script>
	
	<link href="<?php echo $BASE ;?>/css/sm-datatables.css" rel="stylesheet">
	<script src="<?php echo $BASE ;?>/js/sm-datatables.js"></script>
	
	<script src="<?php echo $BASE ;?>/js/script.js"></script>
	
</html>