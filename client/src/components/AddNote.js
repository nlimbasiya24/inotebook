import React,{useState,useContext}  from 'react'
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote}=context;
    //console.log(addNote);

    const [note, setNote] = useState({title:"",description:"",tag:""})
   // console.log(note);

    const handleClick=(e)=>{
        
        e.preventDefault(); //not a page reload
        addNote(note.title,note.description,note.tag)
        console.log(addNote);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")

    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})//sperad Operator

    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-4">
                    <label htmlFor="title"className="from-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}
                    onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="from-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>  
                <div className="mb-3">
                    <label htmlFor="tag" className="from-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote