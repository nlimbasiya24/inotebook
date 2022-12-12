const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //middleware use for fetch data
const Note = require("../models/Note"); //Notes file access from models
const { body, validationResult } = require("express-validator"); //validate the input


//Route1:Get all the Notes :POST "api/notes/fetchallnotes" ,Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  //fetch all notes
  try {
    const notes = await Note.find({ user: req.user.id }); //find notes from userid
   // console.log(notes);
    res.json(notes); //get all notes from Add note
  } catch (error) {
    //if the error then
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route2: Add a new Note using :POST "api/notes/addnote" login required
router.post("/addnote",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast five character").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;//destructuring concept
      //If there are errors,return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //fetch all notes
      //find notes from userid
      //console.log(req)
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//Route 3: Update a  Note using :PUT "api/notes/updatenote" login required

router.put("/updatenote/:id", fetchuser, async (req,res) => {
  // debugger;
  const { title, description, tag } = req.body;//destructuring 
 // console.log(req.body);

  try {
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    } // if the note is not found then

    if (note.user.toString() !== req.user.id) {
      //  console.log(note.user.toString());
      //  console.log(req.user.id);
      //user id is not matched
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

//Route 4: Delete a  Note using :DELETE "api/notes/deletenote" login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // debugger;
  try {
    //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    } // Allow deletion only if use owns this Note

    if (note.user.toString() !== req.user.id) {
       //user id is not matched
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
