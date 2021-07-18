import { Interest } from '../interest.model';
import { Person } from './person.model';

export class Professor implements Person {
    id!: number;
    name!: string;
    email!: string;
    academicRank!: string;
    schedule!: string;
    interests!: Interest[];
}
