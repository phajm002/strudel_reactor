import { useState } from "react";

function DJ_Controls({ onVolumeChange, onCpmChange, mutedInstruments = [], onMuteChange }) {
    const instruments = ["Main Arpeggio", "Drums", "Drums 2", "Bass", "Xylophone"];

    const handleCheckboxChange = (instrument) => {
        if (mutedInstruments.includes(instrument)) {
            onMuteChange(mutedInstruments.filter((i) => i !== instrument));
        } else {
            onMuteChange([...mutedInstruments, instrument]);
        }
    };

    return (
        <div style={{ color: "white" }}>
            <div className="input-group mb-3">
                <button className="input-group-text">Set CPM</button>
                <input type="text" className="form-control" onChange={onCpmChange} placeholder="40"/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume:</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />

            <div className="mt-3">
                <p>Mute Instruments:</p>
                {instruments.map((inst) => (
                    <div key={inst}>
                        <input
                            type="checkbox"
                            checked={mutedInstruments.includes(inst)}
                            onChange={() => handleCheckboxChange(inst)}
                            id={`mute-${inst}`}
                        />
                        <label htmlFor={`mute-${inst}`} className="ms-1">{inst}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DJ_Controls;
