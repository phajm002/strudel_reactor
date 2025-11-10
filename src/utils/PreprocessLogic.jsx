export function Preprocess({ inputText, volume }) {

    // Controls the preprocessing logic, regex reads the text editor
    let outputText = inputText;

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    // m takes in the output text of regex
    let m;

    // matches is an array of text that has matching elements
    let matches = [];

    //
    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex)
            regex.lastIndex++;

        m.forEach((match) => {
            matches.push(match);
        });
    }

    // map the matches and then replace match where gain has a . with the captured data multiplied by the volume
    let volumeMatches = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    // replace all the matched instances and replace them with the replaced volume matches
    let volumeMatches2 = matches.reduce(
        (text, original, i) => text.replaceAll(original, volumeMatches[i]),
        outputText
    );

    // log to the console the replaced matches
    console.log(volumeMatches2);

    // return matches
    return volumeMatches2
}
