/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppContext from '@/context/appContext';
import { usePremiumModal } from '@/context/premiumModalContext';
import { RESPONSE_CODE } from '@/network/config';
import { chatServices } from '@/services/chatServices';
import { randomUUID } from '@/utils/helper';
import { isNullOrEmpty } from '@/utils/method';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface StudyChatProps {
  chats: ChatItem[];
  loading: boolean;
  threadId?: string;
  question: string;
  outOfQuestion: boolean;
}

export const useStudyChat = (noteId: number) => {
  const initData = {
    chats: [],
    loading: false,
    threadId: undefined,
    question: '',
    outOfQuestion: false,
  };
  const [state, setState] = useState<StudyChatProps>(initData);
  const bottomRef = useRef<any>(null);
  const { openPremiumModal } = usePremiumModal();
  useEffect(() => {
    setState(initData);
  }, [noteId]);

  console.log('state', state?.chats);

  const { appState } = useContext(AppContext);

  const onChangeQuestion = (text: string) => {
    setState(prev => ({
      ...prev,
      question: text,
    }));
  };

  const onChatting = async () => {
    if (isNullOrEmpty(state?.question)) {
      return;
    }
    const temp: ChatItem = {
      answer: '',
      explanation: '',
      example: '',
      askFollowUp: '',
      threadId: '',
      myQuestion: state?.question,
      id: randomUUID(),
    };
    setState(prev => ({
      ...prev,
      loading: true,
      chats: [...state?.chats, temp],
      question: '',
    }));

    const params: SendChatParams = {
      question: state?.question,
      threadId: state?.threadId,
    };
    setTimeout(() => {
      scrollToBottom();
    }, 200);

    const res = await chatServices.sendChat(noteId, params);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      res.data.myQuestion = state?.question;

      setState(prev => ({
        ...prev,
        loading: false,
        chats: [...prev?.chats, res?.data],
        question: '',
        threadId: res?.data?.threadId,
      }));

      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } else {
      if (
        res?.status === RESPONSE_CODE.BAD_REQUEST &&
        res?.data === 'Max messages in thread'
      ) {
        if (isNullOrEmpty(appState?.userInfo?.vipPackage)) {
          openPremiumModal();
          toast.info(
            "You've reached the limit! Upgrade to Pro to unlock this feature and continue using it",
          );
        } else {
          setState(prev => ({
            ...prev,
            outOfQuestion: true,
          }));
        }
        toast.error('Max messages in thread.');
      } else {
        toast.error('Something went wrong.');
      }
      setState(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    state,
    onChangeQuestion,
    onChatting,
    bottomRef,
  };
};
