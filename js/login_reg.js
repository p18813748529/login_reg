
var login_reg = (function(){
    return {
        init:function(ele,type){
            this.$ele = this.$(ele);
            this.type = type;
            this.$userInp = this.$("#username",this.$ele);
            this.$passInp = this.$("#password",this.$ele);
            this.$subBtn = this.$("#subBtn",this.$ele);
            this.event();
        },
        // 事件处理
        event:function(){
            var _this = this;
            this.$subBtn.onclick = function(){
                // 如果格式正确,进行ajax检测
                if(_this.regExpCheck()){
                    _this.ajaxCheck();
                }
            };
            this.$userInp.onchange = function(){
                _this.checkUser();
            };
            this.$passInp.onchange = function(){
                _this.checkPass();
            };
            this.$userInp.onblur = function(){
                if(this.value===""){
                    _this.checkUser();
                }
            };
            this.$passInp.onblur = function(){
                if(this.value===""){
                    _this.checkPass();
                }
            };
        },
        // ajax检测用户是否存在，且密码是否正确
        ajaxCheck:function(){
            var _this = this;
            this.checkResult = true;
            var callBack = null;
            if(this.type === "login"){
                callBack = this.ajaxLogin();
            }else if(this.type === "reg"){
                callBack = this.ajaxReg();
            }
            var options = {
                method:"POST",
                data:{
                    username:this.$userInp.value,
                    password:this.$passInp.value
                },
                success:callBack
            };
            sendAjax("php/login.php",options);
        },
        ajaxLogin:function(){
            var _this = this;
            return function(data) {
                console.log(this)
                var type = JSON.parse(data).type;
                if(type === "no"){
                    var userParent = _this.$userInp.parentNode.parentNode;
                    userParent.classList.add("has-error");
                    _this.$(".tip-labelUser",userParent).innerText = "用户名或密码错误";
                    var passParent = _this.$passInp.parentNode.parentNode;
                    passParent.classList.add("has-error");
                    _this.checkResult = false;
                }
                // 如果验证通过，跳转到用户页
                if(_this.checkResult){
                    location.href = "http://localhost:8998/robot/qq.html?username=" + _this.$userInp.value;
                }
            }
        },
        ajaxReg:function(){
            var _this = this;
            return function(data) {
                var type = JSON.parse(data).type;
                if(type === "yes"){
                    var userParent = _this.$userInp.parentNode.parentNode;
                    userParent.classList.add("has-error");
                    _this.$(".tip-labelUser",userParent).innerText = "用户已存在";
                    _this.checkResult = false;
                }
                // 如果验证通过，执行注册
                if(_this.checkResult){
                    function regCallBack(data){
                        var type = JSON.parse(data).type;
                        if(type === true){
                            alert("注册成功");
                            location.href = "http://localhost:8998/robot/qq.html?username=" + _this.$userInp.value;
                        }else{
                            alert("注册失败");
                        }
                    }
                    var regOptions = {
                        method:"POST",
                        data:{
                            username:_this.$userInp.value,
                            password:_this.$passInp.value
                        },
                        success:regCallBack
                    };
                    sendAjax("php/reg.php",regOptions);
                }
            }
        },
        // 正则检测用户和密码格式是否正确
        regExpCheck:function(){
            var uCheck = this.checkUser();
            var pCheck = this.checkPass();
            if(uCheck && pCheck){
                return true;
            }else{
                return false;
            }
        },
        checkUser:function(){
            var flag = true;
            var user = this.$userInp.value;
            var userParent = this.$userInp.parentNode.parentNode;
            if(user===""){
                userParent.classList.add("has-error");
                this.$(".tip-labelUser",userParent).innerText = "请输入用户名";
                return false;
            }
            var regUser = /^[0-9a-zA-Z]{5,13}$/;
            if(!regUser.test(user)){
                userParent.classList.add("has-error");
                this.$(".tip-labelUser",userParent).innerText = "用户名必须为6-13位数字和字母组成！！！";
                flag = false;
            }else{
                userParent.classList.remove("has-error");
                this.$(".tip-labelUser",userParent).innerText = "用户名";
            }
            return flag;
        },
        checkPass:function(){
            var flag = true;
            var pass = this.$passInp.value;
            var passParent = this.$passInp.parentNode.parentNode;
            if(pass===""){
                passParent.classList.add("has-error");
                this.$(".tip-labelPass",passParent).innerText = "请输入密码";
                return false;
            }
            var regPass = /^[0-9a-zA-Z]{6,13}$/;
            if(!regPass.test(pass)){
                passParent.classList.add("has-error");
                this.$(".tip-labelPass",passParent).innerText = "密码必须为6-13位数字和字母组成！！！";
                flag = false;
            }else{
                passParent.classList.remove("has-error");
                this.$(".tip-labelPass",passParent).innerText = "密码";
            }
            return flag;
        },
        // 获取dom元素，可以通过父级查找子元素
        $:function(ele,parent){
            if(typeof ele === "string"){
                if(parent){
                    ele = parent.querySelectorAll(ele);
                }else{
                    ele = document.querySelectorAll(ele);
                }
                ele = ele.length > 1 ? ele : ele[0];
            }
            return ele;
        }
    }
}());