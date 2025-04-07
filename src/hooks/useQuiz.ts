/* eslint-disable react-hooks/exhaustive-deps */
import { NetWork } from '@/network';
import { RESPONSE_CODE } from '@/network/config';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { isNullOrEmpty } from '@/utils/method';
import { useEffect, useState } from 'react';

export const useQuiz = (noteDetail: NoteItem) => {
  const [quiz, setQuiz] = useState<Quiz[]>(noteDetail?.quiz ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (isNullOrEmpty(noteDetail?.quiz)) {
      fetchData();
    } else {
      setQuiz(shuffleArray(noteDetail?.quiz ?? []));
    }
  }, [noteDetail]);

  const fetchData = async () => {
    setLoading(true);
    const res = await NetWork.post(
      getRequestUrl(API_URL.NOTES, {
        parentId: noteDetail?.id,
        partial: API_URL.QUIZ,
      }),
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setQuiz(shuffleArray(res?.data));
    }
    setLoading(false);
  };

  const shuffleArray = (array: Quiz[]) => {
    return array
      .map(item => ({ ...item, options: shuffle([...item.options]) }))
      .sort(() => Math.random() - 0.5);
  };

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {}, []);

  const goToNextCard = (): void => {
    if (currentIndex < quiz?.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevCard = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const onPickAnswer = (option: string, quizIndex: number) => {
    setQuiz(prevQuestions =>
      prevQuestions.map((q, i) =>
        i === quizIndex
          ? {
              ...q,
              result: option === quiz[quizIndex]?.correctAnswer,
              pickOptions: option,
            }
          : q,
      ),
    );
  };

  return {
    quiz,
    loading,
    goToNextCard,
    goToPrevCard,
    currentIndex,
    setCurrentIndex,
    onPickAnswer,
  };
};
