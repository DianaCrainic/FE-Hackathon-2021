import { Professor } from "./persons/professor.model";
import { Student } from "./persons/student.model";

export interface Conversation {
    student: Student,
    professor: Professor
}