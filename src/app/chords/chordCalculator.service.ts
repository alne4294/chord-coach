import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

/**
 * This class provides chords and chord groupings
 */
@Injectable()
export class ChordCalculatorService {

  noteInfo = {
    0: {
      menuName: "A",
      name: {
        sharp: "A",
        flat: "A"
      },
      range: [1, 8],
      interval: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      id: 0
    },
    1: {
      menuName: "A#",
      name: {
        sharp: "A#",
        flat: "Bb"
      },
      range: [1, 8],
      interval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
      id: 1
    },
    2: {
      menuName: "B",
      name: {
        sharp: "B",
        flat: "Cb"
      },
      range: [1, 8],
      interval: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
      id: 2
    },
    3: {
      menuName: "C",
      name: {
        sharp: "C",
        flat: "C"
      },
      range: [1, 8],
      interval: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
      id: 3
    },
    4: {
      menuName: "C#",
      name: {
        sharp: "C#",
        flat: "Db"
      },
      range: [1, 8],
      interval: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
      id: 4
    },
    5: {
      menuName: "D",
      name: {
        sharp: "D",
        flat: "D"
      },
      range: [1, 8],
      interval: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4],
      id: 5
    },
    6: {
      menuName: "D#",
      name: {
        sharp: "D#",
        flat: "Eb"
      },
      range: [1, 8],
      interval: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
      id: 6
    },
    7: {
      menuName: "E",
      name: {
        sharp: "E",
        flat: "E"
      },
      range: [1, 8],
      interval: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
      id: 7
    },
    8: {
      menuName: "F",
      name: {
        sharp: "F",
        flat: "F"
      },
      range: [1, 8],
      interval: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7],
      id: 8
    },
    9: {
      menuName: "F#",
      name: {
        sharp: "F#",
        flat: "Gb"
      },
      range: [1, 8],
      interval: [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      id: 9
    },
    10: {
      menuName: "G",
        name: {
          sharp: "G",
          flat: "G",
        },
        range: [1, 8],
        interval: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        id: 10
    },
    11: {
      menuName: "Ab",
        name: {
          sharp: "G#",
          flat: "Ab"
        },
        range: [1, 8],
        interval: [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        id: 11
    }
  };

  minorCircleOfFifthRoots = {
    0: {
      root: 0,
      sharpOrFlat: 'sharp'
    },
    1: {
      root: 1,
      sharpOrFlat: 'both'
    },
    2: {
      root: 2,
      sharpOrFlat: 'sharp'
    },
    3: {
      root: 3,
      sharpOrFlat: 'sharp'
    },
    4: {
      root: 4,
      sharpOrFlat: 'sharp'
    },
    5: {
      root: 5,
      sharpOrFlat: 'sharp'
    },
    6: {
      root: 6,
      sharpOrFlat: 'both'
    },
    7: {
      root: 7,
      sharpOrFlat: 'sharp'
    },
    8: {
      root: 8,
      sharpOrFlat: 'flat'
    },
    9: {
      root: 9,
      sharpOrFlat: 'sharp'
    },
    10: {
      root: 10,
      sharpOrFlat: 'sharp'
    },
    11: {
      root: 11,
      sharpOrFlat: 'both'
    }
  };

  majorCircleOfFifthRoots = {
    0: {
      root: 0,
      sharpOrFlat: 'sharp'
    },
    1: {
      root: 1,
      sharpOrFlat: 'flat'
    },
    2: {
      root: 2,
      sharpOrFlat: 'both'
    },
    3: {
      root: 3,
      sharpOrFlat: 'sharp'
    },
    4: {
      root: 4,
      sharpOrFlat: 'both'
    },
    5: {
      root: 5,
      sharpOrFlat: 'sharp'
    },
    6: {
      root: 6,
      sharpOrFlat: 'flat'
    },
    7: {
      root: 7,
      sharpOrFlat: 'sharp'
    },
    8: {
      root: 8,
      sharpOrFlat: 'flat'
    },
    9: {
      root: 9,
      sharpOrFlat: 'sharp'
    },
    10: {
      root: 10,
      sharpOrFlat: 'sharp'
    },
    11: {
      root: 11,
      sharpOrFlat: 'flat'
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

  intervalNameDict = {
    ENHARMONIC: 0,
    PERFECT_FIFTH: 7
  };

  chordQuality = {
    dim7: {
      name: 'dim7',
      supportedScales: ['major'],
      interval: {
        major: '11'
      }
    },
    mi7: {
      name: 'mi7',
      supportedScales: ['major', 'minor'],
      interval: {
        major: '2',
        minor: '0'
      }
    },
    mi7b5: {
      name: 'mi7b5',
      supportedScales: ['minor'],
      interval: {
        minor: '2'
      }
    },
    ma7: {
      name: 'ma7',
      supportedScales: ['major'],
      interval: {
        major: '0'
      }
    },
    7: {
      name: '7',
      supportedScales: ['major', 'minor'],
      interval: {
        major: '7',
        minor: '7'
      }
    }
  };

  repeatChordName = "%";

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
      scaleQuality: "major",
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
        },
        {
          halfStepsFromRoot: '0',
          quality: 'ma7'
        }
      ]
    },
    major25: {
      name: "Major ii-V7",
      scaleQuality: "major",
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
      scaleQuality: "minor",
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
        },
        {
          halfStepsFromRoot: '0',
          quality: 'mi7'
        }
      ]
    },
    minor25: {
      name: "Minor ii-V7",
      scaleQuality: "minor",
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

  getHalfSteps(intervalName: string) {
    return this.intervals[this.intervalNameDict[intervalName]].halfSteps;
  }

  getRandomSharpOrFlat() {
    let sharpOrFlatOptions = ['sharp', 'flat'];
    return sharpOrFlatOptions[Math.floor((Math.random() * sharpOrFlatOptions.length - 1) + 1)];
  }

  getSharpOrFlatForScaleQuality(scaleQuality: string, rootKey: string) {
    let sharpOrFlat;
    if (scaleQuality === 'major') {
      sharpOrFlat = this.majorCircleOfFifthRoots[rootKey].sharpOrFlat;
    } else {
      sharpOrFlat = this.minorCircleOfFifthRoots[rootKey].sharpOrFlat;
    }
    if (sharpOrFlat === 'both') {
      sharpOrFlat = this.getRandomSharpOrFlat();
    }
    return sharpOrFlat;
  }

  getSingleChord(rootKey: string, qualityKey: string): string {
    // Get chord quality
    let qualityName = this.chordQuality[qualityKey].name;
    let scaleQualityKey = Math.floor((Math.random() * this.chordQuality[qualityKey].supportedScales.length - 1) + 1);
    let scaleQuality = this.chordQuality[qualityKey].supportedScales[scaleQualityKey];

    // Get chord name
    let sharpOrFlat = this.getSharpOrFlatForScaleQuality(scaleQuality, rootKey);
    let rootName = this.noteInfo[rootKey].name[sharpOrFlat];

    return rootName + " " + qualityName;
  }

  appendChordPattern(chordQueue: Array<Object>, patternKey: string, rootKey: string): void {
    let scaleQuality = this.chordPattern[patternKey].scaleQuality;
    let sharpOrFlat = this.getSharpOrFlatForScaleQuality(scaleQuality, rootKey);

    let previousChordAndQuality = "";
    let counter = 1;
    for (let chord of this.chordPattern[patternKey].pattern) {
      let rootOfNextChord = this.noteInfo[this.noteInfo[rootKey].interval[chord.halfStepsFromRoot]].name[sharpOrFlat];
      let qualityOfNextChord = this.chordQuality[chord.quality].name;

      let isLastInGroup = (counter === this.chordPattern[patternKey].pattern.length);

      let fullName = rootOfNextChord + " " + qualityOfNextChord;
      if (fullName === previousChordAndQuality) {
        fullName = this.repeatChordName;
      }
      previousChordAndQuality = fullName;
      chordQueue.push({isLastInGroup: isLastInGroup, name: fullName});
      counter ++;
    }
  }

  appendChords(chordQueue: Array<Object>, patternKey: string, rootKey: string, qualityKey: string): void {
    if (patternKey === "singleChord") {
      chordQueue.push({isLastInGroup: true, name: this.getSingleChord(rootKey, qualityKey)});
    } else {
      this.appendChordPattern(chordQueue, patternKey, rootKey)
    }
  }
}

