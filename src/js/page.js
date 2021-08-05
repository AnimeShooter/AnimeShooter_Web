/* Events */
document.getElementById("account-login-button").onclick = function() {
    api.userLogin(document.getElementById("account-login-username").value, document.getElementById("account-login-password").value);
}

document.getElementById("account-create-button").onclick = function() {
    api.userRegister(document.getElementById("account-create-username").value, document.getElementById("account-create-email").value,
                    document.getElementById("account-create-password").value); // TODO: check second PW
}

document.getElementById("account-update-button").onclick = function() {
    api.userUpdate(document.getElementById("account-old-password").value, document.getElementById("account-new-password").value); // TOOD check seconds pw
}

document.getElementById("account-logout-button").onclick = function() {
    api.userLogout();
}

document.getElementById("account-pkg-unpack-button").onclick = function() {
    let reader = new FileReader();
    reader.onload = function(){
        api.pkgUnpack(reader.result);
    };
    let file = document.getElementById("account-pkg-unpack-file").files[0];
    reader.readAsArrayBuffer(file); 
}

/* Page */
function selectPage(name)
{
    var pages = document.getElementsByClassName("page")
    for(var i = 0; i < pages.length; i++)
        pages[i].style.display = "none" // hide others
    document.getElementById(name).style.display = "block";
}

function selectOnlinePage(name)
{
    var onlinePages = document.getElementsByClassName("page-online");
    for(var i = 0; i  < onlinePages.length; i++)
        onlinePages[i].style.display = "none";
    document.getElementById(name).style.display = "block";
}

function selectAccountPage(name)
{
    var onlinePages = document.getElementsByClassName("page-account");
    for(var i = 0; i  < onlinePages.length; i++)
        onlinePages[i].style.display = "none";
    document.getElementById(name).style.display = "block";
}
