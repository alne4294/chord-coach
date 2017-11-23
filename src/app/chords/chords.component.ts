import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MetronomeWebWorker } from './metronomeWebWorker.service';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { ChordCalculatorService } from './chordCalculator.service';
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

  qualityOptionsModel: string[];
  selectedQuality: IMultiSelectOption[];

  chordPatternsModel: string[];
  selectedChordPattern: IMultiSelectOption[];

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

  selectedBeatDict = {
    0: '16th notes',
    1: '8th notes',
    2: 'Quarter notes',
    3: 'Half notes',
    4: 'Whole notes'
  };

  selectedMeasureIntervalDict = {
    1: '1',
    2: '2',
    3: '4',
    4: '8'
  };

  localStorageOptions = {

  };

  setLocalStorageOption(key: string): void {
    localStorage.setItem(key, JSON.stringify(this[key]));
  };

  getLocalStorageOption(key: string, defaultItem : any): any {
    let localStorageVal = JSON.parse(localStorage.getItem(key));
    return localStorageVal ? localStorageVal : defaultItem;
  };

  ngOnInit() {
    this.chordOptionsModel = this.getLocalStorageOption('chordOptionsModel', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    this.qualityOptionsModel = this.getLocalStorageOption('qualityOptionsModel', ['dim7', 'mi7', 'mi7b5', 'ma7', '7']);
    this.chordPatternsModel = this.getLocalStorageOption('chordPatternsModel', ['singleChord', 'major25', 'minor25', 'major251', 'minor251']);

    this.selectedChords = [
      {id: 0, name: this.chordCalculator.noteInfo[0].menuName},
      {id: 1, name: this.chordCalculator.noteInfo[1].menuName},
      {id: 2, name: this.chordCalculator.noteInfo[2].menuName},
      {id: 3, name: this.chordCalculator.noteInfo[3].menuName},
      {id: 4, name: this.chordCalculator.noteInfo[4].menuName},
      {id: 5, name: this.chordCalculator.noteInfo[5].menuName},
      {id: 6, name: this.chordCalculator.noteInfo[6].menuName},
      {id: 7, name: this.chordCalculator.noteInfo[7].menuName},
      {id: 8, name: this.chordCalculator.noteInfo[8].menuName},
      {id: 9, name: this.chordCalculator.noteInfo[9].menuName},
      {id: 10, name: this.chordCalculator.noteInfo[10].menuName},
      {id: 11, name: this.chordCalculator.noteInfo[11].menuName}
    ];

    this.selectedQuality = [
      {id: 'dim7', name: this.chordCalculator.chordQuality['dim7'].name},
      {id: 'mi7', name: this.chordCalculator.chordQuality['mi7'].name},
      {id: 'mi7b5', name: this.chordCalculator.chordQuality['mi7b5'].name},
      {id: 'ma7', name: this.chordCalculator.chordQuality['ma7'].name},
      {id: '7', name: this.chordCalculator.chordQuality['7'].name}
    ];

    this.selectedChordPattern = [
      {id: 'singleChord', name: this.chordCalculator.chordPattern['singleChord'].name},
      {id: 'major25', name: this.chordCalculator.chordPattern['major25'].name},
      {id: 'minor25', name: this.chordCalculator.chordPattern['minor25'].name},
      {id: 'major251', name: this.chordCalculator.chordPattern['major251'].name},
      {id: 'minor251', name: this.chordCalculator.chordPattern['minor251'].name}
    ];

    this.selectedBeat = [
      {id: 0, name: this.selectedBeatDict[0]},
      {id: 1, name: this.selectedBeatDict[1]},
      {id: 2, name: this.selectedBeatDict[2]},
      {id: 3, name: this.selectedBeatDict[3]},
      {id: 4, name: this.selectedBeatDict[4]}
    ];

    this.selectedMeasureInterval = [
      {id: 1, name: this.selectedMeasureIntervalDict[1]},
      {id: 2, name: this.selectedMeasureIntervalDict[2]},
      {id: 3, name: this.selectedMeasureIntervalDict[3]},
      {id: 4, name: this.selectedMeasureIntervalDict[4]}
    ];
  }

  chordOptionsModelChanged(event: any) {
    this.setLocalStorageOption('chordOptionsModel');
    console.log(this.chordOptionsModel);
  }

  qualityOptionsModelChanged(event: any) {
    this.setLocalStorageOption('qualityOptionsModel');
    console.log(this.qualityOptionsModel);
  }

  chordPatternsModelChanged(event: any) {
    this.setLocalStorageOption('chordPatternsModel');
    console.log(this.qualityOptionsModel);
  }

  chordPreviewCountChanged(event: any) {
    this.setLocalStorageOption('chordPreviewCount');
    console.log(this.chordPreviewCount);
  }

  tempoChanged(event: any) {
    this.setLocalStorageOption('tempo');
    console.log(this.tempo);
  }

  beatOptionsModelChanged(event: any) {
    this.setLocalStorageOption('beatOptionsModel');
    this.noteResolution = Number(this.beatOptionsModel[0]);
    console.log(this.beatOptionsModel);
  }

  measureIntervalOptionsModelChanged(event: any) {
    this.setLocalStorageOption('measureIntervalOptionsModel');
    this.measureInterval = Number(this.selectedMeasureIntervalDict[this.measureIntervalOptionsModel[0]]);
    console.log(this.measureIntervalOptionsModel);
  }

  startStopMessage: string;
  chordQueue: Array<Object>;

  isPlaying: boolean;
  currentBeat: number;
  audioContext;
  nextNoteTime: number;
  tempo: number;
  chordPreviewCount: number;
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
  chordCalculator;

  measureInterval: number;
  measureIntervalCounter: number;
  latestChordKey: string;

  currentChordIndex: number;
  showInfoAlert: boolean;

  constructor(public fb: FormBuilder, private _metronomeWebWorker: MetronomeWebWorker, windowRef: WindowRefService, private _chordCalculator: ChordCalculatorService) {

    this._window = windowRef.nativeWindow;

    this._window.onkeydown = function (e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        let element: HTMLElement = document.getElementById('startstop-button') as HTMLElement;
        element.click();
      }
    };

    let AudioContext = this._window.AudioContext || this._window.webkitAudioContext;
    if (!AudioContext) {
      alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
      return;
    }
    this.audioContext = new AudioContext();

    this.startTime;              // The start time of the entire sequence.
    this.currentBeat = 0;        // What note is currently last scheduled?
    this.tempo = this.getLocalStorageOption('tempo', 120);          // tempo (in beats per minute)
    this.chordPreviewCount = this.getLocalStorageOption('chordPreviewCount', 40);
    this.lookahead = 25.0;       // How frequently to call scheduling function (in milliseconds)
    this.startStopMessage = "Play";
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;     // when the next note is due.
    this.noteResolution = 2;     // 0 == 16th, 1 == 8th, 2 == quarter note
    this.beatOptionsModel = this.getLocalStorageOption('beatOptionsModel', [2]);
    this.measureInterval = 2;
    this.measureIntervalOptionsModel = this.getLocalStorageOption('this.getLocalStorageOption', [2]);
    this.measureIntervalCounter = 0;
    this.noteLength = 0.05;      // length of "beep" (in seconds)
    this.canvas;                 // the canvas element
    this.current16thNote = 0;
    this.last16thNoteDrawn = -1; // the last "box" we drew on the screen
    this.notesInQueue = [];      // the notes that have been put into the web audio and may or may not have played yet. {note, time}

    this.timerWorker = _metronomeWebWorker;
    this.chordCalculator = _chordCalculator;

    this.chordQueue = [];

    this.currentChordIndex = 0;
    this.showInfoAlert = true;

    let self = this;
    this.timerWorker.setOnMessageCallback(function (message) {
      if (message === "tick") {
        self.scheduler();
      }
      else {
        console.error("Unexpected message: " + message);
      }
    });
    this.timerWorker.postMessage({"interval": this.lookahead});
  }

  /**
   * 1. Get random pattern from available selection
   * 2. If Single Chord, get random quality from available selection
   * 3. If the result isn't the same as the last random chord, try again
   * 4. Get the Chords from the chord calculator and add to the queue
   * 5. Update the latest random chord
   * @returns {string}
   */
  addRandomChordsFromSelections(): void {
    let retryMax = 1;
    let retryCount = 0;
    let newChordKey = this.latestChordKey;
    let patternKey;
    let rootKey;
    let qualityKey;

    if (!this.chordOptionsModel || !this.qualityOptionsModel || !this.chordPatternsModel) {
      console.log("Requested random chord before options were set");
      return;
    }

    if (this.chordQueue.length >= this.chordPreviewCount) {
      console.log("We have enough chords shown, returning");
      return;
    }

    // loop until we find a different random chord than th latest or our retries exceed max retries
    while (newChordKey === this.latestChordKey && retryCount < retryMax) {
      patternKey = this.chordPatternsModel[Math.floor((Math.random() * this.chordPatternsModel.length - 1) + 1)];
      rootKey = this.chordOptionsModel[Math.floor((Math.random() * this.chordOptionsModel.length - 1) + 1)];
      qualityKey = "";
      if (patternKey === 'singleChord') {
        qualityKey = this.qualityOptionsModel[Math.floor((Math.random() * this.qualityOptionsModel.length - 1) + 1)];
      }
      newChordKey = rootKey + qualityKey + patternKey;
      retryCount++;
    }

    this.chordCalculator.appendChords(this.chordQueue, patternKey, rootKey, qualityKey);
    this.latestChordKey = newChordKey;
  }

  clearChordQueue() {
    this.currentChordIndex = 0;
    this.chordQueue = [];
  }

  populateChordQueue() {
    this.addRandomChordsFromSelections();
    while(this.chordQueue.length < this.chordPreviewCount) {
      this.addRandomChordsFromSelections();
    }
  }

  playpause(): void {
    this.showInfoAlert = false;

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) { // start playing
      this.populateChordQueue();
      this.currentBeat = 0;
      this.measureIntervalCounter = 0;
      this.nextNoteTime = this.audioContext.currentTime;
      this.startStopMessage = "Pause";
      this.timerWorker.postMessage("start");
    } else {
      this.startStopMessage = "Play";
      this.timerWorker.postMessage("stop");
    }
  }

  scramble(): void {
    this.clearChordQueue();
    this.populateChordQueue();
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

  scheduleNote(beatNumber: number, time: number): void {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push({note: beatNumber, time: time});

    if ((this.noteResolution === 1) && (beatNumber % 2))
      return; // we're not playing non-8th 16th notes
    if ((this.noteResolution === 2) && (beatNumber % 4))
      return; // we're not playing non-quarter 8th notes
    if ((this.noteResolution === 3) && (beatNumber % 8))
      return; // we're not playing non-half notes
    if ((this.noteResolution === 4) && (beatNumber % 16))
      return; // we're not playing non-whole notes


    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);
    if (beatNumber % 16 === 0) {
      // beat 0 == high pitch
      osc.frequency.value = 880.0;
      osc.frequency.duration = 1.0;

      if (this.measureIntervalCounter >= this.measureInterval) {
        //this.chordQueue.shift(); // Toss the first chord
        if (this.currentChordIndex === (this.chordQueue.length-1)) {
          // we've ran out of chords...
          this.clearChordQueue();
          this.populateChordQueue();
        } else {
          this.currentChordIndex++;
        }

        this.addRandomChordsFromSelections();
        this.measureIntervalCounter = 0;
      }
      this.measureIntervalCounter += 1;
    } else if (beatNumber % 4 === 0) {
      // quarter notes = medium pitch
      osc.frequency.value = 440.0;
      osc.frequency.duration = .2;
    } else {
      // other 16th notes = low pitch
      osc.frequency.value = 220.0;
      osc.frequency.duration = .2;
    }

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  scheduler(): void {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
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
      this.notesInQueue.splice(0, 1);   // remove note from queue
    }

    // We only need to draw if the note has moved.
    if (this.last16thNoteDrawn !== currentNote) {
      this.last16thNoteDrawn = currentNote;
    }
  }
}


