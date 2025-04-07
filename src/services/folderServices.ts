/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetWork } from '@/network';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { AxiosResponse } from 'axios';

const createFolder = async (name: string) => {
  return await NetWork.post(getRequestUrl(API_URL.FOLDER), {
    name,
  });
};

const getListFolders = async (): Promise<AxiosResponse<FolderItem[]>> => {
  return await NetWork.get(getRequestUrl(API_URL.FOLDER));
};

const deleteFolder = async (id: string): Promise<AxiosResponse<any>> => {
  return await NetWork.deleteMethod(
    getRequestUrl(API_URL.FOLDER, { partial: id }),
  );
};

const getNotesInFolder = async (
  folderId: string | undefined,
): Promise<AxiosResponse<any>> => {
  return await NetWork.get(
    getRequestUrl(
      API_URL.WEB_NOTES,
      { partial: API_URL.BY_FOLDER },
      folderId ? { folderId } : {},
    ),
  );
};

export const folderServices = {
  createFolder,
  getListFolders,
  deleteFolder,
  getNotesInFolder,
};
