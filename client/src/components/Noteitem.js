import React from 'react'
import NoteContext from "../context/notes/NoteContext";
import { useContext } from 'react';

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context;//object destructring 
  const { updateNote } = props;//object destructring 
  const { note } = props;//object destructring 
  return (
    <div className="col-md-3">
      <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
                      <h5 className="card-title">{note.title}</h5>
                      <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
                      <i className="fa-solid fa-pen-to-square mx-3"onClick={()=>{updateNote(note);}}></i>
                      
            </div>
          
              <p className="card-text">  {note.description}</p>
          </div>
      </div>
    </div>
  )
}

export default NoteItem