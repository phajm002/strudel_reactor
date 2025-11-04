function ProcButtons() {

    const textAreaStyling = {
        color: "black",
        backgroundColor: "lightgray",
        borderColor: "white",
        padding: "10px",
        fontFamily: "Arial"
    }

    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="process" style={textAreaStyling}  className="btn btn-outline">Preprocess</button>
                <button id="process_play" style={textAreaStyling} className="btn btn-outline">Proc & Play</button>
            </div>
        </>
  );
}

export default ProcButtons;