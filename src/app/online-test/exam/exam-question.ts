export class Option {
    id: String;
    content: String;
}

export class ExamQuestion {
    id: number;
    type: String;
    subject: String;
    options: Option[];
    answer: String;
    solution: String;
}
