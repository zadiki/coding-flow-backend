import * as NotesController from "../controller/notescontroller";
import express from "express";
import { validateNote, validatepathId } from "../validation/validator";

const router = express.Router();

router.get("/", NotesController.getAllNotes);
router.post("/", validateNote, NotesController.createNote);
router.patch("/:noteId", validatepathId, NotesController.updateNote);
router.get("/:noteId", validatepathId, NotesController.getSingleNote);
export default router;
