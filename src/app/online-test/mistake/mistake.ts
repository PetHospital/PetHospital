import {Option} from '../exam/exam-question';

export class Mistake {
    id: number;
    type: String;
    subject: String;
    options: Option[];
    wrongAnswer: String;
    correctAnswer: String;
    solution: String;
    showSolution: boolean;
    collectStatus: String;
}
