export interface Question {
    id: number;
    term: string;
    definition: string;
    correct?: number;
    incorrect?: number;
}

export interface Set {
    title: string;
    questions: Question[];
    last_question_id: number;
}
