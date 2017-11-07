import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

/**
 * This class provides chords and chord groupings
 */
@Injectable()
export class ChordCalculatorService {

  noteInfo = {
    0: {
      name: "A",
      altName: [],
      range: [1, 8],
      interval: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      id: 0
    },
    1: {
      name: "A#",
      altName: ["Bb"],
      range: [1, 8],
      interval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
      id: 1
    },
    2: {
      name: "B",
      altName: ["Cb"],
      range: [1, 8],
      interval: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
      id: 2
    },
    3: {
      name: "C",
      altName: [],
      range: [1, 8],
      interval: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
      id: 3
    },
    4: {
      name: "C#",
      altName: ["Db"],
      range: [1, 8],
      interval: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
      id: 4
    },
    5: {
      name: "D",
      altName: [],
      range: [1, 8],
      interval: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4],
      id: 5
    },
    6: {
      name: "Eb",
      altName: ["D#"],
      range: [1, 8],
      interval: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
      id: 6
    },
    7: {
      name: "E",
      altName: ["Fb"],
      range: [1, 8],
      interval: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
      id: 7
    },
    8: {
      name: "F",
      altName: ["E#"],
      range: [1, 8],
      interval: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7],
      id: 8
    },
    9: {
      name: "F#",
      altName: ["Gb"],
      range: [1, 8],
      interval: [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      id: 9
    },
    10: {
        name: "G",
        altName: [],
        range: [1, 8],
        interval: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        id: 10
    },
    11: {
        name: "Ab",
        altName: ["G#"],
        range: [1, 8],
        interval: [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        id: 11
    }
  };

  intervals = {
    0: {
      name: 'Enharmonic',
      halfSteps: 0
    },
    2: {
      name: 'Second',
      halfSteps: 2
    },
    3: {
      name: 'Minor 3rd',
      halfSteps: 3
    },
    4: {
      name: 'Major 3rd',
      halfSteps: 4
    },
    7: {
      name: 'Perfect 5th',
      halfSteps: 7
    }
  };

  chordQuality = {
    dim7: {
      name: 'dim7'
    },
    mi7: {
      name: 'mi7'
    },
    mi7b5: {
      name: 'mi7b5'
    },
    ma7: {
      name: 'ma7'
    },
    7: {
      name: '7'
    }
  };

  chordPattern = {
    singleChord: {
      name: "Single Chord",
      pattern: [
        {
          halfStepsFromRoot: '0',
          quality: ['dim7', 'min7', 'mi7b5', 'maj7', 'dom7']
        }
      ]
    },
    major251: {
      name: "Major ii-V7-I",
      pattern: [
        {
          halfStepsFromRoot: '2',
          quality: 'mi7'
        },
        {
          halfStepsFromRoot: '7',
          quality: '7'
        },
        {
          halfStepsFromRoot: '0',
          quality: 'ma7'
        }
      ]
    },
    major25: {
      name: "Major ii-V7",
      pattern: [
        {
          halfStepsFromRoot: '2',
          quality: 'mi7'
        },
        {
          halfStepsFromRoot: '7',
          quality: '7'
        }
      ]
    },
    minor251: {
      name: "Minor ii-V7-i",
      pattern: [
        {
          halfStepsFromRoot: '2',
          quality: 'mi7b5'
        },
        {
          halfStepsFromRoot: '7',
          quality: '7'
        },
        {
          halfStepsFromRoot: '0',
          quality: 'mi7'
        }
      ]
    },
    minor25: {
      name: "Minor ii-V7",
      pattern: [
        {
          halfStepsFromRoot: '2',
          quality: 'mi7b5'
        },
        {
          halfStepsFromRoot: '7',
          quality: '7'
        }
      ]
    }
  };

  constructor() {}

  getSingleChord(rootKey: string, qualityKey: string, useAltName: boolean): string {
    let rootName;
    if (useAltName && this.noteInfo[rootKey].altName.length > 0) {
      rootName = this.noteInfo[rootKey].altName[0];
    } else {
      rootName = this.noteInfo[rootKey].name;
    }
    return rootName + " " + this.chordQuality[qualityKey].name;
  }

  appendChordPattern(chordQueue: Array<string>, patternKey: string, rootKey: string): void {
    debugger;
    for (let chord of this.chordPattern[patternKey].pattern) {
      debugger;
      let rootOfNextChord = this.noteInfo[this.noteInfo[rootKey].interval[chord.halfStepsFromRoot]].name;
      let qualityOfNextChord = this.chordQuality[chord.quality].name;
      chordQueue.push(rootOfNextChord + " " + qualityOfNextChord);
    }
  }

  appendChords(chordQueue: Array<string>, patternKey: string, rootKey: string, qualityKey: string, useAltName: boolean): void {
    if (patternKey === "singleChord") {
      chordQueue.push(this.getSingleChord(rootKey, qualityKey, useAltName))
    } else {
      this.appendChordPattern(chordQueue, patternKey, rootKey)
    }
  }
}

