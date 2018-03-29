import {Option, ExamQuestion} from '../exam/exam-question';

export class Mistake {
    id: number;
    question: ExamQuestion;
    wrongAnswer: String;
    showSolution: boolean;
    collectStatus: boolean;
}
