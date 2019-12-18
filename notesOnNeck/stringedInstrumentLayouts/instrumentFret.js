class InstrumentFret {
    
    constructor(string, fretNum) {

        this.string = string;
        this.id = fretNum;
        this.container = this.draw();
    }

    draw() {
        let newFret = document.createElement('div');
        
        let fretName = this.getFretName();
        newFret.setAttribute('name', fretName);

        newFret.id = `fret-${this.id}`;

        if(this.id == 0){
            newFret.classList.add('open-fret')
            if(this.string.container.classList.contains('invisible-string')){

                newFret.classList.add('invisible-open-fret');
            } else {

                newFret.classList.add('inlay-fret');
            }
        } else {

            newFret.classList.add('fret');
            if(this.string.container.classList.contains('invisible-string')){

                newFret.classList.add('invisible-fret');
            } else {

                newFret.classList.add('regular-fret');

                // change BG color of fret if it has an inlay in neck.inlays
                let newFretNum = parseInt(newFret.id.replace('fret-',''));
                if(this.string.neck.inlays.includes(newFretNum)){
                    
                    newFret.classList.add('inlay-fret');
                }
            }
        }

        return newFret
    }

    getFretName(){
        const intervalsWithAug4 = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'];
        const intervalsWithDim5 = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'D5', 'P5', 'm6', 'M6', 'm7', 'M7'];

        let curString, curInterval, fretName;

        // top string is 'invisible'
        if(this.string.name != 'invisible'){
            curString = teoria.note(this.string.name);

            // intervals with 'A4' vs 'd5' 
            if(this.string.neck.markedNotes.includes('d5')){

                // name of interval from open note to current fret
                curInterval =  intervalsWithDim5[this.id%12];
            } else {
                curInterval =  intervalsWithAug4[this.id%12];
            }

            // actual interval from open note to current fret
            fretName = curString.interval(curInterval).toString();

            // fretName = fretName.slice(fretName.length-1, 1);


            // raise octave for 12th fret
            // if(this.string.id == 12){
            //     fretName = `${fretName.toString()}`//${fretName.octave()+1}`
            // }

            return fretName.slice(0, -1)

        } else {

            // if string.name == 'invisible'
            return 'no-note'
        }
    }
}

