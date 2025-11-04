function PreprocessTextArea({ defaultValue, onChange }) {

    const textAreaStyling = {
        color: "",
        backgroundColor: "lightgray",
        padding: "10px",
        fontFamily: "Arial"
    }

    const labelForStyling = {
        width: "50px",
        height: "50px",
        size: 10,
    }

    return (
        <>
            <label style={labelForStyling} htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea style={textAreaStyling} className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
  );
}

export default PreprocessTextArea;