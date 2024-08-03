import { RequestHandler } from "express";
import NotesModel from "../models/note";
import createHttpError from "http-errors";
import { NoteBody, NotePathParam } from "../models/types";

export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    console.log("tests log ");
    const notes = await NotesModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getSingleNote: RequestHandler<
  NotePathParam,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;

    const note = await NotesModel.findById(noteId).exec();
    if (!note) createHttpError(404, "There is no note with that id");
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Notes must have a title");
    }
    const newNote = await NotesModel.create({
      title,
      text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  NotePathParam,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const title = req.body.title;
    const text = req.body.text;
    const note = await NotesModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, "No note with the provided is");
    note.text = text;
    note.title = title!;
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};
