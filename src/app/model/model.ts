export interface RoomInfo {
    name: string;
    intro: string;
    image: string;
}

export interface RoleInfo {
    id: string;
    data: {
        content: string;
        pic: string[];
        video: string;
    };
}

export interface MedicalRecord {
    name: string;
    id: number;
    children: Array<any>;
    isExpanded: boolean;
}

export interface Option {
    id: String;
    content: String;
}

export interface ExamQuestion {
    id: number;
    type: String;
    subject: String;
    options: Option[];
    answer: String;
    solution: String;
}
export interface SingleItem {
    id: number;
    name: String;
    level: String;
}

export interface PracticeItem {
    id: number;
    name: String;
    items: SingleItem[];
}

export interface ExamItem {
    id: number;
    name: String;
    startTime: String;
    duration: number;
}
export interface Mistake {
    id: number;
    question: ExamQuestion;
    wrongAnswer: String;
    showSolution: boolean;
    collectStatus: boolean;
}
export interface Collection {
    id: number;
    question: ExamQuestion;
    showSolution: boolean;
}

export interface PracticeTitle {
    id: number;
    name: String;
}

export interface PracticeTab {
    id: number;
    name: String;
}
