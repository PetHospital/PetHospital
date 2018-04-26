export interface RoomInfo {
    name: string;
    intro: string;
    image: string;
    charge: string;
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


export interface ExamQuestion {
    qid: number;
    text: String;
    kind: String;
    choice1: String;
    choice2: String;
    choice3: String;
    choice4: String;
    answer: String;
    score: number;
    solution: String;
}

export interface SingleItem {
    id: number;
    name: String;
    level: number;
}

export interface PracticeItem {
    id: number;
    name: String;
    items: SingleItem[];
    level: String;
}

export interface ExamItem {
    eid: number;
    description: String;
    postdate: String;
    pubdate: String;
    author: number;
    duration: number;
    taken: boolean;
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

export interface DiseaseTree {
    id: number;
    name: string;
    children: Disease[];
}

export interface Disease {
    id: number;
    name: string;
    description: string;
    images: string[];
    video: string;
}
export interface PracticeTitle {
    id: number;
    name: String;
}

export interface PracticeTab {
    id: number;
    name: String;
}

export interface DialogInfo {
    role: string;
    progresess: Array<string>;
    clickMessages: Array<string>;
}
export interface TestResult {
    submit_id: number;
    question: ExamQuestion;
    date: number;
    exam_id: String;
    choice: String;
    user: number;
    isCorrect: boolean;
}
export interface Operation {
    id: number;
    image: String;
    text: String;
}

export interface ExamUser {
    score: number;
    name: String;
}
