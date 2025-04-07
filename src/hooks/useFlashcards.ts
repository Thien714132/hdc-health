/* eslint-disable react-hooks/exhaustive-deps */
import { NetWork } from '@/network';
import { RESPONSE_CODE } from '@/network/config';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { isNullOrEmpty } from '@/utils/method';
import { useEffect, useRef, useState } from 'react';

export const useFlashcards = ({
  flashcards,
  noteId,
  callBackSuccess,
}: {
  flashcards: FlashCard[] | null | undefined;
  noteId: number;
  callBackSuccess?: (flashcards: FlashCard[]) => void;
}) => {
  const [data, setData] = useState<FlashCard[] | null | undefined>(flashcards);
  const [loading, setLoading] = useState<boolean>(false);
  const isShuffle = useRef<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await NetWork.post(
      getRequestUrl(API_URL.NOTES, {
        parentId: noteId,
        partial: API_URL.FLASHCARD,
      }),
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      const dataResp = res?.data;
      const shuffled = dataResp?.sort(() => 0.5 - Math.random());
      setData(shuffled);
      callBackSuccess?.(shuffled);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isNullOrEmpty(flashcards) && noteId) {
      fetchData();
    } else if (flashcards) {
      setData(flashcards);
      isShuffle.current = false;
    }
  }, [noteId]);

  console.log('rểnderer___');

  useEffect(() => {
    if (data && !isShuffle.current) {
      isShuffle.current = true;
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setData(shuffled);
    }
  }, []);

  return {
    data: data || [],
    loading,
  };
};
