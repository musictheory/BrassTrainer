/*
    (c) 2020-2021 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

import AnswerBar from "./AnswerBar.js";
import HelpController from "./HelpController.js";
import Instrument from "./Instrument.js";
import ScoreBox from "./ScoreBox.js";
import SettingsController from "./SettingsController.js";
import StaffRenderer from "./StaffRenderer.js";
import Utils from "./Utils.js";
import ValveDiagram from "./ValveDiagram.js";

class BrassTrainer {


constructor()
{
    this._question       = null; // The current question
    this._answer         = null; // A string corresponding to the current answer

    this._correctCount   = 0; // The number of correct answers
    this._incorrectCount = 0; // The number of incorrect answers

    this._diatonicIndex  = 0; // The diatonic index of the current note
    this._quality        = 0; // The quality of the current note

    this._showingIncorrect = false;  // Are we showing the "Incorrect" screen
    this._incorrectTimeout = 0;      // setTimeout() id for "Incorrect" screen

    this._pressedKeys = { };

    this._staffRenderer      = new StaffRenderer($.query("#StaffObject"));
    this._helpController     = new HelpController();
    this._settingsController = new SettingsController();

    this._correctScoreBox   = new ScoreBox("Correct");
    this._incorrectScoreBox = new ScoreBox("Incorrect");
    this._percentScoreBox   = new ScoreBox("Percent");

    this._newNoteButton    = $.create("button", { }, "New Note");
    this._settingsButton   = $.create("button", { }, "Show Settings");
    this._helpButton       = $.create("button", { }, "Show Help");
    this._resetScoreButton = $.create("button", { }, "Reset Score");

    $.listen(window, "keydown", e => this._handleKeyDown(e));
    $.listen(window, "keyup",   e => this._handleKeyUp(e));

    $.listen(this._newNoteButton,    "click", e => { this._generateNewNote();         });
    $.listen(this._settingsButton,   "click", e => { this._settingsController.show(); });
    $.listen(this._helpButton,       "click", e => { this._helpController.show();     });
    $.listen(this._resetScoreButton, "click", e => { this._resetScore();              });

    this._settingsController.dismissCallback = () => {
        this._handleSettingsChanged();
    };

    this._bottomArea = $.query("#BottomArea");

    $.append($.query("#ScoreArea"), [
        this._correctScoreBox,
        this._incorrectScoreBox,
        this._percentScoreBox
    ]);

    $.append($.query("#ControlsArea"), [
        this._newNoteButton,
        this._settingsButton,
        this._helpButton,
        this._resetScoreButton
    ]);

    this._answerBar = new AnswerBar();
    $.append($.query("#QuestionArea"), this._answerBar);

    this._instrument = null;  // Current Instrument, setup inside of _handleSettingsChanged
    this._questions  = [ ];   // Array of all questions, setup inside of _handleSettingsChanged

    // Restore settings if "Remember settings" was checked
    {
        let savedSettings = null;

        try {
            savedSettings = window.localStorage.getItem("settings");
            if (savedSettings) savedSettings = JSON.parse(savedSettings);
        } catch (e) { }

        if (savedSettings && savedSettings.remember) {
            this._settingsController.settings = savedSettings;
        }
    }

    this._handleSettingsChanged();

    let appArea = $.query("#AppArea");
    if (appArea) appArea.classList.remove("hidden");

}



// --------------------------------------------------------
// Event Handlers
// --------------------------------------------------------

_handleKeyDown(e)
{
    let code = e.code;

    this._pressedKeys[code] = true;

    if (!this._instrument || this._showingIncorrect) return;

    // Shift+N = New Note
    if (code == "KeyN" && window.event.shiftKey) {
        this._generateNewNote();
        return;
    }

    // For valve instruments, keep track of pressed keys
    if (this._instrument.valveCount > 1) {
        this._updateBottom();

        if (code == "Space" || code == "Enter" || code == "NumpadEnter" || code == "NumpadDecimal") {
            this._submitAnswer();
        }

    // For slide instruments, immediately submit
    } else {
        this._answer = {
            "Digit1": "1", "Numpad1": "1",
            "Digit2": "2", "Numpad2": "2",
            "Digit3": "3", "Numpad3": "3",
            "Digit4": "4", "Numpad4": "4",
            "Digit5": "5", "Numpad5": "5",
            "Digit6": "6", "Numpad6": "6",
            "Digit7": "7", "Numpad7": "7"
        }[e.code];

        if (this._answer) {
            this._submitAnswer();
        }
    }
}


_handleKeyUp(e)
{
    let code = e.code;

    this._pressedKeys[code] = false;

    if (this._instrument && this._instrument.valveCount > 1) {
        this._updateBottom();
    }
}



// --------------------------------------------------------
// UI Updates
// --------------------------------------------------------

_showIncorrect()
{
    if (!this._showingIncorrect) {
        this._showingIncorrect = true;

        this._incorrectTimeout = window.setTimeout(() => {
            this._hideIncorrect();
            this._generateNewNote();
        }, 2000);
    }
}


_hideIncorrect()
{
    if (this._showingIncorrect) {
        window.clearTimeout(this._incorrectTimeout);
        this._incorrectTimeout = 0;
        this._showingIncorrect = false;
    }
}


_updateScore()
{
    let correct   = this._correctCount;
    let incorrect = this._incorrectCount;
    let total     = correct + incorrect;

    let percent   = Math.round(total > 0 ? (correct / total) : 0);

    this._correctScoreBox.value   = this._correctCount;
    this._incorrectScoreBox.value = this._incorrectCount;
    this._percentScoreBox.value   = percent;
}


_updateStaff()
{
    if (!this._question) return;

    this._staffRenderer.usesBassClef = this._instrument.usesBassClef;
    this._staffRenderer.position     = this._question.position;
    this._staffRenderer.accidental   = this._question.quality;
}


_updateBottom()
{
    if (!this._instrument || this._showingIncorrect) return;

    let valveCount = this._instrument.valveCount;

    // Show live valve display for valved instruments
    if (valveCount > 1) {
        let keys = this._pressedKeys;

        let valves = [
            !!(keys["ArrowLeft"]  || keys["Digit1"] || keys["KeyZ"] || keys["KeyA"] || keys["KeyQ"]),
            !!(keys["ArrowDown"]  || keys["Digit2"] || keys["KeyX"] || keys["KeyS"] || keys["KeyW"]),
            !!(keys["ArrowRight"] || keys["Digit3"] || keys["KeyC"] || keys["KeyD"] || keys["KeyE"]),
            !!(keys["Numpad0"]    || keys["Digit4"] || keys["KeyV"] || keys["KeyF"] || keys["KeyR"])
        ];

        if (valves.length > valveCount) {
            valves = valves.slice(0, valveCount);
        }

        if (this._instrument.reversed) {
            valves.reverse();
        }

        this._answer = _.map(valves, v => v ? "1" : "0").join("");

        this._answerBar.showValveInput(this._answer);

    } else {
        this._answerBar.showSlideText();
    }
}


_update()
{
    this._updateScore();
    this._updateStaff();
    this._updateBottom();
}



// --------------------------------------------------------
// Settings
// --------------------------------------------------------

_handleSettingsChanged()
{
    let settings = this._settingsController.settings;

    if (_.isEqual(settings, this._settings)) {
        return;
    }

    let instrument = Instrument.all[settings.instrumentIndex];
    let questions = [ ];

    // Iterate over the permutation of (staffPosition, quality) combinations
    // Filter any invalid answers based on settings
    //
    for (let staffPosition = -10; staffPosition <= 10; staffPosition++) {
        for (let quality = -1; quality <= 1; quality++) {
            let diatonicIndex = instrument.getDiatonicIndex(staffPosition);
            let diatonicLetter = diatonicIndex % 7;
            let MIDIValue = Utils.getMIDINumber(diatonicIndex, quality);

            // Filter out out-of-range notes
            if ((MIDIValue < settings.rangeMin) || (MIDIValue > settings.rangeMax)) {
                continue;
            }

            if (quality == -1) {
                // Filter out all flats
                if (!settings.allowFlats) {
                    continue;
                }

                // Filter out Cb and Fb
                if (!settings.allowCbFb && (diatonicLetter == 0 || diatonicLetter == 3)) {
                    continue;
                }
            }

            if (quality == 1) {
                // Filter out all sharps
                if (!settings.allowSharps) {
                    continue;
                }

                // Filter out B# and E#
                if (!settings.allowBsEs && (diatonicLetter == 6 || diatonicLetter == 2)) {
                    continue;
                }
            }

            questions.push({
                diatonicIndex: diatonicIndex,
                position: staffPosition,
                quality: quality,
                MIDIValue: MIDIValue
            })
        }
    }

    this._instrument = instrument;
    this._questions  = questions;
    this._settings   = settings;

    if (settings.remember) {
        try {
            window.localStorage.setItem("settings", JSON.stringify(settings));
        } catch (e) { }
    }

    this._generateNewNote();
}


// --------------------------------------------------------
// Actions
// --------------------------------------------------------

_submitAnswer()
{
    let instrument = this._instrument;
    let MIDIValue  = this._question.MIDIValue;
    let correct    = instrument.isAnswerCorrect(MIDIValue, this._answer);

    if (correct) {
        this._correctCount++;
        this._generateNewNote();

    } else {
        this._incorrectCount++;

        let correctAnswers = instrument.getCorrectAnswers(MIDIValue);

        this._answerBar.showAnswer(correctAnswers, this._answer);

        this._showIncorrect();
    }

    this._update();
}


_generateNewNote()
{
    let attempts = 0;

    this._hideIncorrect();

    while (attempts < 1000) {
        attempts++;

        let index = Math.floor(Math.random() * this._questions.length);
        let question = this._questions[index];

        if (this._question) {
            if (this._question.position == question.position) {
                continue;
            }
        }

        this._question = question;
    }

    this._update();
}


_resetScore()
{
    this._correctCount = 0;
    this._incorrectCount = 0;
    this._update();
}


}

$.ready(() => { new BrassTrainer() });

export default BrassTrainer;

