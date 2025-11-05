function PreprocessTextArea({ defaultValue, onChange }) {

    const textAreaStyling = {
        color: "white",
        backgroundColor: "black",
        padding: "10px",
        fontFamily: "Arial"
    }

    return (
        <>
            <textarea style={textAreaStyling} className="form-control" rows="20" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
  );
}

export default PreprocessTextArea;