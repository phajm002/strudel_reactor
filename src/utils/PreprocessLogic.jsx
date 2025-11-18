export function Preprocess({ inputText, volume, cpm }) {

   
    // Controls the preprocessing logic, regex reads the text editor
    let outputText = inputText;

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let cpmRegex = /cpm\(([\d.]+)\)/g;

    let gainRegex = /(?<!post)gain\(([\d.]+)\)/g;

    // m takes in the output text of regex
    let m;

    // matches is an array of text that has matching elements
    let matches = [];

    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex)
            regex.lastIndex++;
            matches.push(m[0]);
    }

    // map the matches and then replace match where gain has a . with the captured data multiplied by the volume
    let matchesMapped = matches.map(original => {
        let modified = original;

        modified = modified.replace(gainRegex, (_, captureGroup) =>
            `gain(${captureGroup}*${volume})`
    );
        modified = modified.replace(cpmRegex, (_, captureGroup) =>
            `cpm(${captureGroup}*${cpm})`
        );

        return modified;
        }
    );

    // replace all the matched instances and replace them with the replaced volume matches
    let processed = matches.reduce(
        (text, original, i) => text
            .replace(original, matchesMapped[i]),
        outputText
    );

    outputText = outputText.replace(/cpm\(([\d.]+)\)/g, (_, num) =>
        `cpm(${parseFloat(num) * cpm})`
    );


    // log to the console the replaced matches
    console.log(processed);

    // return matches
    return processed;
}

