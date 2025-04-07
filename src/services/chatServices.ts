import { NetWork } from '@/network';
import { API_URL } from '@/network/url';
import { deleteParamsNotUsing, getRequestUrl } from '@/network/utils';

const sendChat = async (noteId: number, params: SendChatParams) => {
  deleteParamsNotUsing(params);

  console.log('noteId', noteId);
  return await NetWork.post(
    getRequestUrl(API_URL.NOTES, {
      parentId: noteId,
      partial: API_URL.CHAT,
    }),
    params,
  );
};

export const chatServices = {
  sendChat,
};
