    // Require the library function
    const txtHistory = new window.UndoRedojs(5)
    // Get the textarea
    const textarea = document.querySelector("#input")
    // Add event listener for inputs on the textarea
    textarea.addEventListener('input', () => { 
        // Check if the new textarea value is different
        if (txtHistory.current() !== textarea.value) {
            // Check for pastes, auto corrects..
            if ((textarea.value.length - txtHistory.current().length) > 1 || (textarea.value.length - txtHistory.current().length) < -1 || (textarea.value.length - txtHistory.current().length) === 0) {
                // Record the textarea value and force to bypass cooldown
                txtHistory.record(textarea.value, true)
            // Check for single key press, single chacacter paste..
        } else {
                // Record the textarea value
                txtHistory.record(textarea.value)
            }
        }
    });
    // Some browsers will auto-fill the textarea again after reloading, this will deal with that
    setTimeout(() => {
    	if (textarea.value) txtHistory.record(textarea.value, true)
    }, 100);
    // The undo button
    document.querySelector("#undo").addEventListener('click', () => {
    	if (txtHistory.undo(true) !== undefined) {
    		textarea.value = txtHistory.undo()
    	}
    });
    // The redo button
    document.querySelector("#redo").addEventListener('click', () => {
    	if (txtHistory.redo(true) !== undefined) {
    		textarea.value = txtHistory.redo()
    	}
    });

    //Select new file a-tag
    const newFile = document.getElementById("new");
    //Add event listener to refresh page after user preses it
    newFile.addEventListener('click', ()=>{
    textarea.classList.add('animate__animated', 'animate__rollIn');   
    setTimeout(function() {
     textarea.classList.remove('animate__animated', 'animate__rollIn');
    }, 1000);
    	textarea.value="";
    });

    //====================================================
    let textFile = null,
  	makeTextFile = function(text){
    let data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  const link = document.getElementById('downloadlink');
  	link.addEventListener('click', function () {
    link.href = makeTextFile(textarea.value);
    link.style.display = 'block';
  }, false);

