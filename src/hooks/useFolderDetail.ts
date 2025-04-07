/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { RESPONSE_CODE } from '@/network/config';
import { folderServices } from '@/services/folderServices';
import { isNullOrEmpty, removeAccents } from '@/utils/method';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type FolderStateProps = {
  loading: boolean;
  loadingDelete: boolean;
  notes: NoteItem[];
  initNotes: any[];
  searchText: string;
  folderData: FolderItem;
  disableNote: boolean;
};

const initState = {
  loading: false,
  loadingDelete: false,
  notes: [],
  initNotes: [],
  searchText: '',
  folderData: {},
  disableNote: false,
};

export const useFolderDetail = (folderRef: any, deleteFolderRef?: any) => {
  const [state, setState] = React.useState<FolderStateProps>(initState as any);

  console.log('asdasd____stasasd', state?.folderData);

  const onDeleteFolder = async () => {
    setState(prev => ({
      ...prev,
      loadingDelete: true,
    }));
    const res = await folderServices.deleteFolder(state?.folderData?.id);
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState(prev => ({
        ...prev,
        loadingDelete: false,
        folderData: {
          ...state?.folderData,
          name: 'All notes',
          id: '',
          numberOfNote: state?.folderData?.numberOfNote - state?.notes?.length,
        },
      }));
      folderRef?.current?.onDeleteFolder(state?.folderData?.id);
      // folderRef?.current?.updateAfterDeleteFolder?.(
      //   Number(state?.notes?.length),
      // );
      getNotes(true);
      deleteFolderRef?.current?.closeModal();
      // goBack()
    } else {
      toast.error('Something went wrong!');
      setState(prev => ({
        ...prev,
        loadingDelete: false,
      }));
    }
  };

  useEffect(() => {
    const FolderId = sessionStorage.getItem('folderId');
    console.log('ádasd___FolderId', FolderId);
    if (!FolderId) {
      getNotes();
    }
    // StorageSession.isGoToAllFolder = true;
  }, []);

  const getNotes = async (isAllNote?: boolean, folderId?: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
    }));

    const res = await folderServices.getNotesInFolder(
      isAllNote ? undefined : folderId ? folderId : state?.folderData?.id,
    );

    console.log('res?.___', res?.data);

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState(prev => ({
        ...prev,
        loading: false,
        initNotes: res?.data?.notes,
        notes: res?.data?.notes,
        folderData: {
          id: isAllNote ? undefined : res?.data?.id,
          userId: res?.data?.userId,
          name: res?.data?.name,
          createdDate: res?.data?.createdDate,
          numberOfNote: res?.data?.numberOfNote,
          isAll: false,
        },
      }));
    } else {
      setState(prev => ({
        ...prev,
        loading: false,
      }));
      toast.error('Something went wrong.');
    }
  };

  const onSearch = (text: string) => {
    const normalizedQuery = removeAccents(text?.trim()?.toLowerCase());
    const result = state?.initNotes?.filter(item =>
      removeAccents(item?.title?.trim()?.toLowerCase())?.startsWith(
        normalizedQuery,
      ),
    );
    setState(prev => ({
      ...prev,
      notes: result,
      searchText: text,
    }));
  };

  const onDeleteNote = (id: number) => {
    const temp = state?.initNotes;
    const existIndex = state?.initNotes?.findIndex(item => item?.id === id);
    if (existIndex !== -1) {
      temp?.splice(existIndex, 1);
      setState(prev => ({
        ...prev,
        initFolderData: temp,
      }));
    }
    const temp2 = state?.notes;

    if (!isNullOrEmpty(state?.searchText)) {
      const existIndex2 = state?.notes?.findIndex(item => item?.id === id);
      if (existIndex2 !== -1) {
        temp2?.splice(existIndex2, 1);
        setState(prev => ({
          ...prev,
          notes: temp2,
        }));
      }
    }
    folderRef?.current?.updateAfterDeleteNote?.(state?.folderData?.id);
  };

  const pressSaveFolder = (folder: FolderItem) => {
    setState(prev => ({
      ...prev,
      folderData: folder,
    }));
  };

  const onDisableNotes = () => {
    setState(prev => ({
      ...prev,
      disableNote: true,
    }));
  };
  const onShowNotes = () => {
    setState(prev => ({
      ...prev,
      disableNote: false,
    }));
  };

  return {
    state,
    onDeleteFolder,
    onSearch,
    onDeleteNote,
    pressSaveFolder,
    onDisableNotes,
    onShowNotes,
    getNotes,
  };
};
