
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
        },
        // ajax检测用户是否存在，且密码是否正确
        ajaxCheck:function(){
            var _this = this;
            this.checkResult = true;
            function callBack(data){
                type = JSON.parse(data).type;
                if(_this.type === "reg"){
                    if(type === "yes"){
                        var userParent = _this.$userInp.parentNode.parentNode;
                        userParent.classList.add("has-error");
                        _this.$("label",userParent).innerText = "用户已存在";
                        _this.checkResult = false;
                    }
                    // 如果验证通过，跳转到用户页
                    if(_this.checkResult){
                        if(_this.type === "reg"){
                            function regCallBack(data){
                                if(data.trim() === "true"){
                                    alert("注册成功");
                                    location.href = "manager.html?username=" + _this.$userInp.value;
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
                        }else if(_this.type === "login"){
                            location.href = "manager.html?username=" + _this.$userInp.value;
                        }
                    }
                }else if(_this.type === "login"){
                    if(type === "user"){
                        var userParent = _this.$userInp.parentNode.parentNode;
                        userParent.classList.add("has-error");
                        _this.$("label",userParent).innerText = "用户不存在";
                        _this.checkResult = false;
                    }else if(type === "pass"){
                        var passParent = _this.$passInp.parentNode.parentNode;
                        passParent.classList.add("has-error");
                        _this.$("label",passParent).innerText = "密码错误";
                        _this.checkResult = false;
                    }
                    // 如果验证通过，跳转到用户页
                    if(_this.checkResult){
                        location.href = "manager.html?username=" + _this.$userInp.value;
                    }
                }
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
        // 正则检测用户和密码格式是否正确
        regExpCheck:function(){
            var flag = true;
            var user = this.$userInp.value;
            var pass = this.$passInp.value;
            var regUser = /^[0-9a-zA-Z]{5,13}$/;
            var userParent = this.$userInp.parentNode.parentNode;
            if(!regUser.test(user)){
                userParent.classList.add("has-error");
                this.$("label",userParent).innerText = "用户名必须为6-13位数字和字母组成！！！";
                flag = false;
            }else{
                userParent.classList.remove("has-error");
                this.$("label",userParent).innerText = "用户名";
            }
            var regPass = /^[0-9a-zA-Z]{6,13}$/;
            var passParent = this.$passInp.parentNode.parentNode;
            if(!regPass.test(pass)){
                passParent.classList.add("has-error");
                this.$("label",passParent).innerText = "密码必须为6-13位数字和字母组成！！！";
                flag = false;
            }else{
                passParent.classList.remove("has-error");
                this.$("label",passParent).innerText = "密码";
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