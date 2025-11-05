export function Preprocess({ inputText, volume, cpm, instruments }) {

    let outputText = inputText;

    // find instruments
    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;

    let matches = [];

    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        m.forEach((match) => {
            matches.push(match);
        });
    }

    let volumeMatches = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    //let cpmMatches = matches.map(
    //    match => match.replaceAll(/(?<!const)setcpm\(([\d]+)\)/g, (match, captureGroup) =>
    //        `gain(${captureGroup}=${cpm})`
    //    )
    //);

    //let instrumentMatches = matches.map(
    //    match => match.replaceAll(/(?<!const)drums\(([\:]+)\)/g, (match, captureGroup) =>
    //        `gain('_'+${captureGroup})`
    //    )
    //);

    let volumeMatches2 = matches.reduce(
        (text, original, i) => text.replaceAll(original, volumeMatches[i]),
        outputText
    );

    console.log(volumeMatches2);

    return volumeMatches2
}
