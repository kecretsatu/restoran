<?php
	session_start();

	include ('koneksi.php');
	$con=koneksi();
	$result;
	$query = '';
	//$session_user = $_SESSION['userlogin'];
	try{
		if(isset($_POST["name"])){
			if($_POST['name'] == "upload_makanan"){
				if(isset($_FILES['images1'])){
					echo '[{"status":"1"}]';
				}
				else{
					echo '[{"status":"0"}]';
				}
			}
		}
	}
	catch(Exception $e){
		echo '[{"error":"'.$e->getMessage().'"}]'; //'Message: ' .$e->getMessage();
	}
	
	
?>