// Add the current protocol and hostname to all elements with class ".add-href".
// Example: path/to/document.html => https://current.host.name/path/to/document.html
var href = window.location.href;
var elements = document.querySelectorAll('.add-href');
for (var i = 0; i < elements.length; i++) {
    var linkAndText = href + elements[i].innerHTML;
    elements[i].innerHTML = '<a href="' + linkAndText + '">' + linkAndText + '</a>';
}