export interface NoteBody {
  title?: string;
  text?: string;
}
export interface UserCredentials {
  username: string;
  password: string;
}

export interface ValidationError {
  msg: string;
  param: string;
}
export interface NotePathParam {
  noteId?: string;
}
