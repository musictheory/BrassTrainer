/*
    (c) 2020-2021 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

import ValveDiagram from "./ValveDiagram.js";

class AnswerBar extends HTMLElement {

constructor()
{
    super();

    this.classList.add("AnswerBar");

    this._liveValveDiagram = new ValveDiagram();
    this._liveValveDiagram.highlightColor = ValveDiagram.DefaultColor;

    this._liveAnswerStripe = this._makeAnswerStripe("", this._liveValveDiagram);

    this._slideTextElement = $.create("div", { "class": "AnswerBar-slide-text" }, [
        "Press ",
        $.create("span", { "class": "KeyCap" }, "1"),
        " - ",
        $.create("span", { "class": "KeyCap" }, "7"),
        " to submit a slide position."
    ]);
}


_makeAnswerStripe(label, middleElements, middleFlex)
{
    let middle = $.create("div", {  });

    if (middleFlex) {
        middle.classList.add("AnswerBar-stripe-middle-flex");
    }

    $.append(middle, middleElements);

    return $.create("div", { "class": "AnswerBar-stripe" }, [
        $.create("div", { "class": "AnswerBar-stripe-left" }, label),
        middle,
        $.create("div", { "class": "AnswerBar-stripe-right" })
    ]);
}


showAnswer(correctAnswers, userAnswer)
{
    function makeSlideText(slide) {
        return $.create("span", { "class": "AnswerBar-big-number" }, "" + slide);
    }

    let valveCount = userAnswer ? userAnswer.length : 0;

    let correctElements = [ ];
    let userElements    = [ ];

    if (valveCount > 1) {
        // Make correct answer diagrams
        {
            _.each(correctAnswers, correctAnswer => {
                let valveDiagram = new ValveDiagram();

                valveDiagram.valveString = correctAnswer;
                valveDiagram.highlightColor = ValveDiagram.GreenColor;

                correctElements.push(valveDiagram);
            });
        }

        // Make user's answer diagram
        {
            let valveDiagram = new ValveDiagram();

            valveDiagram.valveString = userAnswer;
            valveDiagram.highlightColor = ValveDiagram.RedColor;

            userElements.push(valveDiagram);
        }

        $.empty(this);

        $.append(this, [
            this._makeAnswerStripe("Correct answer:", correctElements, true),
            this._makeAnswerStripe("Your answer:",    userElements,    true)
        ]);

    } else {
        correctElements.push("Correct answer: ");
        userElements.push("Your answer: ");

        for (let i = 0; i < correctAnswers.length; i++) {
            if (i > 0) correctElements.push(" or ");
            correctElements.push(makeSlideText(correctAnswers[i]));
        }

        userElements.push(makeSlideText(userAnswer));

        $.empty(this);

        $.append(this, [
            this._makeAnswerStripe("", correctElements),
            this._makeAnswerStripe("", userElements)
        ]);
    }

}


showValveInput(answer)
{
    this._liveValveDiagram.valveString = answer;

    $.empty(this);
    $.append(this, this._liveAnswerStripe);
}


showSlideText()
{
    $.empty(this);
    $.append(this, this._slideTextElement);
}


}


window.customElements.define("bt-answer-bar", AnswerBar);

export default AnswerBar;
