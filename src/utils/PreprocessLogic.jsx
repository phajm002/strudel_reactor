export function Preprocess({ inputText, volume, cpm, muteInstruments = []}) {

   
    // Controls the preprocessing logic, regex reads the text editor
    let outputText = inputText;

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let gainRegex = /(?<!post)gain\(([\d.]+)\)/g;

    // m takes in the output text of regex
    let m;

    // matches is an array of text that has matching elements
    let matches = [];


    if (muteInstruments.length > 0) {

        const instrumentRegex = new RegExp(`^(${muteInstruments.join("|")})\\s*:`, "gm");
        outputText = outputText.replace(instrumentRegex, "_$1:");
    }

    // Replace gain() and cpm() globally
    outputText = outputText.replace(/gain\(([\d.]+)\)/g, (_, num) =>
        `gain(${parseFloat(num) * volume})`
    );

    outputText = outputText.replace(/cpm\(([\d.]+)\)/g, (_, num) =>
        `cpm(${cpm})`
    );

    // log to the console the replaced matches
    console.log(outputText);

    // return matches
    return outputText;
}

