export interface Question {
    id: number;
    term: string;
    definition: string;
}
export interface Set {
    title: string;
    questions: Question[];
    last_question_id: number;
}
