<?php
    header("Content-type:text/html; charset=utf-8");
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $sqlSelect = "SELECT * FROM login_reg WHERE username='$username' AND password='$password'";
    $coon = new mysqli("localhost","root","","login_user","3306");
    $result = $coon -> query($sqlSelect);
    $row = $result -> fetch_assoc();
    $res = array();
    if($row){
        $res["type"] = "yes";
    }else{
        $res["type"] = "no";
    }
    echo json_encode($res);
?>