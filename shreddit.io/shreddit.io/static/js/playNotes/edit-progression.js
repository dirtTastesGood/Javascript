
const toggleEditPanel = panel => {
    if (panel.style.maxHeight){
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    if(panel.classList.contains('edit-panel-active')){
        panel.classList.remove('edit-panel-active');
    } else {
        panel.classList.add('edit-panel-active')
    }

}

const toggleEditButton = (button, status) => {
    if(status == 'on'){
        button.innerText = 'Editing...';
            
        button.classList.remove('blue-grey-text');
        button.classList.remove('text-lighten-5');
    
        button.classList.add('red-text');
        button.classList.add('text-darken-1');
    } else if(status == 'off'){
        button.innerText = 'Edit';
        
        button.classList.add('blue-grey-text');
        button.classList.add('text-lighten-5');

        button.classList.remove('red-text');
        button.classList.remove('text-darken-1');
    }
}

const updateEditDisplay = (button, progressionItem) => {
    let editPanel = progressionItem.querySelector('#edit-panel'),
        editButton;

    // console.log(button.nodeName);
    
    if(button.nodeName == 'DIV' || button.nodeName == 'A') {
        editButton = button;
        if(editButton.innerText == 'Edit'){
            
            
            toggleEditButton(editButton, 'on')
            toggleEditPanel(editPanel);

            editProgressionItem(progressionItem);
            
            // console.log(progressionItem.dataset);
            
    
        } else if(editButton.innerText == 'Editing...'){
            editButton.innerText = 'Edit';
            
            editButton.classList.remove('red-text');
            editButton.classList.remove('text-darken-1');
    
            editButton.classList.add('blue-grey-text');
            editButton.classList.add('text-lighten-5');
            
            toggleEditButton(editButton, 'off')
            toggleEditPanel(editPanel);
            loadDefaultProgressionInfo(progressionItem);
    
        }
    } else if(button.nodeName == 'I'){
        if(editPanel.classList.contains('edit-panel-active')){
            editButton = progressionItem.querySelector('#edit-progression-item');

            toggleEditButton(editButton, 'off');
            toggleEditPanel(editPanel);
            loadDefaultProgressionInfo(progressionItem);

        }
    }
    
}

const editProgressionItem = item => {

    let currentChordKey,
        currentChordQuality,
        currentScaleKey,
        currentScaleName,
        currentScaleKeyAndName,
        chordKeySelect = item.querySelector('#key-input'),
        chordQualitySelect = item.querySelector('#chord-quality'),
        compatibleScales,
        compatibleScaleSelect = item.querySelector('#edit-panel #compatible-scales'),
        i;

        // console.log(chordKeySelect);
        // console.log(chordQualitySelect);
        // console.log(compatibleScaleSelect);
        
        currentChordKey        = item.dataset.chordKey;
        currentChordQuality    = item.dataset.chordQuality;
        currentScaleKey        = item.dataset.scaleKey;
        currentScaleName       = item.dataset.scaleName;
        currentScaleKeyAndName = `${currentScaleKey} ${currentScaleName}`;

    neck.curKey = teoria.note(currentChordKey)
    neck.scale = neck.curKey.chord(chordName).voicing();
    
    neck.findCompatibleScales();
    
    // console.log('curKey:', neck.curKey);
    // console.log('scale:', neck.scale.toString());
    updateCompatibleScales(compatibleScaleSelect, chordKeySelect, chordQualitySelect);
    
    compatibleScaleSelect.value = `${item.dataset.scaleKey} ${item.dataset.scaleName}`

    
    if(currentChordKey.length > 1){
        currentChordKey = currentChordKey[0].toUpperCase() + currentChordKey[1]
    } else {
        currentChordKey = currentChordKey.toUpperCase();
    }
    
    chordKeySelect.value = currentChordKey;
    chordQualitySelect.value = currentChordQuality;
    compatibleScaleSelect.value = `${item.dataset.scaleKey} ${item.dataset.scaleName}`

}

const loadDefaultProgressionInfo = progressionItem => {
    let keySelect = progressionItem.querySelector('#key-input'),
        chordQualitySelect = progressionItem.querySelector('#chord-quality'),
        compatibleScaleSelect = progressionItem.querySelector('#compatible-scales'),
        chordKey;

        chordKey = progressionItem.dataset.chordKey;
        // console.log(chordKey.length);
        
        if(chordKey.length > 1){
            keySelect.value = chordKey[0].toUpperCase() + chordKey.substring(1, chordKey.length);
            
        } else{
            keySelect.value = chordKey.toUpperCase()
        }

        chordQualitySelect.value = progressionItem.dataset.chordQuality;
        compatibleScaleSelect.value = `${progressionItem.dataset.scaleKey} ${progressionItem.dataset.scaleName}`
}

const updateProgressionItem = progressionItem => {
    // console.log(progressionItem);
    
    let selectedScale       = progressionItem.querySelector('#edit-panel #compatible-scales'),
        selectedScaleName   = selectedScale.options[selectedScale.selectedIndex].value;
        updatedChordKey     = progressionItem.querySelector('#key-input').value,
        updatedChordQuality = progressionItem.querySelector('#chord-quality').value,
        updatedScaleKey     = selectedScaleName.split(' ')[0],
        updatedScaleName    = selectedScaleName.split(' ')[1],
        scaleNameDisplay    = progressionItem.querySelector('.scale-name'),
        chordNameDisplay    = progressionItem.querySelector('.chord-name');

    // console.log(`updatedChordKey:     ${updatedChordKey}`);
    // console.log(`updatedChordQuality: ${updatedChordQuality}`);
    // console.log(`updatedScaleKey:     ${updatedScaleKey}`);
    // console.log(`updatedScaleName:    ${updatedScaleName}`);    
        
    

    progressionItem.dataset.chordKey     = updatedChordKey[0].toLowerCase() + updatedChordKey.substring(1, updatedChordKey.length);
    progressionItem.dataset.chordQuality = updatedChordQuality;
    progressionItem.dataset.scaleKey     = updatedScaleKey;
    progressionItem.dataset.scaleName    = updatedScaleName;

    chordNameDisplay.innerText = `${updatedChordKey}${updatedChordQuality}`;
    scaleNameDisplay.innerText = `${updatedScaleKey[0].toUpperCase() + updatedScaleKey.substring(1, updatedScaleKey.length)} ${fullScaleNames[updatedScaleName]} `;

    updateProgression();
}