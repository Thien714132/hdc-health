interface ChatItem {
  answer: string
  explanation: string
  example: string
  askFollowUp: string
  threadId: string
  myQuestion?: string
  id: string
}

interface SendChatParams {
  question: string
  threadId?: string
}
