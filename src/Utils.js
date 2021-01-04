/*
    (c) 2020-2021 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT

    Notes
    -------------------------------------------------------------------

    We use three numeric systems:

    1. MIDI

    Corresponds to pitches or chromatic steps.
    Middle C (C4) has a value of 60. C#4/Db4 is 61. D4 is 62. Etc.

    This file also contains functions to convert between MIDI values and string values.


    2. "Diatonic Indices"

    Corresponds to diatonic note letters. C4 and C#4 both have a diatonic index of
    35. D4 and Db4 have a diatonic index of 36.

                    Diatonic Index 
                    |     MIDI Number
                    |     |
    C2              21    36
    C3              28    48
    C4 (Middle C)   35    60
    E4              37    64
    G4              39    67
    C5              42    72
    C6              49    84

    C4 (Middle C)   35    60
    C#4             35    61
    Db4             36    61
    D4              36    62
    D#4             36    63
    Eb4             37    63
    E4              37    64

    3. Staff Positions

    Corresponds to positions on a staff, with the middle staff line being 0.

        ----      6
               5
    ------------  4
               3
    ------------  2
               1
    ------------  0
              -1
    ------------ -2
              -3
    ------------ -4
              -5
        ----     -6
  
*/


export default {

getMIDINumber: function(diatonicIndex, quality)
{
    return Math.floor(diatonicIndex / 7) * 12 +
        [ 0, 2, 4, 5, 7, 9, 11 ][diatonicIndex % 7] +
        quality;
},


getStaffPosition: function(diatonicIndex, usesBassClef)
{
    return diatonicIndex - (usesBassClef ? 29 : 41);
},


getDiatonicIndex: function(staffPosition, usesBassClef)
{
    return staffPosition + (usesBassClef ? 29 : 41);
},


parseMIDI: function(string)
{
    let m = string.match(/([A-G])([#b])*(\d)/);

    let result = "C D EF G A B".indexOf(m[1]);
    if (result < 0) return 0;

    result += (parseInt(m[3], 10) + 1) * 12;

    if      (m[2] == "#") result++;
    else if (m[2] == "b") result--;
    
    return result;
},


getNoteName: function(MIDIValue)
{
    let name = [
        "C", "C#",
        "D", "D#",
        "E",
        "F", "F#",
        "G", "G#",
        "A", "A#",
        "B"
    ][ MIDIValue % 12 ];

    let octave = Math.floor(MIDIValue / 12) - 1;

    return name + "" + octave;
}


}