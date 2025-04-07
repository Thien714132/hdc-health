/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NetWork } from '@/network';
import { RESPONSE_CODE } from '@/network/config';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { folderServices } from '@/services/folderServices';
import { isNullOrEmpty } from '@/utils/method';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type FolderStateProps = {
  loading: boolean;
  loadingDetail: boolean;
  noteDetail: NoteItem;
  folderId: string;
  folderData: FolderItem;
};

const initState = {
  loading: false,
  loadingDetail: false,
  noteDetail: {} as NoteItem,
  folderId: '',
  folderData: {} as FolderItem,
};

export const useNoteDetail = (noteId: any, folderId?: any) => {
  const [state, setState] = React.useState<FolderStateProps>(initState);

  const router = useRouter();
  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (noteId) {
      getNoteDetail(noteId);
    }
  }, [noteId]);

  const getNoteDetail = async (id: number) => {
    setState(prev => ({
      ...prev,
      loadingDetail: true,
    }));
    const res = await NetWork.get(
      getRequestUrl(API_URL.NOTES, {
        parentId: id,
      }),
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState(prev => ({
        ...prev,
        loadingDetail: false,
        noteDetail: res?.data,
      }));
    }
    setState(prev => ({
      ...prev,
      loadingDetail: false,
    }));
  };

  const getNotes = async (id?: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
    }));

    const res = await folderServices.getNotesInFolder(id ?? folderId);

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState(prev => ({
        ...prev,
        loading: false,
        folderData: res?.data,
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
      }));
      toast.error('Something went wrong.');
    }
  };

  const onSubmitEditing = async (title: string) => {
    if (isNullOrEmpty(title) || title + '' === state?.noteDetail?.title + '') {
      return;
    }
    // update title
    const params = {
      title,
    };
    const res = await NetWork.patch(
      getRequestUrl(API_URL.NOTES, { partial: noteId }),
      params,
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      callbackUpdateTitle?.(noteId, title);
      toast.success('Update title success');
    }

    callbackUpdateTitle?.(noteId, title);
  };

  const callbackUpdateTitle = (id: number, title: string) => {
    const index = state?.folderData?.notes?.findIndex(
      item => item?.id + '' === id + '',
    );

    if (index !== -1) {
      const clone = [...(state?.folderData?.notes as any)];
      clone[index as any].title = title;
      setState(prev => ({
        ...prev,
        initNotes: clone,
      }));
    }
  };

  const onDeleteNoteSuccess = () => {
    if (state?.folderData?.notes?.length === 1) {
      router?.back();
    } else {
      if (noteId + '' === state?.folderData?.notes?.[0]?.id + '') {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              noteId: state?.folderData?.notes?.[1]?.id,
            },
          },
          undefined,
          { shallow: true },
        );
      } else {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              noteId: state?.folderData?.notes?.[0]?.id,
            },
          },
          undefined,
          { shallow: true },
        );
      }
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          folderData: {
            ...state?.folderData,
            notes: state?.folderData?.notes?.filter(
              item => item?.id + '' !== noteId + '',
            ),
          },
        }));
      }, 100);
    }
  };

  return {
    state,
    getNotes,
    onSubmitEditing,
    onDeleteNoteSuccess,
  };
};
