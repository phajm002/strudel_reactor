import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';

// Created components
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import AudioVisualizerGraph from './components/AudioVisualizerGraph';
import { Preprocess } from './utils/PreprocessLogic'

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// load data and save data to retrieve json items
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadData = (key, defaultValue) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
};

export default function StrudelDemo() {

    // use state for json data
    const [jsonData, setData] = useState({});

    //const [instrument, setInstrument] = useState("");

    const [state, setState] = useState("stop");

    // sets the processing text
    const [procText, setProcText] = useState(stranger_tune)

    const savedData = loadData("appData", { volume: 1, cpm: 20 });

    // use state for volume, instruments and cpm
    const [volume, setVolume] = useState(savedData.volume);
    const [cpm, setCpm] = useState(savedData.cpm);
    const [mutedInstruments, setMutedInstruments] = useState([]);

    // use effect loads the data from app data
    useEffect(() => {
        const save = loadData("appData", { volume: 1, cpm: 35 });
        setVolume(save.volume);
        setCpm(save.cpm);
    }, []);

    // saves the data 
    useEffect(() => {
        saveData("appData", { volume, cpm });
    }, [volume, cpm, mutedInstruments]);

    const hasRun = useRef(false);

    // handles play button
    const handlePlay = () => {

        let outputText = Preprocess({
            inputText: procText,
            volume: volume,
            cpm: cpm,
            muteInstruments: mutedInstruments

        });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    // handles stop button
    const handleStop = () => {
        globalEditor.stop()
    }


    // use effect
    useEffect(() => {

        if (state === "play") {
            handlePlay();
        }
    }, [volume, cpm, mutedInstruments])


    // use effect for the global editor
    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 0.5;
            canvas.height = canvas.height * 0.5;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = stranger_tune
            //SetupButtons()
            //Proc()
        }

        globalEditor.setCode(procText);
    },
    // automatically updates the processing text
    [procText]);


    // returns html info to update react page
    return (
        <div className="app-container">
            <header className="header">
                <h2>Strudel Demo</h2>
            </header>

            <main className="main">
                <section className="graph-section">
                    
                    <div className="App container">
                        <h1 style={{ color: "white" }}>
                            Audio Visualizer
                        </h1>

                        <div className="row">
                            <canvas id="roll" className="pianoroll" style={{ width: "100%", height: "200px", display: "block" }}></canvas>
                            <AudioVisualizerGraph />
                        </div>

                    </div>
                    
                    
                </section>

                <section className="controls-section">                   
                    <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                    <DJControls
                        volumeChange={volume}
                        onVolumeChange={(e) => setVolume(Number(e.target.value))}
                        cpmChange={cpm}
                        onCpmChange={(e) => setCpm(Number(e.target.value))}
                        mutedInstruments={mutedInstruments}
                        onMuteChange={(newMuted) => setMutedInstruments(newMuted)}
                    />
                </section>

                <header className="editor-header">Preprocessing Area</header>
                <section className="editor-section">

                    <div className="text-editor">  
                        <PreprocessTextArea
                            defaultValue={procText}
                            onChange={(e) => setProcText(e.target.value)}
                        />
                    </div>
                    <div className="code-editor">
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    
                </section>
            </main>
        </div>
    );
}