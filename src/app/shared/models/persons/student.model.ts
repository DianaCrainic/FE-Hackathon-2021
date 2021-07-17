import { Person } from './person.model';

export class Student implements Person {
    id!: number;
    name!: string;
    email!: string;
    serialNumber!: number;
    interests!: string[];
}
