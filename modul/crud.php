<?php
	session_start();
	header('Content-type: application/json');

	include ('koneksi.php');
	$con=koneksi();
	$result;
	$query = '';
	//$session_user = $_SESSION['userlogin'];
	try{
		
		if(isset($_POST["POST"])){
			if($_POST["POST"] == "category"){
				$id		= $_POST['id']; 
				$parent = $id;
				$tipe	= $_POST['tipe']; 
				$name	= $_POST['name'];
				$url	= generateURL("category", "category_link", $name); //str_replace(" ", "-",strtolower($name));
								
				if($tipe == "add"){
					$id = generateCode();
					$query = "insert into category values ('".$id."', '".$parent."', '".$name."', '".$url."', 1, now(), 0)";
				}
				else if($tipe == "edit"){
					$parent = execqueryreturn("category", "select parent_category from category where id_category = '".$id."'");
					$query = "update category set name = '".$name."', category_link = '".$url."'
								, user_saved = '1', date_saved = now()  where id_category = '".$id."'";
				}
				else if($tipe == "remove"){
					$query = "update category set removed = 1, category_link = ''
								, user_saved = '1', date_saved = now()  where id_category = '".$id."'";
				}
				
				if(execquery("category", $query)){
					echo '[{"status":"1", "id" : "'.$id.'", "name" : "'.$name.'", "parent" : "'.$parent.'", "url" : "'.$url.'"}]';
				}
				else{
					echo '[{"status":"0"}]';
				}
			}
			else if($_POST["POST"] == "product"){
				$id				= $_POST['id']; 
				
				$id_category	= execqueryreturn("category", "select id_category from category where category_link = '" . $_POST['id_category'] . "'"); 
								
				$product_code	= $_POST['product_code']; 
				$name			= $_POST['name'];
				$price_old		= $_POST['price_old'];
				$price			= $_POST['price'];
				$disc			= $_POST['disc'];
				$weight			= $_POST['weight'];
				$about			= mysqli_real_escape_string($con, $_POST['about']);
				$description	= mysqli_real_escape_string($con, $_POST['description']);
				$url			= generateURL("product", "product_link", $name); // str_replace(" ", "-",strtolower($_POST['nama']));
				
				$product_type	= "none";
				
				$tipe	= $_POST['tipe']; 
				
				if($tipe == "add"){
					$id = generateCode();
					$query = "insert into product values ('".$id."', '".$id_category."', '".$product_code."', '".$name."', '".$price_old."', '".$price."', 
								'".$disc."', '".$weight."', '', '', '', '', '".$about."', '".$description."', '".$product_type."', '".$url."', 1, now(), 0)";
				}
				else if($tipe == "edit"){
					$query = "update product set id_category = '".$id_category."', product_code = '".$product_code."', name = '".$name."', price_old = '".$price_old."', 
								price = '".$price."', disc = '".$disc."', weight = '".$weight."', weight = '".$weight."',
								about = '".$about."', description = '".$description."', product_type = '".$product_type."', 
								product_link = '".$url."', user_saved = '1', date_saved = now()  where id = '".$id."'";
				}
				
				if(execquery("product", $query)){
					echo '[{"status":"1"}]';
				}
				else{
					echo '[{"status":"0"}]';
				}
			}
			else if($_POST["POST"] == "testimonial"){
				$id				= $_POST['id']; 
				$name			= $_POST['name'];
				$content		= mysqli_real_escape_string($con, $_POST['content']);
				
				$tipe	= $_POST['tipe']; 
				
				if($tipe == "add"){
					$id = generateCode();
					$query = "insert into testimonial values ('".$id."', '".$name."', '".$content."', 1, now(), 0)";
				}
				else if($tipe == "edit"){
					$query = "update testimonial set name = '".$name.",
								content = '".$content."', user_saved = '1', date_saved = now()  where id = '".$id."'";
				}
				
				if(execquery("product", $query)){
					echo '[{"status":"1"}]';
				}
				else{
					echo '[{"status":"0"}]';
				}
			}
			else if($_POST['POST'] == "gallery"){
				$id = $_POST['id'];
				$id = str_replace("-", "", $id);
				$tipe = '';
				if($_POST['tipe'] == 'product'){
					$tipe = 'product';
				}
				if($_POST['tipe'] == 'testimonial'){
					$tipe = 'testimonial';
				}
				$target_dir = "../images/".$tipe."/";
				
				for($i = 1; $i <= 4; $i++){
					if(isset($_FILES['image'.$i])){
						$target_file = $target_dir . $id . $i . ".png";
						move_uploaded_file($_FILES['image'.$i]["tmp_name"], $target_file);
					}
					else{
						//echo '<script language="javascript">alert("kecret");</script>';
					}
				}
				echo '[{"status":"1"}]';
			}
			else if($_POST['name'] == "sekilas"){
				$sekilas = mysqli_real_escape_string($con, $_POST['sekilas']);
				
				$query = "update others set content = '".$sekilas."' where id = 'sekilas'";
				
				if(execquery("others", $query)){
					echo '[{"status":"1"}]';
				}
				else{
					echo '[{"status":"0"}]';
				}
			}
			else if($_POST['name'] == "tentang"){
				$tentang = mysqli_real_escape_string($con, $_POST['tentang']);
				
				$query = "update others set content = '".$tentang."' where id = 'tentang'";
				
				if(execquery("others", $query)){
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