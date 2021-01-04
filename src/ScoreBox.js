/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

class ScoreBox extends HTMLElement {

constructor(label)
{
    super();

    this.classList.add("ScoreBox");

    this._scoreElement = $.create("div", { "class": "ScoreBox-score" });
    this._labelElement = $.create("div", { "class": "ScoreBox-label" }, label);

    this.appendChild(this._scoreElement);
    this.appendChild(this._labelElement);
}


set value(value)
{
    this._value = value;
    this._scoreElement.textContent = value;
}

get value()
{
    return this._value;
} 

}

window.customElements.define("score-box", ScoreBox);

export default ScoreBox;
