
<?php
    header("Content-type:text/html; charset=utf-8");
    $inp = json_decode(file_get_contents("php://input"));
    $username = $inp -> {"username"};
    $password = $inp -> {"password"};
    $sqlSelect = "SELECT * FROM login_reg WHERE username='$username'";
    $sqlInsert = "INSERT INTO login_reg (username,password) VALUES ('$username','$password');";
    $coon = new mysqli("localhost","root","","login_user","3306");
    $resultSelect = $coon -> query($sqlSelect);
    $rows = $resultSelect -> fetch_assoc();
    if($rows){
        $res["type"] = "yes";
    }else{
        $resultInsert = $coon -> query($sqlInsert);
        $res["type"] = $resultInsert;
    }
    echo json_encode($res);
?>