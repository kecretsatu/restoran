<?php
	header('Content-type: application/json');

	include ('koneksi.php');
	$con=koneksi();
	$result;
	$query = '';
	
	try{
		
		if(isset($_POST["POST"])){
			if($_POST["POST"] == "product"){
				if($_POST["url"] == ""){
					$query = "select  * from product order by date_saved desc ";
				}
				else if($_POST["parent"] == 0){
					$n = execqueryreturn("product", "select count(*) from product where id_category = (select id_category from category where category_link = '".$_POST["url"]."')");
					if($n > 0){
						$query = "select * from product where id_category = (select id_category from category where category_link = '".$_POST["url"]."') 
							order by date_saved desc";
					}
					else{
						$query = "select * from product where id_category in 
						(select id_category from category where parent_category = (select id_category from category where category_link = '".$_POST["url"]."')) 
						order by date_saved desc"; 
					}
				}
			}
			if($_POST["POST"] == "testi"){
				$query = "select  * from testimonial order by date_saved desc ";
			}
		}
		$result = mysqli_query($con, $query);
		$rows = array();
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$rows[] = $row;
		}
		$data = json_encode($rows);

		echo $data;
	}
	catch(Exception $e){
		echo '[{"error":"'.$e->getMessage().'"}]'; //'Message: ' .$e->getMessage();
	}
	
	
?>