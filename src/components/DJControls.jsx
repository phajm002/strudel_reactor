function DJ_Controls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">set CPM</span>
                <input type="text" id="cpm_text_input" className="form-control" placeholder="120" />
            </div>

            <label for="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="range3" />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="ma1" />
                <label className="form-check-label" htmlFor="ma1">
                        Main Arrpeggio
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                        Drums
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                    Drums 2
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2"  />
                <label className="form-check-label" htmlFor="d2">
                        Bass
                    </label>
            </div>
      

        </>
        
  );
}

export default DJ_Controls;