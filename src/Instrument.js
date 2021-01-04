/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

import Utils from "./Utils.js";


const TrumpetData = {
    name: "Trumpet",

    presets: [
        { name: "Beginning",    min: "A3",  max: "C5" },
        { name: "Intermediate", min: "F#3", max: "A5" },
        { name: "Advanced",     min: "F#3", max: "C6" }
    ],

    valveCount: 3,

    answers: {
        "F#3": "111",
        "G3":  "101",
        "G#3": "011",
        "A3":  "110",
        "A#3": "100",
        "B3":  "010",

        "C4":  "000",
        "C#4": "111",
        "D4":  "101",
        "D#4": "011",
        "E4":  "110",
        "F4":  "100",
        "F#4": "010",
        "G4":  "000",
        "G#4": "011",
        "A4":  "110",
        "A#4": "100",
        "B4":  "010",

        "C5":  "000",
        "C#5": "110",
        "D5":  "100",
        "D#5": "010",
        "E5":  "000",
        "F5":  "100",
        "F#5": "010",
        "G5":  "000",
        "G#5": "011",
        "A5":  "110",
        "A#5": "100",
        "B5":  "010",

        "C6":  "000"
    }
};

const FrenchHornData = {
    name: "French Horn",

    presets: [
        { name: "Beginning",    min: "A3",  max: "D5" },
        { name: "Intermediate", min: "F3",  max: "F5" },
        { name: "Advanced",     min: "E3",  max: "C6" }
    ],

    valveCount: 3,
    reversed: true,

    answers: {
        "E3":  "110",
        "F3":  "100",
        "F#3": "010",
        "G3":  "000",
        "G#3": "011",
        "A3":  "110",
        "A#3": "100",
        "B3":  "010",

        "C4":  "000",
        "C#4": "110",
        "D4":  "100",
        "D#4": "010",
        "E4":  "000",
        "F4":  "100",
        "F#4": "010",
        "G4":  "000",
        "G#4": "011",
        "A4":  "110",
        "A#4": "100",
        "B4":  "010",

        "C5":  "000",
        "C#5": "010",
        "D5":  "000",
        "D#5": "010",
        "E5":  "000",
        "F5":  "100",
        "F#5": "010",
        "G5":  "000",
        "G#5": "011",
        "A5":  "110",
        "A#5": "100",
        "B5":  "010",

        "C6":  "000"
    }
};

const TromboneData = {
    name: "Trombone",

    presets: [
        { name: "Beginning",    min: "A2",  max: "A#3" },
        { name: "Intermediate", min: "F2",  max: "F4"  },
        { name: "Advanced",     min: "E2",  max: "A#4" }
    ],

    usesBassClef: true,
    valveCount: 0,

    answers: {
        "E2":  7,
        "F2":  6,
        "F#2": 5,
        "G2":  4,
        "G#2": 3,
        "A2":  2,
        "A#2": 1,
        "B2":  7,
        "C3":  6,
        "C#3": 5,
        "D3":  4,
        "D#3": 3,
        "E3":  2,
        "F3":  [ 1, 6 ],
        "F#3": 5,
        "G3":  4,
        "G#3": 3,
        "A3":  [ 2, 6 ],
        "A#3": 1,
        "B3":  4,
        "C4":  3,
        "C#4": 2,
        "D4":  [ 1, 4 ],
        "D#4": 3,
        "E4":  2,
        "F4":  1,
    }
};

const EuphoniumData = {
    name: "Euphonium",

    presets: [
        { name: "Beginning",    min: "A2",  max: "A#3" },
        { name: "Intermediate", min: "F2",  max: "F4"  },
        { name: "Advanced",     min: "E2",  max: "A#4" }
    ],

    usesBassClef: true,
    valveCount: 4,

    answers: {
        "E2":  "0101",
        "F2":  "0001",
        "F#2": "0110",
        "G2":  "1100",
        "G#2": "1000",
        "A2":  "0100",
        "A#2": "0000",
        "B2":  "0101",

        "C3":  "0001",  
        "C#3": "0110",
        "D3":  "1100",
        "D#3": "1000",
        "E3":  "0100",
        "F3":  "0000",
        "F#3": "0110",
        "G3":  "1100",
        "G#3": "1000",
        "A3":  "0100",
        "A#3": "0000",
        "B3":  "1100",

        "C4":  "1000",
        "C#4": "0100",
        "D4":  "0000",
        "D#4": "1000",
        "E4":  "0100",
        "F4":  "0000",
        "F#4": "0110",
        "G4":  "1100",
        "G#4": "1000",
        "A4":  "0100",
        "A#4": "0000"
    }
};


const TubaData = {
    name: "Tuba",

    presets: [
        { name: "Beginning",    min: "A#1",  max: "D3"  },
        { name: "Intermediate", min: "G1",   max: "G3"  },
        { name: "Advanced",     min: "E1",   max: "A#3" }
    ],

    usesBassClef: true,
    valveCount: 4,

    answers: {
        "E1":  "111", 
        "F1":  "101", 
        "F#1": "011", 
        "G1":  "110", 
        "G#1": "100", 
        "A1":  "010", 
        "A#1": "000", 
        "B1":  "111", 

        "C2":  "101",
        "C#2": "011",
        "D2":  "110",
        "D#2": "100",
        "E2":  "010",
        "F3":  "000",
        "F#2": "011",
        "G2":  "110",
        "G#2": "100",
        "A2":  "010",
        "A#2": "000",
        "B2":  "110",

        "C3":  "100",
        "C#3": "010",
        "D3":  "000",
        "D#3": "100",
        "E3":  "010",
        "F3":  "000",
        "F#3": "011",
        "G3":  "110",
        "G#3": "100",
        "A3":  "010",
        "A#3": "000"
    }
};


class Instrument {


constructor(json)
{

    this.usesBassClef = !!json["usesBassClef"];

    let minMIDIValue = 128;
    let maxMIDIValue = 0;

    this._answers = { };
    _.each(json["answers"], (value, key) => {
        const MIDIValue = Utils.parseMIDI(key);

        if (MIDIValue < minMIDIValue) minMIDIValue  = MIDIValue;
        if (MIDIValue > maxMIDIValue) maxMIDIValue = MIDIValue;

        this._answers[MIDIValue] = value;
    });

    this.name       = json["name"];
    this.valveCount = json["valveCount"];
    this.reversed   = json["reversed"];

    this.presets = _.map(json["presets"], preset => {
        return {
            name: preset.name,
            min: Utils.parseMIDI(preset.min),
            max: Utils.parseMIDI(preset.max)
        };
    });

    this.min = minMIDIValue;
    this.max = maxMIDIValue;
}


getCorrectAnswers(MIDIValue)
{
    let answer = this._answers[MIDIValue];

    return _.map(_.flatten([ answer ]), answer => "" + answer);
}


isAnswerCorrect(MIDIValue, answer)
{
    return _.includes(this.getCorrectAnswers(MIDIValue), answer);
}


getStaffPosition(diatonicIndex)
{
    return Utils.getStaffPosition(diatonicIndex, this.usesBassClef);
}


getDiatonicIndex(staffPosition)
{
    return Utils.getDiatonicIndex(staffPosition, this.usesBassClef);
}


}

Instrument.all = [
    new Instrument(TrumpetData),
    new Instrument(FrenchHornData),
    new Instrument(TromboneData),
    new Instrument(EuphoniumData),
    new Instrument(TubaData)
];

export default Instrument;

