import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store';
import { MetronomeWebWorker } from './metronomeWebWorker.service';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { WindowRefService } from './windowRefService.service';

interface NoteObject {
    time: number;
    note: number;
}

/* This version of typescript doesn't recognize these components on the Window, so stub
 * them in for now so that it compiles. */
declare global {
    interface Window {
        webkitAudioContext: any,
        AudioContext: any
    }
}

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.css'],
  providers: [MetronomeWebWorker]
})
export class ChordsComponent implements OnInit {
    private _window: Window;

    chordOptionsModel: number[];
    selectedChords: IMultiSelectOption[];

    qualityOptionsModel: number[];
    selectedQuality: IMultiSelectOption[];

    beatOptionsModel: number[];
    selectedBeat: IMultiSelectOption[];

    measureIntervalOptionsModel: number[];
    selectedMeasureInterval: IMultiSelectOption[];

    // Settings configuration
    multiAnswerSettings: IMultiSelectSettings = {
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true,
        dynamicTitleMaxItems: 8
    };

    singleAnswerSettings: IMultiSelectSettings = {
        selectionLimit: 1,
        autoUnselect: true,
        closeOnSelect: true
    };

    selectedChordsDict = {
        1: 'A',
        2: 'A#',
        3: 'Bb',
        4: 'B',
        5: 'C',
        6: 'C#',
        7: 'Db',
        8: 'D',
        9: 'D#',
        10: 'Eb',
        11: 'E',
        12: 'F',
        13: 'F#',
        14: 'Gb',
        15: 'G',
        16: 'G#'
    }

    selectedQualityDict = {
        1: 'dim7',
        2: 'mi7',
        3: 'mi7b5',
        4: 'ma7',
        5: '7'
     }

     selectedBeatDict = {
        0: '16th notes',
        1: '8th notes',
        2: 'Quarter notes',
        3: 'Half notes',
        4: 'Whole notes'
     }

     selectedMeasureIntervalDict = {
          1: '1',
          2: '2',
          3: '4',
          4: '8'
     }

    ngOnInit() {
        this.chordOptionsModel = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        this.qualityOptionsModel = [1,2,3,4,5];

        this.selectedChords = [
            { id: 1, name: this.selectedChordsDict[1] },
            { id: 2, name: this.selectedChordsDict[2] },
            { id: 3, name: this.selectedChordsDict[3] },
            { id: 4, name: this.selectedChordsDict[4] },
            { id: 5, name: this.selectedChordsDict[5] },
            { id: 6, name: this.selectedChordsDict[6] },
            { id: 7, name: this.selectedChordsDict[7] },
            { id: 8, name: this.selectedChordsDict[8] },
            { id: 9, name: this.selectedChordsDict[9] },
            { id: 10, name: this.selectedChordsDict[10] },
            { id: 11, name: this.selectedChordsDict[11] },
            { id: 12, name: this.selectedChordsDict[12] },
            { id: 13, name: this.selectedChordsDict[13] },
            { id: 14, name: this.selectedChordsDict[14] },
            { id: 15, name: this.selectedChordsDict[15] },
            { id: 16, name: this.selectedChordsDict[16] }
        ];

        this.selectedQuality = [
            { id: 1, name: this.selectedQualityDict[1] },
            { id: 2, name: this.selectedQualityDict[2] },
            { id: 3, name: this.selectedQualityDict[3] },
            { id: 4, name: this.selectedQualityDict[4] },
            { id: 5, name: this.selectedQualityDict[5] }
        ];

        this.selectedBeat = [
            { id: 0, name: this.selectedBeatDict[0] },
            { id: 1, name: this.selectedBeatDict[1] },
            { id: 2, name: this.selectedBeatDict[2] },
            { id: 3, name: this.selectedBeatDict[3] },
            { id: 4, name: this.selectedBeatDict[4] }
        ];

        this.selectedMeasureInterval = [
            { id: 1, name: this.selectedMeasureIntervalDict[1] },
            { id: 2, name: this.selectedMeasureIntervalDict[2] },
            { id: 3, name: this.selectedMeasureIntervalDict[3] },
            { id: 4, name: this.selectedMeasureIntervalDict[4] }
        ];
    }
    chordChanged(event: any) {
        console.log(this.chordOptionsModel);
    }

    qualityChanged(event: any) {
        console.log(this.qualityOptionsModel);
    }

    beatChanged(event: any) {
        this.noteResolution = Number(this.beatOptionsModel[0]);
        console.log(this.beatOptionsModel);
    }

    measureIntervalChanged(event: any) {
        this.measureInterval = Number(this.selectedMeasureIntervalDict[this.measureIntervalOptionsModel[0]]);
        console.log(this.measureIntervalOptionsModel);
    }

    currentChord: string;
    nextChord: string;
    startStopMessage: string;

  isPlaying: boolean;
  currentBeat: number;
  audioContext;
  nextNoteTime: number;
  tempo: number;
  lookahead: number;
    /* How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps 
   * with next interval (in case the timer is late) */
  scheduleAheadTime: number;
  startTime: number;
  noteResolution: number;
  noteLength: number;
  canvas: number;
  last16thNoteDrawn: number;
  notesInQueue: NoteObject[];//Array<Object>;
  current16thNote: number;
  timerWorker; // The Web Worker used to fire timer messages

  measureInterval: number;
  measureIntervalCounter: number;

  constructor(public fb: FormBuilder, public store: Store<IAppState>, private _metronomeWebWorker: MetronomeWebWorker, windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;

    this._window.onkeydown = function(e){
      if(e.keyCode === 32){
          e.preventDefault();
          let element: HTMLElement = document.getElementById('startstop-button') as HTMLElement;
          element.click();
      }
    }

    let AudioContext = this._window.AudioContext || this._window.webkitAudioContext;
    if (!AudioContext) {
        alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
        return;
    }
    this.audioContext = new AudioContext();

    this.startTime;              // The start time of the entire sequence.
    this.currentBeat = 0;        // What note is currently last scheduled?
    this.tempo = 100.0;          // tempo (in beats per minute)
    this.lookahead = 25.0;       // How frequently to call scheduling function (in milliseconds)
    this.startStopMessage = "Start";
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;     // when the next note is due.
    this.noteResolution = 2;     // 0 == 16th, 1 == 8th, 2 == quarter note
    this.beatOptionsModel = [2];
    this.measureInterval = 4;
    this.measureIntervalOptionsModel = [3];
    this.measureIntervalCounter = 0;
    this.noteLength = 0.05;      // length of "beep" (in seconds)
    this.canvas,                 // the canvas element
    this.current16thNote = 0;
    this.last16thNoteDrawn = -1; // the last "box" we drew on the screen
    this.notesInQueue = [];      // the notes that have been put into the web audio and may or may not have played yet. {note, time}

    this.timerWorker = _metronomeWebWorker;

    let self = this;
    this.timerWorker.setOnMessageCallback(function(message) {
        if (message === "tick") {
            self.scheduler();
        }
        else {
            console.error("Unexpected message: " + message);
        }
    });
    this.timerWorker.postMessage({"interval":this.lookahead});
  }

  getRandomChordFromSelections(chordToAvoid: String): string {
    if (!this.chordOptionsModel || !this.qualityOptionsModel) {
      console.log("Requested random chord before options were set");
      return "";
    }
    let root = this.selectedChordsDict[this.chordOptionsModel[Math.floor((Math.random() * this.chordOptionsModel.length-1) + 1)]];
    let quality = this.selectedQualityDict[this.qualityOptionsModel[Math.floor((Math.random() * this.qualityOptionsModel.length-1) + 1)]];
    let chord = root + " " + quality;
    if (chord === chordToAvoid) {
      // retry once to get not the same chord
      root = this.selectedChordsDict[this.chordOptionsModel[Math.floor((Math.random() * this.chordOptionsModel.length-1) + 1)]];
      quality = this.selectedQualityDict[this.qualityOptionsModel[Math.floor((Math.random() * this.qualityOptionsModel.length-1) + 1)]];
      chord = root + " " + quality;
    }
    return chord;
  }

  play(): void {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) { // start playing
        this.currentChord = this.getRandomChordFromSelections("");
        this.nextChord = this.getRandomChordFromSelections(this.currentChord);
        this.currentBeat = 0;
        this.measureIntervalCounter = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.startStopMessage = "Stop";
        this.timerWorker.postMessage("start");
    } else {
        this.startStopMessage = "Start";
        this.timerWorker.postMessage("stop");
    }
  }

  nextNote(): void {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.current16thNote++;    // Advance the beat number, wrap to zero
    if (this.current16thNote === 16) {
        this.current16thNote = 0;
    }
}

scheduleNote( beatNumber: number, time: number ): void {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push( { note: beatNumber, time: time } );

    if ( (this.noteResolution === 1) && (beatNumber % 2))
        return; // we're not playing non-8th 16th notes
    if ( (this.noteResolution === 2) && (beatNumber % 4))
        return; // we're not playing non-quarter 8th notes
    if ( (this.noteResolution === 3) && (beatNumber % 8))
        return; // we're not playing non-half notes
    if ( (this.noteResolution === 4) && (beatNumber % 16))
        return; // we're not playing non-whole notes


    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect( this.audioContext.destination );
    if (beatNumber % 16 === 0) {
        // beat 0 == high pitch        
        osc.frequency.value = 880.0;
        osc.frequency.duration = 1.0;

        if (this.measureIntervalCounter >= this.measureInterval) {
          this.currentChord = this.nextChord;
            this.nextChord = this.getRandomChordFromSelections(this.currentChord);
            this.measureIntervalCounter = 0;
        }
        this.measureIntervalCounter += 1;
    } else if (beatNumber % 4 === 0 ) {
      // quarter notes = medium pitch
        osc.frequency.value = 440.0;
        osc.frequency.duration = .2;
    } else {
       // other 16th notes = low pitch
        osc.frequency.value = 220.0;
        osc.frequency.duration = .2;
    }

    osc.start( time );
    osc.stop( time + this.noteLength );
}

  scheduler(): void {
      // while there are notes that will need to play before the next interval, 
      // schedule them and advance the pointer.
      while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
          this.scheduleNote( this.current16thNote, this.nextNoteTime );
          this.nextNote();
      }
  }

  changeBeat(val: any): void {
    debugger;
  }

  draw(): void {
      var currentNote = this.last16thNoteDrawn;
      var currentTime = this.audioContext.currentTime;

      while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
          currentNote = this.notesInQueue[0].note;
          this.notesInQueue.splice(0,1);   // remove note from queue
      }

      // We only need to draw if the note has moved.
      if (this.last16thNoteDrawn !== currentNote) {
          this.last16thNoteDrawn = currentNote;
      }
  }
}


