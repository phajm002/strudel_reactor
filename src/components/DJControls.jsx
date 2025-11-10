
import { useState } from "react";


function DJ_Controls({onVolumeChange, onCpmChange}) {

    const [dropdown, setDropdown] = useState(true);

    // toggles the dropdowns
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    // The use state for the instrument control, default should be true
    // The main instruments to be controlled
    //const [instrument, setInstrument] = useState({
    //    main_arp: true,
    //    drums: true,
    //    drums2: true,
    //    bass: true,
    //    xylophone: true
    //})

    return (
        <>
            <div className="input-group mb-3">
                <button className="input-group-text" id="basic-addon1">set CPM</button>
                <input type="text" id="cpm_text_input" className="form-control" onclick={onCpmChange} placeholder="40" />
            </div>


            <label htmlFor="volume_range" style={{ color: "white" }} className="form-label">Volume: </label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />


            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button"
                    id="instruments"
                    onClick={toggleDropdown}>
                    Toggle Instruments
                </button>


                {dropdown && (
                    <ul className="dropdown-menu show" style={{ display: "block", position: "absolute" }}>
                        <li>
                            <input type="checkbox"/>
                            <label>Main Arpeggio</label>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <label>Drums</label>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <label>Drums 2</label>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <label>Bass</label>
                        </li>
                        <li>
                            <input type="checkbox"/>
                            <label>Xylophone</label>
                        </li>
                    </ul>
                )}
            </div>

        </>

    );
}

export default DJ_Controls;