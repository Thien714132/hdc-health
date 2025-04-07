import { NetWork } from '@/network';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';

const likeNote = async (id: string, liked: number) => {
  return await NetWork.patch(
    getRequestUrl(API_URL.NOTES, {
      parentId: id,
    }),
    {
      isLiked: liked,
    },
  );
};

const reportNote = async (id: string, options: string[], content: string) => {
  return await NetWork.post(
    getRequestUrl(API_URL.NOTES, {
      parentId: id,
      partial: API_URL.REPORT,
    }),
    {
      options,
      content,
    },
  );
};

export const noteServices = {
  likeNote,
  reportNote,
};
