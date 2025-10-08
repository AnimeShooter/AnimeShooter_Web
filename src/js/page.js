/* Events - Using event delegation to handle dynamically created elements */
document.addEventListener('click', function(e) {
    // Login button
    if (e.target && e.target.id === 'account-login-button') {
        e.preventDefault();
        api.userLogin(document.getElementById("account-login-username").value, document.getElementById("account-login-password").value);
    }
    
    // Register button
    if (e.target && e.target.id === 'account-create-button') {
        e.preventDefault();
        // Validate password confirmation
        const password = document.getElementById("account-create-password").value;
        const confirmPassword = document.getElementById("account-create-password2").value;
        
        if (password !== confirmPassword) {
            document.getElementById("account-error").textContent = "Passwords do not match!";
            return;
        }
        
        api.userRegister(document.getElementById("account-create-username").value, document.getElementById("account-create-email").value, password);
    }
    
    // Show register form
    if (e.target && e.target.id === 'show-register') {
        e.preventDefault();
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
        document.getElementById("account-error").textContent = "";
    }
    
    // Show login form
    if (e.target && e.target.id === 'show-login') {
        e.preventDefault();
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        document.getElementById("account-error").textContent = "";
    }
});

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
