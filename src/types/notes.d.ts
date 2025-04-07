interface NoteItem {
  id: number;
  userId?: string;
  title?: string;
  type?: string;
  content?: string;
  createdDate?: string;
  modifiedDate?: string;
  attachment?: {
    id: string;
    idStr: string;
    originalName: string;
    contentType: string;
    fileType: string;
    fileName: string;
    fileNameDecode: string;
    fileParent: string;
    filePath: string;
    status: string;
    attachType: string;
    size: number;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
    url: string;
  };
  summary?: string;
  isLiked?: number;
  link?: string;
  flashCards: FlashCard[] | null;
  quiz: Quiz[] | null;
  exam: Exam[] | null;
}

type AttachmentProps = {
  name?: string | null;
  uri?: string | null;
  type?: string | null;
  size?: number | null;
};

type FlashCard = {
  question: string;
  answer: string;
  threadId: string;
};

type Quiz = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  threadId: string;
  result?: boolean;
  pickOptions?: string;
};

type Exam = {
  questionId: string;
  questionText: string;
  questionType: string;
  evaluationCriteria: string;
  threadId?: string;
};

type ExamResult = {
  score: 'Correct' | 'Incorrect' | 'Partially Correct';
  feedback: string;
  keyPointsMatched: string;
  suggestionsForImprovement: string;
  threadId: string;
  questionId: string;
  answer: string;
};
