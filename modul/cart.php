<?php
	header('Content-type: application/json');
	session_start();
	
	$cart	= array();
	if(isset($_SESSION["cart"])){
		$cart = (array) json_decode($_SESSION["cart"]);
	}
	
	$tipe	= $_POST['tipe'];
	try{
		if($tipe == "add"){
			$isExist = false;
			$id		= $_POST['id'];
			$name	= $_POST['name'];
			$price	= $_POST['price'];
			$qty	= 1;
			
			for($i = 0; $i < count($cart); $i++){
				$arr = $cart[$i];
				$cart[$i]->last = 0;
				if($arr -> id == $id){
					$qty = $cart[$i]->qty;
					$cart[$i]->qty = $qty+1;
					$cart[$i]->last = 1;
					$isExist = true;
				}
			}		
			
			if(!$isExist){
				$add	= array("id" => $id, "name" => $name, "qty" => $qty, "price" => $price, "last" => 1);
				array_push($cart, $add);
			}
		}
		
		$data = json_encode($cart);
		$_SESSION["cart"] = $data;

		echo $data;
	}
	catch(Exception $e){
		echo '[{"error":"'.$e->getMessage().'"}]'; //'Message: ' .$e->getMessage();
	}
	
	
?>