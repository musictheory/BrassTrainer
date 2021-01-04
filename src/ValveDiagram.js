/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

class ValveDiagram extends HTMLElement {

constructor(label)
{
    super();

    this.classList.add("ValveDiagram");

    this.valveString = "";
    this.highlightColor = ValveDiagram.DefaultColor;
}


_update()
{
    $.empty(this);

    let valveString = this._valveString || "";

    for (let i = 0; i < this._valveString.length; i++) {
        let element = $.create("div", { "class": "ValveDiagram-valve" }, ("" + (i + 1)));

        if (valveString.charAt(i) == "1") {
            element.classList.add("active");
        }

        if (this._highlightColor == ValveDiagram.RedColor) {
            element.classList.add("red");
        } else if (this._highlightColor == ValveDiagram.GreenColor) {
            element.classList.add("green");
        }

        $.append(this, element);
    }
}


set highlightColor(highlightColor)
{
    if (highlightColor != this._highlightColor) {
        this._highlightColor = highlightColor;
        this._update();
    }
}


get highlightColor()
{
    return this._highlightColor;
}


set valveString(valveString)
{
    if (valveString != this._valveString) {
        this._valveString = valveString;
        this._update();
    }
}


get valveString()
{
    return this._valveString;
}


}

ValveDiagram.DefaultColor = 0;
ValveDiagram.GreenColor   = 1;
ValveDiagram.RedColor     = 2;


window.customElements.define("bt-valve", ValveDiagram);

export default ValveDiagram;
