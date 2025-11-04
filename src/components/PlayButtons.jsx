function PlayButtons({ onPlay, onStop }) {

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
                <button id="play" style={textAreaStyling} className="btn btn-outline" onClick={onPlay}>Play</button>
                <button id="stop" style={textAreaStyling} className="btn btn-outline" onClick={onStop}>Stop</button>
            </div>
        </>
  );
}

export default PlayButtons;