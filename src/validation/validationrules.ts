import { body, param, ValidationChain } from "express-validator";
import mongoose from "mongoose";

// Validation rules
export const userCredentialsValidationRules: ValidationChain[] = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const notevalidationRules: ValidationChain[] = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("title must be between 3 and 30 characters"),

  body("text")
    .notEmpty()
    .withMessage("text is required")
    .isString()
    .withMessage("text must be a string")
    .isLength({ min: 6 })
    .withMessage("text must be at least 6 characters long"),
];
export const pathNoteIdValidationRules: ValidationChain[] = [
  param("noteId")
    .custom((value) => {
      const status: boolean = mongoose.isValidObjectId(value);
      return status;
    })
    .withMessage("provided id is not valid"),
];
