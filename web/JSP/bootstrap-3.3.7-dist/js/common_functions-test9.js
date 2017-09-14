function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}
function getServiceProvider(){
    if(validateLocationAndService()){
        document.forms["searchBannerForm"].action="/get-service-providers";
        document.forms["searchBannerForm"].submit();
    }
    return false;
}
function validateLocationAndService(){
    var e = document.getElementById("serviceTypeId");
    var serviceType=e.value;
    var str = e.options[e.selectedIndex].text;
    document.getElementById("serviceTypeName").value=str;
    var cityName=document.getElementById("cityName").value;
    if(cityName==""){
        jAlert('Please Select Proper City in Your Location', 'City Error');
        document.getElementById("geocomplete").focus();
        return false;
    }
    if(serviceType==""){
        jAlert('Please select valid service..', 'Servicetype Error');
        document.getElementById("serviceTypeId").focus();
        return false;
    }
    return true;
}
function getScheduleLaterForm(){
    if(validateLocationAndService()){
        var location = document.getElementById("searchBannerForm").elements.namedItem("location").value;
        var serviceTypeId=document.getElementById("searchBannerForm").elements.namedItem("serviceTypeId").value;
        var cityName=document.getElementById("searchBannerForm").elements.namedItem("cityName").value;
        var userServiceLocation=document.getElementById("searchBannerForm").elements.namedItem("locationName").value;
        var emailID=document.getElementById("emailIdForOtherPurpose").value;
        document.getElementById("scheduleLaterForm").elements.namedItem("location").value=location;
        document.getElementById("scheduleLaterForm").elements.namedItem("serviceTypeId").value=serviceTypeId;
        document.getElementById("scheduleLaterForm").elements.namedItem("cityName").value=cityName;
        if(emailID!=""){
            document.getElementById("scheduleLaterForm").elements.namedItem("addressemailId").value=emailID;
            document.getElementById("scheduleLaterForm").elements.namedItem("addressemailId").readOnly = true;
        }
        document.getElementById("scheduleLaterForm").elements.namedItem("address2").value=userServiceLocation;
        showModal("schedule");
    }
}
function login(){
    var emailId = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;
    var today = (new Date()).getTime();
    document.getElementById("loginErrorMessageId").style.display="none";
    document.getElementById("showLoginProgressId").style.display="block";
    if(!validateEmail(emailId)){
        document.getElementById("loginErrorMessageId").style.display="block";
        document.getElementById("loginErrorMessageId").innerHTML="Please provide valid email id.";
        document.getElementById("showLoginProgressId").style.display="none";
        return false;
    }
    if(password==""){
        document.getElementById("loginErrorMessageId").style.display="block";
        document.getElementById("loginErrorMessageId").innerHTML="Password can't be empty. Please enter valid password.";
        document.getElementById("showLoginProgressId").style.display="none";
        return false;
    }
    var params= {};
    params.emailId=emailId;
    params.password=password;
    $.ajax({
        url: '/login',
        type:'post',
        data:params,
        success: function(data) {
            document.getElementById("showLoginProgressId").style.display="none";
            data=data.trim();
            if(data=="INVALID_PASSWORD"){
                document.getElementById("loginErrorMessageId").innerHTML ="Incorrect Password. Please provide valid Password.";
                document.getElementById("loginErrorMessageId").style.display="block";
            }else if(data=="INVALID_USER"){
                document.getElementById("loginErrorMessageId").innerHTML ="Sorry, Email id not exist. Please provide valid email id.";
                document.getElementById("loginErrorMessageId").style.display="block";
            }else if(data=="REGISTRATION_PENDING"){
                document.getElementById("loginErrorMessageId").style.display="block";
                document.getElementById("loginErrorMessageId").innerHTML ="Sorry, your account is not active. Please activate your account. The activation email sent to your registered email id.";
            }else if(data=="PROBLEM_WITH_LOGIN"){
                document.getElementById("loginErrorMessageId").style.display="block";
                document.getElementById("loginErrorMessageId").innerHTML ="Sorry, Server Found problem with your Login.";
            }else if(data=="SERVICE_NOT_RESPONDING"){
                document.getElementById("loginErrorMessageId").style.display="block";
                document.getElementById("loginErrorMessageId").innerHTML ="Service is not responding to the request.";
            }else{
                var url=document.URL;
                if ((url.indexOf("view-request-details") !=-1) || (url.indexOf("home-cleaning") !=-1)) {
                    location.reload();
                }
                document.getElementById("loginErrorMessageId").style.display="none";
                document.getElementById("header").innerHTML=data;
                closeLoginModal();
            }
        }});
}
function register(){
    var name = document.getElementById("regName").value;
    var regEmailId = document.getElementById("regEmailId").value;
    var regContactNumber = document.getElementById("regContactNumber").value;
    var regPassword = document.getElementById("regPassword").value;

    document.getElementById("showRegisterProgressId").style.display="block";
    document.getElementById("registerErrorMessageId").style.display="none";
    document.getElementById("registerSuccess").style.display="none";
    var today = (new Date()).getTime();
    if(name==""){
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="Please Enter Name..";
        document.getElementById("showRegisterProgressId").style.display="none";
        return false;
    }
    if(!validateEmail(regEmailId)){
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="Please provide valid email id.";
        document.getElementById("showRegisterProgressId").style.display="none";
        return false;
    }
    if(regPassword==""){
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="Password Should not be Empty..";
        document.getElementById("showRegisterProgressId").style.display="none";
        return false;
    }
    if(regContactNumber==null || regContactNumber==""){
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="Mobile Number Required..";
        document.getElementById("showRegisterProgressId").style.display="none";
        document.getElementById("regContactNumber").focus();
        return false;
    }else if (isNaN(regContactNumber)) {
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="The phone number contains illegal characters.";
        document.getElementById("showRegisterProgressId").style.display="none";
        document.getElementById("regContactNumber").focus();
        return false;
    }else if (!(regContactNumber.length == 10)) {
        document.getElementById("registerErrorMessageId").style.display="block";
        document.getElementById("registerErrorMessageId").innerHTML="Please Enter Valid ContactNumber..";
        document.getElementById("showRegisterProgressId").style.display="none";
        document.getElementById("regContactNumber").focus();
        return false;
    }

    var params= {};
    params.regEmailId=regEmailId;
    params.regName=name;
    params.regContactNumber=regContactNumber;
    params.regPassword=regPassword;

    $.ajax({
        url: '/new-user-reigistration',
        type:'post',
        data:params,
        success: function(data) {
            data=data.trim();
            if(data=="EXISTED"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML ="Your Already Existed With Your Username And Mobile Number";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else if(data=="USER_EXIST_WITH_MOBILE_NUMBER"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML =regContactNumber+" is already a registered user.Please correct the Phone number and resubmit.";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else if(data=="USER_EMAILID_EXISTS"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML ="Your Already Registerd With Your EmailId..";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else if(data=="WS_INTERNAL_ERROR"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML ="Server Has problem,Please Try again..";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else if(data=="PROBLEM_WITH_ACCOUNT_CREATN"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML ="There is a problrm with your account creation,please provide proper details..";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else if(data=="INVALID_CONTACT_NUMBER"){
                document.getElementById("showRegisterProgressId").style.display="none";
                document.getElementById("registerErrorMessageId").innerHTML ="Please Give Valid Contact Number";
                document.getElementById("registerErrorMessageId").style.display="block";
            }else{
                document.getElementById("showRegisterProgressId").style.display="none";
                //document.getElementById("registerSuccess").style.display="block";
                //document.getElementById("registerSuccess").innerHTML="Thank You For Registering with HomeServices.";
                /*setTimeout(function(){
                 closeLoginModal();
                 }, 2000);*/
                document.getElementById("loginErrorMessageId").style.display="none";
                document.getElementById("header").innerHTML=data;
                closeLoginModal();
            }
        }});
}
function validateEmail(val) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)){
        return true;
    }
    return false;
}

function validNumber(val){
    if(/^[789]\d{9}$/.test(val)){
        return true;
    }
    return false;
}

/* Method to invoke ajax call for zone search. This method will invoke when any of the zone search option is selected */
function postRequest(strURL,id) {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest(); // Mozilla, Safari, ...
    }else if (window.ActiveXObject) {
        // for IE
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // For IE
    }
    xmlHttp.open('POST', strURL, true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            updatepage(xmlHttp.responseText,id);
        }
    }
    xmlHttp.send(strURL);
}
function updatepage(str,id){
    var reponse=str.trim();
    if(id=="register"){
        var regContactNumber = document.getElementById("regContactNumber").value;
        if(reponse=="EXISTED"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML ="Your Already Existed With Your Username And Mobile Number";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else if(reponse=="USER_EXIST_WITH_MOBILE_NUMBER"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML =regContactNumber+" is already a registered user.Please correct the Phone number and resubmit.";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else if(reponse=="USER_EMAILID_EXISTS"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML ="Your Already Registerd With Your EmailId..";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else if(reponse=="WS_INTERNAL_ERROR"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML ="Server Has problem,Please Try again..";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else if(reponse=="PROBLEM_WITH_ACCOUNT_CREATN"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML ="There is a problrm with your account creation,please provide proper details..";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else if(reponse=="INVALID_CONTACT_NUMBER"){
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerErrorMessageId").innerHTML ="Please Give Valid Contact Number";
            document.getElementById("registerErrorMessageId").style.display="block";
        }else{
            document.getElementById("showRegisterProgressId").style.display="none";
            document.getElementById("registerSuccess").style.display="block";
            document.getElementById("registerSuccess").innerHTML="Thank You For Registering with HomeServices.";
            setTimeout(function(){
                closeLoginModal();
            }, 2000);
        }
    }else if(id=="login"){
        document.getElementById("showLoginProgressId").style.display="none";
        if(reponse=="INVALID_PASSWORD"){
            document.getElementById("loginErrorMessageId").innerHTML ="Incorrect Password. Please provide valid Password.";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else if(reponse=="INVALID_USER"){
            document.getElementById("loginErrorMessageId").innerHTML ="Sorry, Email id not exist. Please provide valid email id.";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else if(reponse=="REGISTRATION_PENDING"){
            document.getElementById("loginErrorMessageId").style.display="block";
            document.getElementById("loginErrorMessageId").innerHTML ="Sorry, your account is not active. Please activate your account. The activation email sent to your registered email id.";
        }else if(reponse=="PROBLEM_WITH_LOGIN"){
            document.getElementById("loginErrorMessageId").style.display="block";
            document.getElementById("loginErrorMessageId").innerHTML ="Sorry, Server Found problem with your Login.";
        }else if(reponse=="SERVICE_NOT_RESPONDING"){
            document.getElementById("loginErrorMessageId").style.display="block";
            document.getElementById("loginErrorMessageId").innerHTML ="Service is not responding to the request.";
        }else{
            document.getElementById("loginErrorMessageId").style.display="none";
            document.getElementById("header").innerHTML=data;
            closeLoginModal();
        }
    }else if(id=="changePassword"){
        document.getElementById("changePasswordErrorMessage").style.display="none";
        document.getElementById("changePasswordSuccessMsg").style.display="none";
        if(reponse.length>0){
            document.getElementById("changePasswordSuccessMsg").style.display="none";
            document.getElementById("changePasswordErrorMessage").innerHTML =reponse;
            document.getElementById("changePasswordErrorMessage").style.display="block";
        }else{
            document.getElementById("changePasswordErrorMessage").style.display="none";
            document.getElementById("changePasswordSuccessMsg").innerHTML ="Password Changed Successfully";
            document.getElementById("changePasswordSuccessMsg").style.display="block";
        }
        /*if(reponse=="PROBLEM_PASWD_CHNAGE" || reponse=="SERVICE_NOT_RESPONDING"){
         //document.getElementById("showProgressId").style.display="none";
         document.getElementById("changePasswordSuccessMsg").style.display="none";
         document.getElementById("changePasswordErrorMessage").innerHTML ="Problem with Password Change..Please Try Again";
         document.getElementById("changePasswordErrorMessage").style.display="block";
         }else if(reponse=="INVALID_OLD_PASSWORD"){
         //document.getElementById("showProgressId").style.display="none";
         document.getElementById("changePasswordSuccessMsg").style.display="none";
         document.getElementById("changePasswordErrorMessage").innerHTML ="Sorry, please provide your valid old password.";
         document.getElementById("changePasswordErrorMessage").style.display="block";
         }else{
         //document.getElementById("showProgressId").style.display="none";
         document.getElementById("changePasswordErrorMessage").style.display="none";
         document.getElementById("changePasswordSuccessMsg").innerHTML ="Password Changed Successfully";
         document.getElementById("changePasswordSuccessMsg").style.display="block";
         }*/
    }else if(id=="updateProfile"){
        document.getElementById(id).innerHTML =str;
        window.setTimeout('hideWaitIcon()', 500);
        document.getElementById(id).style.display="block";
    }else if(id=="forGotPasswordSuccessMsg"){
        //document.getElementById("showForgotPasswordProgressId").style.display="none";
        if(str.trim()=="EMAIL_ID_NOT_EXIST"){
            document.getElementById("forgotPasswordErrorMessageId").innerHTML ="Sorry, Email id not exist. Please provide valid email id.";
            document.getElementById("forgotPasswordErrorMessageId").style.display="block";
        }else{
            document.getElementById("forGotPasswordSuccessMsg").innerHTML ="Thank you. The change password link has been sent to your registered email address. " +
                "Please click on the link to genereate new password.";
            document.getElementById("forGotPasswordSuccessMsg").style.display="block";
            document.getElementById("forgt-pwd-dtls").style.display="none";
            document.getElementById("forgt-pwd-link").style.display="none";
        }
    }else if(id=="inviteFriendMessageId"){
        document.getElementById("showInviteFriendProgressId").style.display="none";
        document.getElementById("inviteFriendMessageId").style.display="block";
        document.getElementById("inviteFriendMessageId").innerHTML ="Thank you for the details. The invitation sent successfuly.";
    }else if(id=="new_activation"){
        document.getElementById("showLoginProgressId").style.display="none";
        if(reponse=="PROBLEM_ACTIVATIONKEY_GENERATION"){
            document.getElementById("loginErrorMessageId").innerHTML ="There was a problem to send activation key please try after some time.";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else if(reponse=="SERVICE_NOT_RESPONDING"){
            document.getElementById("loginErrorMessageId").innerHTML ="Server Not Responding please try after some time..";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else if(reponse=="USER_ALREADY_ACTIVE"){
            document.getElementById("loginErrorMessageId").innerHTML ="This User is already active ..You can login now..";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else if(reponse=="INVALID_USER"){
            document.getElementById("loginErrorMessageId").innerHTML ="This user is not exists..";
            document.getElementById("loginErrorMessageId").style.display="block";
        }else{
            document.getElementById("loginErrorMessageId").innerHTML ="Your activation key has sent to the your emai..Please check it.";
            document.getElementById("loginErrorMessageId").style.display="block";
        }
    }else{
        if(document.getElementById(id)!=null){
            document.getElementById(id).innerHTML =str;
            window.setTimeout('hideWaitIcon()', 500);
        }
    }
}
function closeLoginModal(){
    $('#loginreg').modal('hide');
}

function saveJobDetails(id){
    document.getElementById("jobType").value=id;
    document.getElementById("errorMessageDiv1").style.display='none';

    var userName=document.getElementById("nowAddressForm").elements.namedItem("userName").value;
    var address1=document.getElementById("nowAddressForm").elements.namedItem("address1").value;
    var address2=document.getElementById("nowAddressForm").elements.namedItem("address2").value;
    var cityName=document.getElementById("nowAddressForm").elements.namedItem("cityName").value;
    var stateName=document.getElementById("nowAddressForm").elements.namedItem("stateName").value;
    var userContactNumber=document.getElementById("nowAddressForm").elements.namedItem("userContactNumber").value;
    var emailId=document.getElementById("nowAddressForm").elements.namedItem("addressemailId").value;

    if(userName==""){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Enter Name..";
        document.getElementById("userName").focus();
        return false;
    }
    if(address1==""){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Enter Address..";
        document.getElementById("address1").focus();
        return false;
    }
    if(address2==""){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Enter Your Address..";
        document.getElementById("address2").focus();
        return false;
    }
    if(stateName==""){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Select State..";
        document.getElementById("stateName").focus();
        return false;
    }
    if(userContactNumber==""){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Enter ContactNumber..";
        document.getElementById("userContactNumber").focus();
        return false;
    }
    if(!validateEmail(emailId)){
        document.getElementById("errorMessageDiv1").style.display='block';
        document.getElementById("errorMessageDiv1").innerHTML="Please Enter Valid Emailid..";
        document.getElementById("addressemailId").focus();
        return false;
    }
    document.forms["nowAddressForm"].action="/save-job-details/"+id;
    document.forms["nowAddressForm"].submit();
}
function enableKeys(event) {
    var theEvent = event || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 8 || key == 9) {
        return true;
    }
    key = String.fromCharCode( key );
    var regex = /^[0-9]*$/;


    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function enableKeysPlum(event) {
    var theEvent = event || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 8) {
        return true;
    }
    key = String.fromCharCode( key );
    var regex = /^[0-9]*$/;


    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
function validateEmail(val) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)){
        return true;
    }
    return false;
}
function loadLoginRegisterModal(id){
    showModal(id);
}
function showModal(id){
    $('#'+id).modal();
}
function loadRegisterModal(id){
    $("#loginLi").attr("class", "");
    $("#regLi").attr("class", "active");
    document.getElementById("login").style.display="none";
    document.getElementById("registerErrorMessageId").style.display="none";
    document.getElementById("forGotPasswordSuccessMsg").style.display="none";
    document.getElementById("forgt-pwd-dtls").style.display="none";
    document.getElementById("regName").value="";
    document.getElementById("regEmailId").value="";
    document.getElementById("regContactNumber").value="";
    document.getElementById("regPassword").value="";
    document.getElementById("register").style.display="block";
}
function loadLoginModal(){
    $("#regLi").attr("class", "");
    $("#loginLi").attr("class", "active");
    document.getElementById("loginErrorMessageId").style.display="none";
    document.getElementById("forgt-pwd-dtls").style.display="none";
    document.getElementById("forGotPasswordSuccessMsg").style.display="none";
    document.getElementById("forgt-pwd-link").style.display="block";
    document.getElementById("emailId").value="";
    document.getElementById("password").value="";
    document.getElementById("register").style.display="none";
    document.getElementById("login").style.display="block";
}
function show(target){
    document.getElementById("forgotPasswordErrorMessageId").style.display="none";
    document.getElementById("forGotPasswordSuccessMsg").style.display="none";
    document.getElementById(target).style.display = 'block';
}
function hide(target){
    document.getElementById("forGotPasswordSuccessMsg").style.display="none";
    document.getElementById("forgotPasswordErrorMessageId").style.display="none";
    document.getElementById(target).style.display = 'none';
}
function sendForgotPasswordLink(){
    var emailId = document.getElementById("forgotPasswordEmailId").value;
    document.getElementById("forgotPasswordErrorMessageId").style.display="none";
    var today = (new Date()).getTime();
    if(!validateEmail(emailId)){
        document.getElementById("forgotPasswordErrorMessageId").style.display="block";
        document.getElementById("forgotPasswordErrorMessageId").innerHTML="Please provide valid email id.";
        return false;
    }else{
        postRequest("/forgot-password/"+emailId+"/"+today,"forGotPasswordSuccessMsg");
    }
}

var myVar ="";
function loadStatus(){
    var myVar  =window.setInterval("ajax_call()", 3000);
}
function ajax_call(){
    var reqId=document.getElementById("reqId").value;
    var status=document.getElementById("status").value;
    if((reqId!=null && reqId.length>0) && (status!=null && status.length>0) && status!="four"){
        $.ajax({
            url: '/get-interstitial-status/'+reqId+'/'+status,
            type:'post',
            success: function(data) {
                $('#sample').html(data);
            }});
    }
    if(status=="four"){
        clearInterval(myVar);
        document.forms["statusOne"].action="/display-service-provider";
        document.forms["statusOne"].submit();
    }
}
function loadNewAddressForm(){
    var email=document.getElementById("emailIdForOtherPurpose").value;
    if(email!=""){
        document.getElementById("nowAddressForm").elements.namedItem("addressemailId").value=email;
        document.getElementById("nowAddressForm").elements.namedItem("addressemailId").readOnly = true;
    }
    showModal("nowAddress");
}
function changePassword(){
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var emailID= document.getElementById("emailIdForOtherPurpose").value;

    var today = (new Date()).getTime();
    document.getElementById("changePasswordErrorMessage").style.display="none";
    document.getElementById("changePasswordSuccessMsg").style.display="none";

    if(oldPassword==""){
        document.getElementById("changePasswordErrorMessage").style.display="block";
        document.getElementById("changePasswordErrorMessage").innerHTML="Current password should not be empty.";
        return false;
    }
    if(newPassword==""){
        document.getElementById("changePasswordErrorMessage").style.display="block";
        document.getElementById("changePasswordErrorMessage").innerHTML="New password should not be empty";
        return false;
    }
    if(newPassword!=confirmPassword){
        document.getElementById("changePasswordErrorMessage").style.display="block";
        document.getElementById("changePasswordErrorMessage").innerHTML="New password and confirm password are not same.";
        return false;
    }
    //document.getElementById("showProgressId").style.display="block";
    postRequest("/change-password-request?oldPassword="+oldPassword+"&newPassword="+newPassword+"&date="+today+"&emailId="+emailID,"changePassword");
}
function savePersonalInfo(){
    var today = (new Date()).getTime();
    document.getElementById("personalErrorMsg").style.display="none";
    document.getElementById("personalSuccMsg").style.display="none";
    if($("#firstName").val()==""){
        document.getElementById("personalErrorMsg").style.display="block";
        document.getElementById("personalErrorMsg").innerHTML="Please Enter First Name";
        return false;
    }
    if($("#lastName").val()==""){
        document.getElementById("personalErrorMsg").style.display="block";
        document.getElementById("personalErrorMsg").innerHTML="Please Enter Last Name";
        return false;
    }
    if($("#mobileNumber").val()==""){
        document.getElementById("personalErrorMsg").style.display="block";
        document.getElementById("personalErrorMsg").innerHTML="Please Enter Mobile Number";
        return false;
    }
    if($("#gender").val()==""){
        document.getElementById("personalErrorMsg").style.display="block";
        document.getElementById("personalErrorMsg").innerHTML="Please Select Gender";
        return false;
    }
}
function fnGetKey(e,source){
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    if(keycode==13 && source=='login'){
        login();
    }else if(keycode==13 && source=='register'){
        register();
    }else if(keycode==13 && source=='forgot'){
        sendForgotPasswordLink();
    }else{
        return true;
    }
}
function editAddress(id){
    $.ajax({
        url: '/auto-fill-addresses/'+id,
        type:'post',
        success: function(data) {
            document.getElementById("newAddressBlock").style.display='none';
            document.getElementById("editAddressBlock").style.display='block';
            $('#editAddressBlock').html(data);
        }});
}
/*function deleteAddress(id){
 alert(id);
 $.ajax({
 url: '/deactivate-address/'+id,
 type:'post',
 success: function(data) {
 }});
 }*/
function newAddressBlock(){
    document.getElementById("newAddressBlock").style.display='block';
    document.getElementById("editAddressBlock").style.display='none';
}
function updateAddress(id){
    var addressType=$("#addressType").val();
    var userName=$("#userName").val();
    var address1=$("#address1").val();
    var address2=$("#address2").val();
    var cityName=$("#cityName").val();
    var stateName=$("#stateName").val();
    var pincode=$("#pincode").val();
    var mobileNumber=$("#mobileNumber").val();
    var savAdressAs=$("#saveAddressAs").val();

    if($("#addressType").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Select Address Type..";
        return false;
    }
    if($("#userName").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Enter Name";
        return false;
    }
    if($("#address1").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Enter Address";
        return false;
    }
    if($("#address2").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Enter Location";
        return false;
    }
    if($("#cityName").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Enter City";
        return false;
    }
    if($("#stateName").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Select State";
        return false;
    }
    /*if($("#pincode").val()==""){
     document.getElementById("manageAddressError").style.display="block";
     document.getElementById("manageAddressError").innerHTML="Please  Gender";
     return false;
     }*/
    if($("#mobileNumber").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Enter Mobile Number..";
        return false;
    }
    if($("#savAdressAs").val()==""){
        document.getElementById("manageAddressError").style.display="block";
        document.getElementById("manageAddressError").innerHTML="Please Select Save Address AS..";
        return false;
    }
    var params= {};
    params.userAddressId=id;
    params.addressType=addressType;
    params.userId=$('#userId').val();
    params.userName=userName;
    params.address1=address1;
    params.address2=address2;
    params.stateName=stateName;
    params.zipCode= pincode;
    params.mobileNumber=mobileNumber;
    params.addresssPrimary=savAdressAs;
    params.cityName=cityName;

    $.ajax({
        url: '/update-address/'+id+'/update',
        type:'post',
        data:params,
        success: function(data) {
            $('#manageAddress').html(data);
        }});
}
function saveUserAddress(){
    var addressType=$("#newAddressType").val();
    var userName=$("#newUserName").val();
    var address1=$("#newAddress1").val();
    var address2=$("#newAddress2").val();
    var cityName=$("#newUserCity").val();
    var stateName=$("#newState").val();
    var pincode=$("#newPincode").val();
    var mobileNumber=$("#newmobileNumber").val();
    var savAdressAs=$("#newsaveAddressAs").val();

    /*if(addressType==""){
     document.getElementById("manageAddressError1").style.display="block";
     document.getElementById("manageAddressError1").innerHTML="Please Select Address Type..";
     return false;
     }*/
    if(userName==""){
        document.getElementById("manageAddressError1").style.display="block";
        document.getElementById("manageAddressError1").innerHTML="Please Enter Name";
        return false;
    }
    if(address1==""){
        document.getElementById("manageAddressError1").style.display="block";
        document.getElementById("manageAddressError1").innerHTML="Please Enter Address";
        return false;
    }
    /*if(address2==""){
     document.getElementById("manageAddressError1").style.display="block";
     document.getElementById("manageAddressError1").innerHTML="Please Enter Location";
     return false;
     }*/
    if(cityName==""){
        document.getElementById("manageAddressError1").style.display="block";
        document.getElementById("manageAddressError1").innerHTML="Please Enter City";
        return false;
    }
    if(stateName==""){
        document.getElementById("manageAddressError1").style.display="block";
        document.getElementById("manageAddressError1").innerHTML="Please Select State";
        return false;
    }
    /*if($("#pincode").val()==""){
     document.getElementById("manageAddressError").style.display="block";
     document.getElementById("manageAddressError").innerHTML="Please  Gender";
     return false;
     }*/
    if(mobileNumber==""){
        document.getElementById("manageAddressError1").style.display="block";
        document.getElementById("manageAddressError1").innerHTML="Please Enter Mobile Number..";
        return false;
    }
    /*if(savAdressAs==""){
     document.getElementById("manageAddressError1").style.display="block";
     document.getElementById("manageAddressError1").innerHTML="Please Select Save Address AS..";
     return false;
     }*/

    var params= {};
    params.addressType=addressType;
    params.userId=$('#userId').val();
    params.userName=userName;
    params.address1=address1;
    params.address2=address2;
    params.stateName=stateName;
    params.zipCode= pincode;
    params.mobileNumber=mobileNumber;
    params.addresssPrimary=savAdressAs;
    params.cityName=cityName;

    $.ajax({
        url: '/update-address/new-address/save',
        type:'post',
        data:params,
        success: function(data) {
            $('#manageAddress').html(data);
        }});
}
function submitAddress(addressId){
    document.getElementById("userAddressId").value=addressId;
    var userName=document.getElementById("userName").value;
    var address1=document.getElementById("address1").value;
    var address2=document.getElementById("address2").value;
    var cityName=document.getElementById("cityName").value;
    var stateName=document.getElementById("stateName").value;
    var userContactNumber=document.getElementById("mobileNumber").value;
    var emailId=document.getElementById("addressemailId").value;
    /*var addressType=document.getElementById("addressType").value;*/

    if(addressId==""){
        if(userName==""){
            document.getElementById("errorMessageDiv1").style.display='block';
            document.getElementById("errorMessageDiv1").innerHTML="Please Enter Name..";
            document.getElementById("userName").focus();
            return false;
        }
        if(address1==""){
            document.getElementById("errorMessageDiv1").style.display='block';
            document.getElementById("errorMessageDiv1").innerHTML="Please Enter Address..";
            document.getElementById("address1").focus();
            return false;
        }
        if(address2==""){
            document.getElementById("errorMessageDiv1").style.display='block';
            document.getElementById("errorMessageDiv1").innerHTML="Please Enter Your Address..";
            document.getElementById("address2").focus();
            return false;
        }
        if(userContactNumber==""){
            document.getElementById("errorMessageDiv1").style.display='block';
            document.getElementById("errorMessageDiv1").innerHTML="Please Enter ContactNumber..";
            document.getElementById("userContactNumber").focus();
            return false;
        }
        if(!validateEmail(emailId)){
            document.getElementById("errorMessageDiv1").style.display='block';
            document.getElementById("errorMessageDiv1").innerHTML="Please Enter Valid Emailid..";
            document.getElementById("emailId").focus();
            return false;
        }
    }
    document.getElementById("errorMessageDiv1").style.display='none';
    document.forms["saveAddressForm"].action="/save-usercontact-details";
    document.forms["saveAddressForm"].submit();
}
function pickUserAddress(addressId){
    $.ajax({
        url: '/update-address/'+addressId+'/view',
        type:'post',
        success: function(data) {
            $('#addressBlock').html(data);
        }});
}
function loadServiceLayer(serviceType){
    if(serviceType.toLowerCase()=="1"){
        document.getElementById("electrician").style.display='none';
        document.getElementById("plumbing").style.display='block';
        showModal("serviceLayer");
    }else if(serviceType.toLowerCase()=="2"){
        document.getElementById("plumbing").style.display='none';
        document.getElementById("electrician").style.display='block';
        showModal("serviceLayer");
    }else if(serviceType.toLowerCase()=="11"){
        document.forms["searchBannerForm"].action="/home-cleaning";
        document.getElementById("serviceTypeId").value='11';
        document.forms["searchBannerForm"].submit();
    }
}
function landMarkModal(){
    $('#displayAddressAlert').modal();
    //showModal("displayAddressAlert");
}
function launchOnBookService(){
    $('#serviceLayer').modal('hide');
    document.getElementById("geocomplete").focus();

}
function showHowitworks(){
    showModal("howitworksLayer");
}
function confirmCorrectLocation(){
}
function cancelJobLayer(jobId){
    document.getElementById("jobId").value=jobId;
    showModal("cancelJobLayer");
}
function cancelTheJob(){
    var JobId=document.getElementById("jobId").value;
    document.getElementById("errorMessage").style.display='none';
    if($('#reasonForcancel').val()==""){
        document.getElementById("errorMessage").style.display='block';
        document.getElementById("errorMessage").innerHTML="Please Give Your Reason For Cancel..";
        return false;
    }
    var params= {};
    params.reasonForcancel=$('#reasonForcancel').val();;
    params.comments=$('#comments').val();
    params.jobId=JobId;
    $.ajax({
        url: '/cancel-consumer-openjobs',
        type:'post',
        data:params,
        success: function(data) {
            var reponse=data.trim();
            if(reponse=="SUCCESS"){
                $('#cancelJobLayer').modal('hide');
                document.getElementById("job_"+JobId).style.display='none';
            }
        }});
}
function saveCustomerFeedBack(){
    var params= {};
    params.userName=$('#userName').val();;
    params.contactNumber=$('#contactNumber').val();
    params.emailId=$('#emailId').val();
    params.subject='';
    params.comments=$('#comments').val();

    document.getElementById("errorMessage").style.display="none";
    document.getElementById("successMsg").style.display="none";
    if($("#userName").val()==""){
        document.getElementById("errorMessage").style.display="block";
        document.getElementById("errorMessage").innerHTML="Please Enter Your Name..";
        return false;
    }
    if(!validateEmail($("#emailId").val())){
        document.getElementById("errorMessage").style.display='block';
        document.getElementById("errorMessage").innerHTML="Please Enter Valid Emailid..";
        document.getElementById("emailId").focus();
        return false;
    }
    if ($("#contactNumber").val() == "") {
        document.getElementById("errorMessage").style.display="block";
        document.getElementById("errorMessage").innerHTML="Please Enter Contact Number..";
        document.getElementById("contactNumber").focus();
        return false;
    }else if (isNaN($("#contactNumber").val())) {
        document.getElementById("errorMessage").style.display='block';
        document.getElementById("errorMessage").innerHTML="The phone number contains illegal characters.";
        document.getElementById("contactNumber").focus();
        return false;
    }else if (!($("#contactNumber").val().length == 10)) {
        document.getElementById("errorMessage").style.display='block';
        document.getElementById("errorMessage").innerHTML="Please Enter Valid ContactNumber..";
        document.getElementById("contactNumber").focus();
        return false;
    }

    if($("#comments").val()==""){
        document.getElementById("errorMessage").style.display="block";
        document.getElementById("errorMessage").innerHTML="Please Enter Message..";
        return false;
    }
    $.ajax({
        url: '/saveCustomerFeedBack',
        type:'post',
        data:params,
        success: function(data) {
            var reponse=data.trim();
        }});
    document.getElementById("successMsg").style.display="block";
    document.getElementById("successMsg").innerHTML="Thank you for writing to us . One of our representatives will contact you shortly.";
}

function getJobSchedulerDiv(formName,requestFrom,isHousejoyUser){
    var serviceTypeId=document.getElementById("serviceTypeId").value;
    var today = (new Date()).getTime();

    if(serviceTypeId!=null && serviceTypeId=="11"){
        if(validateLocationAndService()){
            if(isHousejoyUser=='true'){
                document.forms[formName].action="/view-request-details";
            }else{
                document.forms["searchBannerForm"].action="/home-cleaning";
            }
            document.forms["searchBannerForm"].submit();
        }
    }else{
        if(requestFrom!=null  && requestFrom!="" && requestFrom=="home"){
            if(validateLocationAndService()){
                document.forms[formName].action="/view-request-details";
                document.forms[formName].submit();
            }
        }else{
            document.forms[formName].action="/view-request-details";
            document.forms[formName].submit();
        }
    }
}
function bookThisProviderNow(jobId,providerId,userProfilePicture){
    document.forms["providerForm"].action="/book-provider";
    document.forms["providerForm"].submit();
}

$(".homeclean-button").click(function(e){
    if(validateLandingFeilds()){
        $('#screen-fade').modal('show');
        $("#homeCleaningForm").submit()
    }
});
$(".computer-repair-button").click(function(e){
    if(validateLandingFeilds()){
        $('#screen-fade').modal('show');
        $("#computerRepairForm").submit()
    }
});

$(".beauty-button").click(function(e){
    if(validateLandingFeilds()){
        $('#screen-fade').modal('show');
        $("#beautyForm").submit()
    }
});

$(".sub").click(function(e){
    if(validateLandingLowerFeilds()){
        $('#screen-fade').modal('show');
        $("#lowerForm").submit()
    }
});

$(".fitnessButton").click(function(e){
    if(validateLandingFeilds()){
        //$('#screen-fade').modal('show');
        $("#fitnessForm").submit()
    }
});

$(".book_plumber_now").click(function(e){
    if(validateLandingFeildsServices('plumbing')){
        $('#screen-fade').modal('show');
        $("#plumbingForm").submit()
    }
});

$(".book_electrician_now").click(function(e){
    if(validateLandingFeilds()){
        $('#screen-fade').modal('show');
        $("#electricianForm").submit()
    }
});

$(".book_electrician_now_services").click(function(e){
    if(validateLandingFeildsServices('electrical')){
        $('#screen-fade').modal('show');
        $("#electricianForm").submit()
    }
});
$(".book_now_pest").click(function(e){
    if(validateLandingFeildsServices('pest')){
        $('#screen-fade').modal('show');
        $("#pestForm").submit()
    }
});
$(".book_now_carpentry").click(function(e){
    if(validateLandingFeildsServices('carpentry')){
        $('#screen-fade').modal('show');
        $("#carpentryForm").submit()
    }
});




jQuery.fn.ForceNumericOnly =
    function()
    {
        return this.each(function()
        {
            $(this).keydown(function(e)
            {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            });
        });
    };
$("#userContactNumber").ForceNumericOnly();
$("#regContactNumber").ForceNumericOnly();
$("#contactNumber").ForceNumericOnly();
function validateName(name){
    var pattern = /^[a-zA-Z ]+$/;
    if(pattern.test(name)){
        return true;
    }
    return false;
}

function validateLandingFeilds(){
    $(".housejoy-alert").addClass("hide");
    var geocomplete = document.getElementById("geocomplete").value;
    var location    = document.getElementById("location").value;
    var locationId  = document.getElementById("locationId").value;
    if(location == "" || location == undefined) {
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please provide your location.");
        document.getElementById("geocomplete").focus();
        return false;

    }
    if(geocomplete==null || geocomplete==""){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please Give Valid Location..");
        document.getElementById("geocomplete").focus();
        return false;

    }

    if(locationId==null || locationId==""){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please Give Valid Location..");
        document.getElementById("geocomplete").focus();
        return false;

    }

    // if(  $("#cityNameOption").val()==null || $("#cityNameOption").val()==""){
    // $(".housejoy-alert").removeClass("hide");
    // $(".required_input").text("Please select city");
    // document.getElementById("cityNameOption").focus();
    // return false;
    // }
    // if(  $("#cityName").length > 0 && $("#cityName").val()==""){
    // $(".housejoy-alert").removeClass("hide");
    // $(".required_input").text("Please select city");
    // document.getElementById("cityName").focus();
    // return false;
    // }
    if($("#userName").val()==null || $("#userName").val().trim()==""){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please provide your full name.");
        document.getElementById("userName").focus();
        return false;
    }
    // $("#userName").val($("#userName").val().trim());
    if(!validateName($("#userName").val())){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please enter a Valid Name..");
        $("#userName").focus();
        return false;
    }


    if($("#userName").val().length < 3){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please Enter Valid Name");
        document.getElementById("userName").focus();
        return false;
    }



    if($("#mobileNumber").val()==null || $("#mobileNumber").val()==""){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Please provide your mobile number");
        document.getElementById("mobileNumber").focus();
        return false;
    }else if (isNaN($("#mobileNumber").val())) {
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("The phone number contains illegal characters.");
        document.getElementById("mobileNumber").focus();
        return false;
    }else if (!($("#mobileNumber").val().length >= 10) || !($("#mobileNumber").val().length <= 12)) {
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("Enter Valid Contact Number");
        $("#mobileNumber").focus();
        return false;
    }else if (!validNumber($("#mobileNumber").val())) {
        $(".housejoy-alert").removeClass("hide");
        $(".required_input").text("please enter valid contact number.");
        $("#mobileNumber").focus();
        return false;
    }
    var pg_ver 		=	$("#pg_version").val();
    var pg_name 		=	$("#pg_name").val();


    if(!($("#pg_version").val() == 2 && $("#pg_name").val() == "appliances") &&
        !($("#pg_version").val() == 2 && $("#pg_name").val() == "laptop-repair") &&
        !($("#pg_version").val() == 1 && $("#pg_name").val() == "mobile-repair") &&
        !(($("#pg_version").val() == 9  || $("#pg_version").val() == 16 || $("#pg_version").val() == 17 || $("#pg_version").val() == 18 || $("#pg_version").val() == 10 || $("#pg_version").val() == 8) && $("#pg_name").val() == "beauty") &&
        !($("#pg_version").val() == 4  && $("#pg_name").val() == "fitness") && !($("#pg_version").val() == 7 && $("#pg_name").val() == "plumbing") && !($("#pg_version").val() == 3 && $("#pg_name").val() == "home-cleaning") && !($("#pg_version").val() == 1 && $("#pg_name").val() == "drivers")&& !($("#pg_version").val() == 3 && $("#pg_name").val() == "carpentry") && !($("#pg_version").val() == 4 && $("#pg_name").val() == "electrical")&& !($("#pg_version").val() == 1 && $("#pg_name").val() == "painting") && !($("#pg_version").val() == 1 && $("#pg_name").val() == "pest-control") && !($("#pg_version").val() == 6 && $("#pg_name").val() == "laundry") && !($("#pg_version").val() == 8 && $("#pg_name").val() == "laundry")){
        if(!validateEmail($("#userEmailid").val())){
            $(".housejoy-alert").removeClass("hide");
            $(".required_input").text("Provide Valid Email...");
            document.getElementById("userEmailid").focus();
            return false;
        }}

    if($("#pg_version").val() == 13 && $("#pg_name").val() == "beauty"){

        window._vis_opt_queue = window._vis_opt_queue || [];
        window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(200);});
    }

    if($("#lead_comments").val() != undefined || $("#lead_comments").val() != null){
        if ($("#lead_comments").val().trim().length<=0) {
            $(".housejoy-alert").removeClass("hide");
            $(".required_input").text("Please select at least one service you might be interested in");
            document.getElementById("svc").focus();
            return false;
        }
    }


    return true;
}

function validateLandingLowerFeilds(){
    $(".housejoy-alert-lower").addClass("hide");
    // if($("#cityNameLower").length > 0 && ($("#cityNameLower").val()==null || $("#cityNameLower").val()=="")){
    // $(".housejoy-alert-lower").removeClass("hide");
    // $(".required_input_lower").text("Please Select City..");
    // document.getElementById("cityNameLower").focus();
    // return false;
    // }
    var geocomplete = document.getElementById("geocompletelower").value;
    var location    = document.getElementById("locationlower").value;
    var locationId  = document.getElementById("locationIdlower").value;
    if(location == "" || location == undefined) {
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please provide your location.");
        document.getElementById("geocompletelower").focus();
        return false;

    }
    if(geocomplete==null || geocomplete==""){
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please Give Valid Location..");
        document.getElementById("geocompletelower").focus();
        return false;

    }

    if(locationId==null || locationId==""){
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please Give Valid Location..");
        document.getElementById("geocompletelower").focus();
        return false;

    }
    if($("#userNameLower").val()==null || $("#userNameLower").val().trim()==""){
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please provide your full name.");
        document.getElementById("userNameLower").focus();
        return false;
    }
    //$("#userName").val($("#userName").val().trim());

    if(!validateName($("#userNameLower").val())){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input_lower").text("Please enter a Valid Name..");
        $("#userNameLower").focus();
        return false;
    }

    if($("#userNameLower").val().length < 3){
        $(".housejoy-alert").removeClass("hide");
        $(".required_input_lower").text("Please Enter Valid Name");
        document.getElementById("userNameLower").focus();
        return false;
    }


    if($("#mobileNumberLower").val()==null || $("#mobileNumberLower").val()==""){
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please provide your mobile number");
        document.getElementById("mobileNumberLower").focus();
        return false;
    }else if (isNaN($("#mobileNumberLower").val())) {
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("please enter valid contact number.");
        document.getElementById("mobileNumberLower").focus();
        return false;
    }else if (!($("#mobileNumberLower").val().length >= 10) || !($("#mobileNumberLower").val().length <= 12)) {
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("Please Enter Valid ContactNumber..");
        document.getElementById("mobileNumberLower").focus();
        return false;
    }else if (!validNumber($("#mobileNumberLower").val())) {
        $(".housejoy-alert-lower").removeClass("hide");
        $(".required_input_lower").text("please enter valid contact number.");
        document.getElementById("mobileNumberLower").focus();
        return false;
    }
    var pg_ver 		=	$("#pg_version").val();
    var pg_name 		=	$("#pg_name").val();
    if(!($("#pg_version").val() == 2 && $("#pg_name").val() == "appliances") &&
        !($("#pg_version").val() == 2 && $("#pg_name").val() == "laptop-repair") &&
        !($("#pg_version").val() == 1 && $("#pg_name").val() == "mobile-repair") &&
        !(($("#pg_version").val() == 9 ||$("#pg_version").val() == 16 ||$("#pg_version").val() == 17 ||$("#pg_version").val() == 18 || $("#pg_version").val() == 10 || $("#pg_version").val() == 8) && $("#pg_name").val() == "beauty") &&
        !($("#pg_version").val() == 4  && $("#pg_name").val() == "fitness") && !($("#pg_version").val() == 7 && $("#pg_name").val() == "plumbing") && !($("#pg_version").val() == 3 && $("#pg_name").val() == "home-cleaning") && !($("#pg_version").val() == 1 && $("#pg_name").val() == "drivers")&& !($("#pg_version").val() == 3 && $("#pg_name").val() == "carpentry") && !($("#pg_version").val() == 4 && $("#pg_name").val() == "electrical")&& !($("#pg_version").val() == 1 && $("#pg_name").val() == "painting") && !($("#pg_version").val() == 1 && $("#pg_name").val() == "pest-control") && !($("#pg_version").val() == 6 && $("#pg_name").val() == "laundry") && !($("#pg_version").val() == 8 && $("#pg_name").val() == "laundry")){
        if(!validateEmail($("#userEmailidLower").val())){
            $(".housejoy-alert-lower").removeClass("hide");
            $(".required_input_lower").text("Provide Valid Emailid...");
            document.getElementById("userEmailidLower").focus();
            return false;
        }
    }

    if($("#pg_version").val() == 13 && $("#pg_name").val() == "beauty"){

        window._vis_opt_queue = window._vis_opt_queue || [];
        window._vis_opt_queue.push(function() {_vis_opt_goal_conversion(200);});
    }

    return true;
}

function validateLeadAdditionalInfo(formName){
    var geocomplete=document.getElementById("geocomplete").value;
    var address1=document.getElementById("address1").value;
    var jobDescription1=document.getElementById("jobDescription1").value;
    var jobDescription2=document.getElementById("jobDescription2").value;

    var cityName=document.getElementById("cityName").value;
    document.getElementById("errorAlert").style.display='none';
    document.getElementById("address2").value=geocomplete;
    var address2=document.getElementById("address2").value
    var inValidCity=document.getElementById("inValidCity").value;
    var location = document.getElementById("location").value;
    if(jobDescription1==""){
        document.getElementById("errorAlert").style.display='block';
        document.getElementById("errorAlert").innerHTML="Please tell us something about your requirement";
        document.getElementById("jobDescription1").focus();
        return false;
    }

    if(cityName==""){
        document.getElementById("errorAlert").style.display='block';
        document.getElementById("errorAlert").innerHTML="Please Select Proper Location";
        document.getElementById("geocomplete").focus();
        return false;
    }
    /*if(geocomplete==null || geocomplete==""){
     document.getElementById("errorAlert").style.display='block';
     document.getElementById("errorAlert").innerHTML="Please Give Valid Location";
     document.getElementById("geocomplete").focus();
     return false;
     }

     if(inValidCity!="" && inValidCity=="InvalidCity"){
     document.getElementById("errorAlert").style.display='block';
     document.getElementById("errorAlert").innerHTML="Please Enter a location in the selected city - "+$("#cityNameSelected").val();
     document.getElementById("geocomplete").focus();
     return false;
     }

     var alternativeName=document.getElementById("alternativeName").value;
     if(alternativeName.indexOf(cityName) ==-1){
     document.getElementById("errorAlert").style.display='block';
     document.getElementById("errorAlert").innerHTML="Please Enter a location in the selected city - "+$("#cityNameSelected").val();
     document.getElementById("geocomplete").focus();
     return false;
     }*/
    if(location == "" || location == undefined) {
        document.getElementById("errorAlert").style.display='block';
        document.getElementById("errorAlert").innerHTML="Invalid Location";
        document.getElementById("geocomplete").focus();
        return false;
    }
    if(address1==null || address1==""){

        document.getElementById("errorAlert").style.display='block';
        document.getElementById("errorAlert").innerHTML="Please Give Address";
        document.getElementById("address1").focus();
        return false;
    }


    $('#screen-fade').modal('show');
    $('.btn_submit').attr('disabled',true);
    document.forms[formName].submit();
}
function checkcity(cityNameOption,page){
    document.getElementById("hidden_fields").innerHTML='<input type="hidden" value="'+cityNameOption+'" id="cityNameOption" name="cityNameOption">';
    if(page=='6'){
        document.getElementById('text_selectedcity').innerHTML=cityNameOption;
    }
    if(page=='beauty'){
        $('.tab-content').hide();
        $('#'+cityNameOption).show();
        if($("#beauty_val").length > 0){
            document.getElementById("beauty_val").innerHTML=cityNameOption;
        }
    }
    if($("#selectedcity").length > 0){
        document.getElementById('selectedcity').innerHTML='<a href="#myModal" data-toggle="modal">'+cityNameOption+'</a>';
    }
    if($("#cityNameOption11").length > 0){
        document.getElementById("cityNameOption11").value=cityNameOption;
    }
    $(".groomLi").removeClass('active');
    $(".handLi").removeClass('active');
    $(".hairLi").removeClass('active');
    $(".groomLi").addClass('active');

    $(".groom").attr('href',"#"+cityNameOption+"groom");
    $(".hand").attr('href',"#"+cityNameOption+"hand");
    $(".hair").attr('href',"#"+cityNameOption+"hair");
    $("#userName").focus();
    closeLoginModal1();
}
function closeLoginModal1(){
    $('#myModal').modal('hide');
}
function cityonchange(val){
    //alert(val);
    //$('.tab-content').hide();
    if(val == 'bangalore' || val == 'mumbai'){ var d1 = '<div class="tab-content"><div id="info-tab1" class="tab-pane active"><div class="inner-block row"><div class="col-md-3"><h2>Threading</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Eyebrows</td> <td class="fd-fnt">Rs 50</td> </tr> <tr> <td>Upperlip</td> <td class="fd-fnt">Rs 30</td> </tr> <tr> <td>Chin</td> <td class="fd-fnt">Rs 25</td> </tr> <tr> <td>Lower Lip</td> <td class="fd-fnt">Rs 25</td> </tr> <tr> <td>Forehead</td> <td class="fd-fnt">Rs 25</td> </tr> <tr> <td>Face</td> <td class="fd-fnt">Rs 100</td> </tr> </tbody></table><h2>Face Massage</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Face Massage</td> <td class="fd-fnt">Rs 250</td> </tr></tbody></table></div><div class="col-md-3"><h2>Waxing <span style="font-size:13px; color:#7d7d7d;">(Normal/Detan)</span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Full Arms</td> <td class="fd-fnt">Rs (199/299) </td> </tr> <tr> <td>Half Legs</td> <td class="fd-fnt">Rs (149/249)</td> </tr> <tr> <td>Full Legs</td> <td class="fd-fnt">Rs (249/349)</td> </tr> <tr> <td>Stomach</td> <td class="fd-fnt">Rs (199/299)</td> </tr> <tr> <td>Back</td> <td class="fd-fnt">Rs (199/299)</td> </tr> <tr> <td>Full Body</td> <td class="fd-fnt">Rs (600/999)</td> </tr> <tr> <td>Underarms</td> <td class="fd-fnt">Rs (100/149)</td> </tr> <tr> <td>Brazilian</td> <td class="fd-fnt">Rs (1000/-)</td> </tr> </tbody></table><h2>Body Polish</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Body Polish</td> <td class="fd-fnt">Rs 1500</td> </tr></tbody></table></div><div class="col-md-3"><h2>Bleaching</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upper Lip</td> <td class="fd-fnt">Rs 49</td> </tr> <tr> <td>Face &amp; Neck</td> <td class="fd-fnt">Rs 299</td> </tr> <tr> <td>Full Hands</td> <td class="fd-fnt">Rs 199</td> </tr> <tr> <td>Full Back</td> <td class="fd-fnt">Rs 199</td> </tr> <tr> <td>Full Front</td> <td class="fd-fnt">Rs 199</td> </tr> <tr> <td>Full Legs</td> <td class="fd-fnt">Rs 399</td> </tr> <tr> <td>Face, Neck &amp; Back</td> <td class="fd-fnt">Rs 399</td> </tr> <tr> <td>Full Body</td> <td class="fd-fnt">Rs 899</td> </tr> </tbody></table><h2>Clean-Up</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Clean-Up</td> <td class="fd-fnt">Rs 600</td> </tr></tbody></table></div><div class="col-md-3"> <h2>Facials <span style="font-size:13px; color:#7d7d7d;">(Lotus Natural/Lotus Marmalade)</span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Fairness</td> <td class="fd-fnt">Rs (999/1499)</td> </tr> <tr> <td>Radiance</td> <td class="fd-fnt">Rs (899/1399)</td> </tr> <tr> <td>Anti Blemish</td> <td class="fd-fnt">Rs (899/1399)</td> </tr> <tr> <td>Anti Acne</td> <td class="fd-fnt">Rs (899/1399)</td> </tr></tbody></table><h2>Make-up &amp; Hair</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Hair &amp; Make up</td> <td class="fd-fnt">Rs. 1500- Rs. 4000</td> </tr> <tr> <td>Bridal Makeover (Makeup, Hair &amp; Saree Draping)</td> <td class="fd-fnt">Rs 5000</td> </tr> <tr> <td>Saree Draping </td> <td class="fd-fnt">Rs 600</td> </tr></tbody></table></div></div></div><div id="info-tab2" class="tab-pane"><div class="inner-block row"><div class="col-md-6"><h2>Pedicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic</td> <td class="fd-fnt">Rs 249</td> </tr> <tr> <td>Spa</td> <td class="fd-fnt">Rs 399</td> </tr> <tr> <td>Crystal Spa</td> <td class="fd-fnt">Rs 599</td> </tr> <tr> <td>Basic Cut, File &amp; Polish </td> <td class="fd-fnt">Rs 150 </td> </tr></tbody></table></div><div class="col-md-6"><h2>Manicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic</td> <td class="fd-fnt">Rs 149</td> </tr> <tr> <td>Spa</td> <td class="fd-fnt">Rs 199</td> </tr> <tr> <td>Crystal Spa</td> <td class="fd-fnt">Rs 399</td> </tr> <tr> <td>Basic Cut, File &amp; Polish </td> <td class="fd-fnt">Rs 100 </td> </tr></tbody></table></div></div></div><div id="info-tab3" class="tab-pane"><div class="inner-block row"><div class="col-md-3"><h2>Blow Drying</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 249</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 349</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 399</td> </tr></tbody></table><h2>Hair Ironing</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 299</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 399</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 499</td> </tr></tbody></table></div><div class="col-md-3"><h2>Global Hair colour</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Up to shoulder</td> <td class="fd-fnt">Rs 1999</td> </tr> <tr> <td>Shoulder to waist</td> <td class="fd-fnt">Rs 2999</td> </tr> <tr> <td>Below waist</td> <td class="fd-fnt">Rs 4999</td> </tr></tbody></table><h2>Hair Color</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Root touch up</td> <td class="fd-fnt">Rs 599</td> </tr></tbody></table></div><div class="col-md-3"><h2>Hair Trimming</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Simple Trim</td> <td class="fd-fnt">Rs 299</td> </tr> <tr> <td>Layered Trim ( recreating style)</td> <td class="fd-fnt">Rs 499</td> </tr></tbody></table><h2>Hair Spa</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 599</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 799</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 1099</td> </tr></tbody></table></div><div class="col-md-3"><h2>Head Massage</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Head Massage</td> <td class="fd-fnt">Rs 250</td> </tr></tbody></table><h2>Henna Application</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Henna Application</td> <td class="fd-fnt">Rs 600</td> </tr></tbody></table></div></div></div></div>'}
    if(val == 'pune'){ var d1 = '<div class="tab-content"><div class="tab-pane active" id="info-tab1"><div class="inner-block row"><div class="col-md-3"><h2>Threading</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Eyebrows</td><td class="fd-fnt">Rs 40</td></tr><tr> <td>Upperlip</td><td class="fd-fnt">Rs 40</td></tr><tr> <td>Chin</td><td class="fd-fnt">Rs 40</td></tr><tr> <td>Lower Lip</td><td class="fd-fnt">Rs 40</td></tr><tr> <td>Forehead</td><td class="fd-fnt">Rs 40</td></tr><tr> <td>Face</td><td class="fd-fnt">Rs 120</td></tr></tbody></table><h2>Body Services</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Back Massage</td><td class="fd-fnt">Rs 399</td></tr><tr> <td>Body massage with oil</td><td class="fd-fnt">Rs 999</td></tr><tr> <td>Back Sparkling</td><td class="fd-fnt">Rs 999</td></tr><tr> <td>Body Sparkling </td><td class="fd-fnt">Rs 3999</td></tr></tbody></table></div><div class="col-md-3"><h2>Waxing <span style="font-size:13px; color:#7d7d7d;">(Regular/Chocolate/Rica)</span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Full Arms</td><td class="fd-fnt">Rs (150/200/300) </td></tr><tr> <td>Half Arms</td><td class="fd-fnt">Rs (100/150/250) </td></tr></tr><tr> <td>Underarms</td><td class="fd-fnt">Rs (50/80/110)</td></tr><tr> <td>Full Legs</td><td class="fd-fnt">Rs (250/300/450)</td></tr><tr> <td>Half Legs</td><td class="fd-fnt">Rs (150/200/300)</td></tr><tr> <td>Stomach</td><td class="fd-fnt">Rs (150/200/350)</td></tr><tr> <td>Full Back</td><td class="fd-fnt">Rs (250/300/400)</td></tr><tr> <td>Full Body</td><td class="fd-fnt">Rs (699/999/1299)</td><tr> <td>Face</td><td class="fd-fnt">Rs (100/130/NA)</td></tr></tbody></table></div><div class="col-md-3"><h2>Bleaching</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upper Lip</td><td class="fd-fnt">Rs 49</td></tr><tr> <td>Face &amp; Neck</td><td class="fd-fnt">Rs 199</td></tr><tr> <td>Full Hands</td><td class="fd-fnt">Rs 199</td></tr><tr> <td>Full Back</td><td class="fd-fnt">Rs 199</td></tr><tr> <td>Full Front</td><td class="fd-fnt">Rs 199</td></tr><tr> <td>Underarms</td><td class="fd-fnt">Rs 89</td></tr><tr> <td>Full Legs</td><td class="fd-fnt">Rs 399</td></tr><tr> <td>Full Body</td><td class="fd-fnt">Rs 899</td></tr></tbody></table></div><div class="col-md-3"> <h2>Facials <span style="font-size:13px; color:#7d7d7d;">(Lotus Natural/Lotus Marmalade)</span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Fairness</td><td class="fd-fnt">Rs (999/1499)</td></tr><tr> <td>Radiance</td><td class="fd-fnt">Rs (899/1499)</td></tr><tr> <td>Anti Blemish</td><td class="fd-fnt">Rs (899/1499)</td></tr></tbody></table><h2>Make-up & Hair</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic Make up</td><td class="fd-fnt">Rs. 799</td></tr><tr> <td>Party Make up</td><td class="fd-fnt">Rs. 1999</td></tr><tr> <td>Bridal Make up + Draping + Hair Styling</td><td class="fd-fnt">Rs 7999</td></tr><tr> <td>Saree Draping </td><td class="fd-fnt">Rs 299</td></tr></tbody></table></div></div></div><div class="tab-pane" id="info-tab2"><div class="inner-block row"><div class="col-md-6"><h2>Pedicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody> <tr> <td>Regular (45mins)</td><td class="fd-fnt">Rs 349</td></tr><tr> <td>Leg Beautfying Spa ( 60mins)</td><td class="fd-fnt">Rs 549</td></tr><tr> <td>Crystal Spa ( 80mins)</td><td class="fd-fnt">Rs 749</td></tr></tbody></table></div><div class="col-md-6"><h2>Manicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Regular (30mins)</td><td class="fd-fnt">Rs 249</td></tr><tr> <td>Hand Beautfying Spa ( 45mins)</td><td class="fd-fnt">Rs 399</td></tr><tr> <td>Crystal Spa ( 60mins)</td><td class="fd-fnt">Rs 499</td></tr></tbody></table></div></div></div><div class="tab-pane" id="info-tab3"><div class="inner-block row"><div class="col-md-3"><h2>Blow Drying</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td><td class="fd-fnt">Rs 249</td></tr><tr> <td>Below Shoulder</td><td class="fd-fnt">Rs 399</td></tr><tr> <td>Upto Waist</td><td class="fd-fnt">Rs 499</td></tr></tbody></table><h2>Hair Ironing</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td><td class="fd-fnt">Rs 299</td></tr><tr> <td>Below Shoulder</td><td class="fd-fnt">Rs 399</td></tr><tr> <td>Upto Waist</td><td class="fd-fnt">Rs 499</td></tr></tbody></table></div><div class="col-md-3"><h2>Global Hair colour <span style="font-size:13px; color:#7d7d7d;">(Normal/INOA)</span> </h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Up to shoulder</td><td class="fd-fnt">Rs (1499/1999)</td></tr><tr> <td>Below Shoulder</td><td class="fd-fnt">Rs (2499/2999)</td></tr><tr> <td>Below Waist</td><td class="fd-fnt">Rs (4499/4999)</td></tr></tbody></table><h2>Hair Color <span style="font-size:13px; color:#7d7d7d;">(Normal/INOA)</span> </h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Root Touch-up upto 2inchs</td><td class="fd-fnt">Rs (799/849)</td></tr><tr> <td>Root Touch-up upto 4inchs</td><td class="fd-fnt">Rs (999/1099)</td></tr><tr> <td>Colour Streak (per streak)</td><td class="fd-fnt">Rs (199/249)</td></tr></tbody></table></div><div class="col-md-3"><h2>Hair Styling</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic Styling(Tongs , blow dry, Pin- up)</td><td class="fd-fnt">Rs 599</td></tr><tr> <td>Up-do(Pre- Styling+Bun+Knot)</td><td class="fd-fnt">Rs 999</td></tr></tbody></table><h2>Hair Spa</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td><td class="fd-fnt">Rs 599</td></tr><tr> <td>Below Shoulder</td><td class="fd-fnt">Rs 799</td></tr><tr> <td>Upto Waist</td><td class="fd-fnt">Rs 1099</td></tr><tr> <td>Below Waist</td><td class="fd-fnt">Rs 1199</td></tr></tbody></table></div><div class="col-md-3"><h2>Head Massage</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Olive Oil </td><td class="fd-fnt">Rs 299</td></tr><tr> <td> Aroma Oil </td><td class="fd-fnt">Rs 299</td></tr><tr> <td>Coconut Oil </td><td class="fd-fnt">Rs 299</td></tr></tbody></table><h2>Henna Application</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td><td class="fd-fnt">Rs 299</td></tr><tr> <td>Below Shoulder</td><td class="fd-fnt">Rs 449</td></tr><tr> <td>Upto Waist</td><td class="fd-fnt">Rs 599</td></tr></tbody></table></div></div></div></div>';}
    if(val == 'ahmedabad'){ var d1 = '<div class="tab-content"><div id="info-tab1" class="tab-pane active"><div class="inner-block row"><div class="col-md-3"><h2>Threading</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Eyebrows</td> <td class="fd-fnt">Rs 40</td> </tr> <tr> <td>Upperlip</td> <td class="fd-fnt">Rs 24</td> </tr> <tr> <td>Chin</td> <td class="fd-fnt">Rs 20</td> </tr> <tr> <td>Lower Lip</td> <td class="fd-fnt">Rs 20</td> </tr> <tr> <td>Forehead</td> <td class="fd-fnt">Rs 25</td> </tr> <tr> <td>Face</td> <td class="fd-fnt">Rs 80</td> </tr> </tbody></table></div><div class="col-md-3"><h2>Waxing <span style="font-size:13px; color:#7d7d7d;"></span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Full Arms</td> <td class="fd-fnt">Rs 240</td> </tr> <tr> <td>Half Legs</td> <td class="fd-fnt">Rs 200</td> </tr> <tr> <td>Full Legs</td> <td class="fd-fnt">Rs 280</td> </tr> <tr> <td>Stomach</td> <td class="fd-fnt">Rs 240</td> </tr> <tr> <td>Back</td> <td class="fd-fnt">Rs 240</td> </tr> <tr> <td>Full Body</td> <td class="fd-fnt">Rs 800</td> </tr> <tr> <td>Underarms</td> <td class="fd-fnt">Rs 120</td> </tr> <tr> <td>Brazilian</td> <td class="fd-fnt">Rs 800</td> </tr> </tbody></table></div><div class="col-md-3"><h2>Bleaching</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upper Lip</td> <td class="fd-fnt">Rs 40</td> </tr> <tr> <td>Face &amp; Neck</td> <td class="fd-fnt">Rs 240</td> </tr> <tr> <td>Full Hands</td> <td class="fd-fnt">Rs 160</td> </tr> <tr> <td>Full Back</td> <td class="fd-fnt">Rs 160</td> </tr> <tr> <td>Full Front</td> <td class="fd-fnt">Rs 160</td> </tr> <tr> <td>Full Legs</td> <td class="fd-fnt">Rs 320</td> </tr> <tr> <td>Face, Neck &amp; Back</td> <td class="fd-fnt">Rs 320</td> </tr> <tr> <td>Full Body</td> <td class="fd-fnt">Rs 720</td> </tr> </tbody></table></div><div class="col-md-3"> <h2>Facials <span style="font-size:13px; color:#7d7d7d;"></span></h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Fairness</td> <td class="fd-fnt">Rs 1200</td> </tr> <tr> <td>Radiance</td> <td class="fd-fnt">Rs 1120</td> </tr> <tr> <td>Anti Blemish</td> <td class="fd-fnt">Rs 1120</td> </tr> <tr> <td>Anti Acne</td> <td class="fd-fnt">Rs 1120</td> </tr></tbody></table></div></div></div><div id="info-tab2" class="tab-pane"><div class="inner-block row"><div class="col-md-6"><h2>Pedicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic</td> <td class="fd-fnt">Rs 150</td> </tr> <tr> <td>Spa</td> <td class="fd-fnt">Rs 300</td> </tr> <tr> <td>Crystal Spa</td> <td class="fd-fnt">Rs 500</td> </tr></tbody></table></div><div class="col-md-6"><h2>Manicure</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Basic</td> <td class="fd-fnt">Rs 100</td> </tr> <tr> <td>Spa</td> <td class="fd-fnt">Rs 150</td> </tr> <tr> <td>Crystal Spa</td> <td class="fd-fnt">Rs 300</td> </tr></tbody></table></div></div></div><div id="info-tab3" class="tab-pane"><div class="inner-block row"><div class="col-md-3"><h2>Blow Drying</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 250</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 250</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 350</td> </tr></tbody></table><h2>Hair Ironing</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 250</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 350</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 350</td> </tr></tbody></table></div><div class="col-md-3"><h2>Global Hair colour</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Up to shoulder</td> <td class="fd-fnt">Rs 1000</td> </tr> <tr> <td>Shoulder to waist</td> <td class="fd-fnt">Rs 2000</td> </tr> <tr> <td>Below waist</td> <td class="fd-fnt">Rs 4000</td> </tr></tbody></table><h2>Hair Color</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Root touch up</td> <td class="fd-fnt">Rs 500</td> </tr></tbody></table></div><div class="col-md-3"><h2>Hair Trimming</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Simple Trim</td> <td class="fd-fnt">Rs 250</td> </tr> <tr> <td>Layered Trim ( recreating style)</td> <td class="fd-fnt">Rs 350</td> </tr></tbody></table><h2>Hair Spa</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Upto Shoulder</td> <td class="fd-fnt">Rs 450</td> </tr> <tr> <td>Shoulder to Waist</td> <td class="fd-fnt">Rs 600</td> </tr> <tr> <td>Below Waist</td> <td class="fd-fnt">Rs 800</td> </tr></tbody></table></div><div class="col-md-3"><h2>Head Massage</h2><table width="100%" cellspacing="10" cellpadding="10" border="0"> <tbody><tr> <td>Head Massage</td> <td class="fd-fnt">Rs 175</td> </tr></tbody></table></div></div></div></div>'}
    $( "li.tab-img1" ).addClass( "tab-img1 active" );
    $( "li.tab-img2" ).removeClass( "tab-img2 active" ).addClass( "tab-img2" );
    $( "li.tab-img3" ).removeClass( "tab-img3 active" ).addClass( "tab-img3" );
    $('#service_content').html(d1);
}
function validateLandingFeildsServices(type){
    $(".housejoy-alert").addClass("hide");
    if(  $("#cityNameOption_"+type).length > 0 && $("#cityNameOption_"+type).val()==""){
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Select A City");
        document.getElementById("cityNameOption_"+type).focus();
        return false;
    }
    if(  $("#cityName_"+type).length > 0 && $("#cityName_"+type).val()==""){
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Select A City");
        document.getElementById("cityName_"+type).focus();
        return false;
    }
    if($("#userName_"+type).val()==null || $("#userName_"+type).val().trim()==""){
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Name Required..");
        document.getElementById("userName_"+type).focus();
        return false;
    }
    if($("#mobileNumber_"+type).val()==null || $("#mobileNumber_"+type).val()==""){
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Mobile Number Required..");
        document.getElementById("mobileNumber_"+type).focus();
        return false;
    }else if (isNaN($("#mobileNumber_"+type).val())) {
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("The phone number contains illegal characters.");
        document.getElementById("mobileNumber_"+type).focus();
        return false;
    }else if (!($("#mobileNumber_"+type).val().length >= 10) || !($("#mobileNumber_"+type).val().length <= 12)) {
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Enter Valid 10 digit Contact Number");
        $("#mobileNumber_"+type).focus();
        return false;
    }
    if(!validateEmail($("#userEmailid_"+type).val())){
        $(".housejoy-alert_"+type).removeClass("hide");
        $(".required_input_"+type).text("Provide Valid Emailid...");
        document.getElementById("userEmailid_"+type).focus();
        return false;
    }
    return true;
}
function cityonchangepricelist(svc,city){
    $.ajax({
        url: '/get_price_service_city/'+svc+'/'+city,
        type:'post',
        success: function(data) {
            console.log(data);
            var resp_obj = $.parseJSON(data);
            options = '<table width="70%" class="pricing"><thead><tr><th><strong>TYPE</strong></th><th><strong>Price</strong></th></tr></thead><tbody>';
            $.each(resp_obj['parent'], function (index, element) {
                options = options + '<tr><td>'+element['name']+'</td><td>'+element['cost']+'</td></tr>';
            });
            options = options + '</tbody></table>';
            $('#price_homecleaning').html(options);
        }
    });
}