import { Student } from './persons/student.model';

export class Thesis {
    id!: number;
    title!: string;
    description!: string;
    student!: Student;
}
