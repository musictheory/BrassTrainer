/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

class HelpController {

constructor()
{
    $.listen($.query("#HelpArea-hide"), "click", e => {
        this._dismiss();
    });

    $.listen($.query("#HelpArea-shroud"),  "click", e => {
        this._dismiss();        
    });

    $.listen($.query("#HelpArea-content"), "click", e => {
        e.stopPropagation();
    });
}


_dismiss()
{
    $.query("#HelpArea").style.display = "none";
}


show()
{
    $.query("#HelpArea").style.display = "block";
}

}

export default HelpController;
