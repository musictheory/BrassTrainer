/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

import Instrument from "./Instrument.js";
import Utils from "./Utils.js";

class SettingsController {

constructor()
{
    this.dismissCallback = null;

    this._rootElement         = $.query("#SettingsArea");
    this._instrumentSelect    = $.query("#SettingsInstrument");
    this._presetSelect        = $.query("#SettingsRangePreset");
    this._lowRangeInput       = $.query("#SettingsLowRangeInput");
    this._highRangeInput      = $.query("#SettingsHighRangeInput");
    this._lowRangeLabel       = $.query("#SettingsLowRangeLabel");
    this._highRangeLabel      = $.query("#SettingsHighRangeLabel");
    this._allowSharpsCheckbox = $.query("#SettingsAllowSharps");
    this._allowBsEsCheckbox   = $.query("#SettingsAllowBsEs");
    this._allowFlatsCheckbox  = $.query("#SettingsAllowFlats");
    this._allowCbFbCheckbox   = $.query("#SettingsAllowCbFb");
    this._rememberCheckbox    = $.query("#SettingsRemember");

    $.listen(this._instrumentSelect, "change", e => { this._handleInstrumentChange(e); });
    $.listen(this._presetSelect,     "change", e => { this._handlePresetChange(e);     });
    $.listen(this._lowRangeInput,    "input",  e => { this._handleRangeInput(e);       });
    $.listen(this._highRangeInput,   "input",  e => { this._handleRangeInput(e);       });

    $.listen($.query("#SettingsArea-shroud"), "click", e => { this._dismiss(); });
    $.listen($.query("#SettingsArea-hide"),   "click", e => { this._dismiss(); });

    $.listen($.query("#SettingsArea-content"), "click", e => {
        e.stopPropagation();
    });

    let i = 0;
    _.each(Instrument.all, instrument => {
        $.append(this._instrumentSelect, $.create("option", { "value": i }, instrument.name));
        i++;
    });

    this._instrumentSelect.value = 0;
    this._allowSharpsCheckbox.checked = true;
    this._allowFlatsCheckbox.checked  = true;

    this._handleInstrumentChange();
}



// --------------------------------------------------------
// Private Methods
// --------------------------------------------------------

_dismiss()
{
    this._rootElement.style.display = "none";

    if (this.dismissCallback) {
        this.dismissCallback();
    }
}


_clampAndUpdateRange(rangeInput, labelInput)
{
    let instrument = this._getSelectedInstrument();

    let inValue = parseInt(rangeInput.value, 10);
    let outValue = inValue;

    if (outValue < instrument.min) outValue = instrument.min;
    if (outValue > instrument.max) outValue = instrument.max;

    if (inValue != outValue) {
        rangeInput.value = outValue;
    }

    labelInput.textContent = Utils.getNoteName(outValue);
}


_getSelectedInstrument()
{
    let instrumentIndex = parseInt(this._instrumentSelect.value, 10);
    return Instrument.all[instrumentIndex];
}


_getSelectedPreset()
{
    let presetIndex = parseInt(this._presetSelect.value, 10);
    return this._getSelectedInstrument().presets[presetIndex];
}


// --------------------------------------------------------
// Event Handlers
// --------------------------------------------------------

_handleInstrumentChange(e)
{
    let instrument = this._getSelectedInstrument();

    let presetSelect   = this._presetSelect;
    let lowRangeInput  = this._lowRangeInput;
    let highRangeInput = this._highRangeInput;

    $.empty(presetSelect);

    let i = 0;
    _.each(instrument.presets, preset => {
        $.append(presetSelect, $.create("option", { "value": i }, preset.name));
        i++;
    });

    $.append(presetSelect, $.create("option", { "value": "-1" }, "Custom"));

    lowRangeInput.min = highRangeInput.min = instrument.min;
    lowRangeInput.max = highRangeInput.max = instrument.max;

    this._handlePresetChange(e);
}


_handlePresetChange(e)
{
    let preset = this._getSelectedPreset();

    let lowRangeInput  = this._lowRangeInput;
    let highRangeInput = this._highRangeInput;

    if (preset) {
        lowRangeInput.value  = preset.min;
        highRangeInput.value = preset.max;
    }

    this._handleRangeInput(e);
}


_handleRangeInput(e)
{
    let presetSelect   = this._presetSelect;
    let lowRangeInput  = this._lowRangeInput;
    let highRangeInput = this._highRangeInput;
    let lowRangeLabel  = this._lowRangeLabel;
    let highRangeLabel = this._highRangeLabel;

    this._clampAndUpdateRange(lowRangeInput,  lowRangeLabel);
    this._clampAndUpdateRange(highRangeInput, highRangeLabel);

    let preset = this._getSelectedPreset();
    if (preset) {
        // If the user modified one of the ranges, make sure we select the "Custom" preset
        if (lowRangeInput.value != preset.min || highRangeInput.value != preset.max) {
            presetSelect.value = -1;
        }
    }

    if (e) e.stopPropagation();
}



// --------------------------------------------------------
// Public Methods
// --------------------------------------------------------

show(dismissCallback)
{
    this._rootElement.style.display = "block";
    this._dismissCallback = dismissCallback;
}



// --------------------------------------------------------
// Accessors
// --------------------------------------------------------

set settings(settings)
{
    this._instrumentSelect.value = settings.instrumentIndex;
    this._handleInstrumentChange();

    this._presetSelect.value = settings.presetIndex;
    this._handlePresetChange();

    this._lowRangeInput.value  = settings.rangeMin;
    this._highRangeInput.value = settings.rangeMax;
    this._handleRangeInput();

    this._allowSharpsCheckbox.checked = settings.allowSharps;
    this._allowBsEsCheckbox.checked   = settings.allowBsEs;

    this._allowFlatsCheckbox.checked  = settings.allowFlats;
    this._allowCbFbCheckbox.checked   = settings.allowCbFb;

    this._rememberCheckbox.checked = settings.remember;
}


get settings()
{
    let instrument = this._getSelectedInstrument();

    let rangeMin = parseInt(this._lowRangeInput.value,  10);
    let rangeMax = parseInt(this._highRangeInput.value, 10);

    if (rangeMax < rangeMin) {
        let t = rangeMin;
        rangeMin = rangeMax;
        rangeMax = t;
    }

    return {
        instrumentIndex: Instrument.all.indexOf(instrument),
        presetIndex: parseInt(this._presetSelect.value, 10),

        rangeMin: rangeMin,
        rangeMax: rangeMax,

        allowSharps: this._allowSharpsCheckbox.checked,
        allowBsEs:   this._allowBsEsCheckbox.checked,
        allowFlats:  this._allowFlatsCheckbox.checked,
        allowCbFb:   this._allowCbFbCheckbox.checked,

        remember: this._rememberCheckbox.checked
    };
}


}


export default SettingsController;
