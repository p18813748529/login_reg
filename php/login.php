<?php
    header("Content-type:text/html; charset=utf-8");
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $sqlSelect = "SELECT password FROM login_reg WHERE username='$username'";
    $coon = new mysqli("localhost","root","","login_user","3306");
    $result = $coon -> query($sqlSelect);
    $row = $result -> fetch_assoc();
    $res = array();
    if($row){
        if($row["password"]!==$password){
            $res["type"] = "pass";
        }else{
            $res["type"] = "yes";
        }
    }else{
        $res["type"] = "user";
    }
    echo json_encode($res);
?>