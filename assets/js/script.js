const schedConatainer = document.getElementById("schedContainer");
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

let currentTime = moment().format("k");

/* This loop creates the 9 rows and associated columns and elements.
 It then assigns bg colour based on time */
for (var i=1; i<=9; i++) {
    createTimeRow(i);
    setBackground(i);
}

/*This function creates all the html elemnets for the 
 time blocks. It sets up the attributes and ids of all 
 the required elemnts. The id of the save button and textarea
 are use the index provide in the loop to give each row a unique
 id in order to retrieve data to the correct row after it has
 been stored in local storage*/
function createTimeRow(index) {
    // for each loop create a row with class row and 
    const rowEl = document.createElement("div");
    $(rowEl).addClass("row");
    $(rowEl).attr("id", "row" + index);
    //add the row to the container
    schedConatainer.appendChild(rowEl);

    // add a time col to the row
    const timeCol = document.createElement("div");
    $(timeCol).addClass("col-1 hour");
    let time = timeTo12(index + 8)
    timeCol.textContent = time;
    //add the column to the row
    rowEl.appendChild(timeCol);

    // add text col to the row
    const textCol = document.createElement("div");
    $(textCol).addClass("col-10");
    $(textCol).attr("id", "textCol" + index);
    //create the textarea element
    const text = document.createElement("textarea");
    $(text).attr("id", "text" + index);
    $(text).attr("cols", "80");
    $(text).attr("rows", "3");
    text.textContent = getNoteByIndex(index);
    //append tex area to the column
    textCol.appendChild(text);
    //add the column to the row
    rowEl.appendChild(textCol);

    // add save col to the row
    const saveCol = document.createElement("div");
    $(saveCol).addClass("col-1");
    $(saveCol).addClass("saveBtn");
    // create the button
    const button = document.createElement("button");
    $(button).attr("id", "button" + index);
    button.textContent = "\uD83D\uDCBE";
    /* add event listener to the button. When it is clicked
       the saveNote function will be called */
    button.addEventListener("click", saveNote);
    // append the button to the column
    saveCol.appendChild(button);
    //add the column to the row
    rowEl.appendChild(saveCol);
}

//function to convert 24 hour time into 12 hour time
function timeTo12 (twentyfourTime){
    let twelveTime;
    if (twentyfourTime < 13) {
        twelveTime = twentyfourTime + " AM"
    }
    else {
        twelveTime = (twentyfourTime - 12)  + " PM"
    }
    return twelveTime;
}
/* This function applies the appropriate class to the text area
   rows bassed on the current time */
function setBackground(index) {
    let id = "#textCol";
    id = id + index;
    if (currentTime < index + 8) {
        $(id).addClass("future");
    }
    else if (currentTime >= index + 9) {
        $(id).addClass("past");
    }
    else {
        $(id).addClass("present");
    }
}
/* This function  returns the note data for a particular row
based on the index. If there is no data it will return and empty
string */
function getNoteByIndex(index){
    const noteData = getNoteData();
    return noteData[index] || ""
}
/* This function retrieves the notes object from local storage and 
formats it back to a JavaSript object. If no bject is found it 
returns an empty object */
function getNoteData(){
    return JSON.parse(localStorage.getItem("notes")) || {};
}
/* This function stores data in to local stoarge. It is called
when the save button is pressed. It takes text from the textarea
and saves it to the notes object wich has the inputed text indexed
by a number bassed on the row it is in.  */
function saveNote(event) {
    event.preventDefault();

    const button = event.target;
    const buttonId = button.id;
    const index = buttonId.slice(-1);

    const textarea = document.getElementById('text' + index);
    const userInput = textarea.value;

    const noteData = getNoteData();

    noteData[index] =userInput;

    localStorage.setItem('notes', JSON.stringify(noteData));
}