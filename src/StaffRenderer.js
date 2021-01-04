/*
    (c) 2020 musictheory.net, LLC
    MIT License, https://opensource.org/licenses/MIT
*/

class StaffRenderer {

constructor(objectElement)
{
    this._objectElement = objectElement;
    this._position = 0;
    this._accidental = 0;
    this._usesBassClef = false;

    $.listen(objectElement, "load", () => {
        this._update();
    });
}


_update()
{
    let svgDocument = this._objectElement.contentDocument;
    if (!svgDocument) return;
    if (!svgDocument.getElementById) return;

    if (this._objectElement) {
        this._objectElement.classList.remove("hidden");
    }

    function getSVGElement(id) {
        return svgDocument.getElementById(id);
    }

    function transform(element, x, y) {
        element.setAttribute("transform", "translate(" + x + "," + y + ")");
    }

    function setVisible(element, visible) {
        element.style.visibility = visible ? "visible" : "hidden";
    }

    const flatElement     = getSVGElement("Flat");
    const sharpElement    = getSVGElement("Sharp");
    const upNoteElement   = getSVGElement("UpNote");
    const downNoteElement = getSVGElement("DownNote");

    if (!flatElement || !sharpElement || !upNoteElement || !downNoteElement) {
        return;
    }

    const position     = this._position;
    const accidental   = this._accidental;
    const usesBassClef = this._usesBassClef;

    setVisible( getSVGElement("TrebleClef"), !usesBassClef);
    setVisible( getSVGElement("BassClef"),    usesBassClef);

    setVisible( flatElement,  accidental < 0 );
    setVisible( sharpElement, accidental > 0 );

    setVisible( upNoteElement,   position < 0 );
    setVisible( downNoteElement, position >= 0 );

    setVisible( getSVGElement("TopLedger1"), position >= 6  );
    setVisible( getSVGElement("TopLedger2"), position >= 8  );
    setVisible( getSVGElement("TopLedger3"), position >= 10 );
    setVisible( getSVGElement("TopLedger4"), position >= 12 );

    setVisible( getSVGElement("BottomLedger1"), position <= -6  );
    setVisible( getSVGElement("BottomLedger2"), position <= -8  );
    setVisible( getSVGElement("BottomLedger3"), position <= -10 );
    setVisible( getSVGElement("BottomLedger4"), position <= -12 );

    let positionDelta = position * -20;
    let flatDelta = (position % 2) ? -2 : 0;

    transform( downNoteElement, 326, 270 + positionDelta);
    transform( upNoteElement,   326, 150 + positionDelta);
    transform( flatElement,     264, 210 + positionDelta + flatDelta);
    transform( sharpElement,    261, 230 + positionDelta);
}


set position(position)
{
    this._position = position;
    this._update();
}


get position()
{
    return this._position;
}


set accidental(accidental)
{
    this._accidental = accidental;
    this._update();
}


get accidental()
{
    return this._accidental;
}


set usesBassClef(usesBassClef)
{
    this._usesBassClef = usesBassClef;
    this._update();
}


get usesBassClef()
{
    return this._usesBassClef;
}

}


export default StaffRenderer;
