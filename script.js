console.log("hey man");


const addBtn = document.querySelector('.addButton');
const notePad = document.querySelector('.notepad');
addBtn.addEventListener('click', (e)=>{
    // alert("bas kar");
    addNote();
})



const saveNotes = function(){
    const notes = document.querySelectorAll('.note textarea');
    console.log(notes);
    const data = [];
    notes.forEach((note)=>{
        data.push(note.value);
    })
    console.log(data);
    localStorage.setItem("notes", JSON.stringify(data));
}




const addNote = ( text = "") =>     {

    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `<div class="top"> 
                            <span class=" save material-symbols-outlined">save</span>
                            <span class=" delete material-symbols-outlined">delete</span> 
                    </div>
                    <textarea>${text}</textarea>`; // 2 jab local storage se data aya to aise aayga.

    // deleting note

    const delBtn = note.querySelector('.delete');
    delBtn.addEventListener('click', ()=> {
        note.remove();
        saveNotes(); // yahan bhi jab delete ho to tb kim state update ho
    })

    // saving the note so that not removed on refershing
    const saveBtn = note.querySelector('.save');
    saveBtn.addEventListener('click', ()=>{
        saveNotes();
    })

    notePad.appendChild(note);
    saveNotes(); // bina save kiye agar referesh kardiya to bhi data dikhe.

}






(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes")); // vapis se string se isse object bna rahe hai, kyuki array se string bnaya tha save karne ke liye data ko local storage mai.
        console.log(lsNotes);
        lsNotes.forEach( // ye isliye bna rahe hai kyunki jo refresh se phele data aya usse overwrite na kare usse bhi dikhana hai.
            (lsNote) => {
                addNote(lsNote); // 1:jab local storage se data ara to addnote mai bhejna padega.
            }
        )

        // if(lsNotes.length === 0){
        //     localStorage.removeItem("notes")
        // }
        // else{
        //     addNote();
        // }
    }
)()
