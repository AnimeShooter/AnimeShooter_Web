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
    document.getElementById(name).style.display = "block"
}