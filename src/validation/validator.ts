import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { ValidationError } from "../models/types";
import {
  notevalidationRules,
  pathNoteIdValidationRules,
  userCredentialsValidationRules,
} from "./validationrules";

// Middleware to handle validation errors
const validateRequest: RequestHandler = (req, res, next): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: ValidationError[] = errors
      .array()
      .map((err) => ({ msg: err.msg, param: err.type }));
    throw createHttpError(422, `${extractedErrors[0].msg}`);
  }
  next();
};

// Combine validation rules and error handling
export const validateUserCredentials = [
  ...userCredentialsValidationRules,
  validateRequest,
];
export const validateNote = [...notevalidationRules, validateRequest];
export const validatepathId = [...pathNoteIdValidationRules, validateRequest];
