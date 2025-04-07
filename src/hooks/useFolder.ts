/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESPONSE_CODE } from '@/network/config';
import { folderServices } from '@/services/folderServices';
import { removeAccents } from '@/utils/method';
import { isNullOrEmpty } from '@/utils/stringUtils';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type FolderStateProps = {
  folders: FolderItem[] | any;
  loading: boolean;
  searchText: string;
  initFolderData: FolderItem[];
  isShowModal: boolean;
  addFolderName: string | undefined;
  addLoading: boolean;
  errorAdd: string | undefined;
  focusFolder: FolderItem | any;
  focusInput: boolean;
};

const initState = {
  loading: true,
  folders: [],
  searchText: '',
  initFolderData: [],
  isShowModal: false,
  addFolderName: undefined,
  addLoading: false,
  errorAdd: undefined,
  focusFolder: {},
  focusInput: false,
};

export const useFolder = () => {
  const [state, setState] = React.useState<FolderStateProps>(initState);

  const getListFolders = async () => {
    setState(prev => ({
      ...prev,
      loading: true,
    }));

    const res = await folderServices.getListFolders();
    if (res?.status === RESPONSE_CODE?.SUCCESS) {
      setState(prev => ({
        ...prev,
        loading: false,
        folders: res?.data,
        initFolderData: res?.data,
        focusFolder: res?.data?.[0],
      }));
    } else {
      toast.error('Something went wrong.');
      setState(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    getListFolders();
  }, []);

  const updateList = (item: FolderItem) => {
    const temp = state?.initFolderData;
    temp?.splice(1, 0, item);
    setState(prev => ({
      ...prev,
      folders: temp,
      initFolderData: temp,
      searchText: '',
    }));
  };

  const onSearch = (text: string) => {
    const normalizedQuery = removeAccents(text?.trim()?.toLowerCase());
    const result = state?.initFolderData?.filter(item =>
      removeAccents(item?.name?.trim()?.toLowerCase())?.startsWith(
        normalizedQuery,
      ),
    );
    setState(prev => ({
      ...prev,
      folders: result,
      searchText: text,
    }));
  };

  const onDeleteFolder = (id: string) => {
    const temp = state?.initFolderData;
    const existIndex = state?.initFolderData?.findIndex(
      item => item?.id === id,
    );
    if (existIndex !== -1) {
      temp?.splice(existIndex, 1);
      setState(prev => ({
        ...prev,
        initFolderData: temp,
      }));
    }
    const temp2 = state?.folders;

    if (!isNullOrEmpty(state?.searchText)) {
      const existIndex2 = state?.folders?.findIndex(
        (item: { id: string }) => item?.id === id,
      );
      if (existIndex2 !== -1) {
        temp2?.splice(existIndex2, 1);
        setState(prev => ({
          ...prev,
          folders: temp2,
        }));
      }
    }
    setState(prev => ({
      ...prev,
      focusFolder: state?.folders[0],
    }));
  };

  const updateNumberOfNote = () => {
    const temp = state?.initFolderData;
    temp[0].numberOfNote = state?.initFolderData[0]?.numberOfNote + 1;
    setState(prev => ({
      ...prev,
      folders: temp,
    }));
    if (!isNullOrEmpty(state?.focusFolder?.id)) {
      const temp = state?.initFolderData;
      const existIndex = state?.initFolderData?.findIndex(
        item => item?.id === state?.focusFolder?.id,
      );
      if (existIndex !== -1) {
        temp[existIndex].numberOfNote =
          state?.initFolderData[existIndex].numberOfNote + 1;
        setState(prev => ({
          ...prev,
          initFolderData: temp,
        }));
      }
      const temp2 = state?.folders;

      if (!isNullOrEmpty(state?.searchText)) {
        const existIndex2 = state?.folders?.findIndex(
          (item: { id: any }) => item?.id === state?.focusFolder?.id,
        );
        if (existIndex2 !== -1) {
          temp2[existIndex].numberOfNote =
            state?.folders[existIndex].numberOfNote + 1;
          setState(prev => ({
            ...prev,
            folders: temp2,
          }));
        }
      }
    }
  };

  const updateAfterDeleteNote = (folderId?: string) => {
    const temp = state?.initFolderData;
    temp[0].numberOfNote = state?.initFolderData[0]?.numberOfNote - 1;
    setState(prev => ({
      ...prev,
      folders: temp,
    }));
    if (!isNullOrEmpty(folderId)) {
      const temp = state?.initFolderData;
      const existIndex = state?.initFolderData?.findIndex(
        item => item?.id === folderId,
      );
      if (existIndex !== -1) {
        temp[existIndex].numberOfNote =
          state?.initFolderData[existIndex].numberOfNote - 1;
        setState(prev => ({
          ...prev,
          initFolderData: temp,
        }));
      }
      const temp2 = state?.folders;

      if (!isNullOrEmpty(state?.searchText)) {
        const existIndex2 = state?.folders?.findIndex(
          (item: { id: string | undefined }) => item?.id === folderId,
        );
        if (existIndex2 !== -1) {
          temp2[existIndex].numberOfNote =
            state?.folders[existIndex].numberOfNote - 1;
          setState(prev => ({
            ...prev,
            folders: temp2,
          }));
        }
      }
    }
  };

  const updateAfterDeleteFolder = (numberOfNote: number) => {
    const temp = state?.initFolderData;
    temp[0].numberOfNote =
      state?.initFolderData[0]?.numberOfNote - numberOfNote;
    setState(prev => ({
      ...prev,
      folders: temp,
    }));
  };

  const openModal = () => {
    setState(prev => ({
      ...prev,
      isShowModal: true,
      errorAdd: undefined,
    }));
  };

  const closeModal = () => {
    // if (state?.addLoading) {
    //   return;
    // }
    setState(prev => ({
      ...prev,
      isShowModal: false,
      errorAdd: undefined,
      addLoading: false,
      addFolderName: '',
      focusInput: false,
    }));
  };

  const onChangeFolderName = (e: any) => {
    setState(prev => ({
      ...prev,
      addFolderName: e?.target?.value,
      errorAdd: undefined,
    }));
  };

  const onAddFolder = async () => {
    if (!isNullOrEmpty(state?.errorAdd) || state?.addLoading) {
      return;
    }
    if (isNullOrEmpty(state?.addFolderName)) {
      setState(prev => ({
        ...prev,
        errorAdd: 'Folder name must not be blank!',
      }));
      return;
    }
    setState(prev => ({
      ...prev,
      errorAdd: undefined,
      addLoading: true,
    }));
    const res = await folderServices.createFolder(
      state?.addFolderName?.trim() ?? '',
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      updateList(res?.data);
      setState(prev => ({
        ...prev,
        addLoading: false,
      }));
      closeModal();
    } else {
      setState(prev => ({
        ...prev,
        addLoading: false,
        errorAdd:
          typeof res?.data === 'string' ? res?.data : 'Something went wrong',
      }));
    }
  };

  const onPressFolder = (item: FolderItem) => {
    setState(prev => ({
      ...prev,
      focusFolder: item,
    }));
  };

  const setFocus = (v: boolean) => {
    setState(prev => ({
      ...prev,
      focusInput: v,
    }));
  };

  return {
    state,
    getListFolders,
    updateList,
    onSearch,
    onDeleteFolder,
    updateNumberOfNote,
    updateAfterDeleteNote,
    updateAfterDeleteFolder,
    openModal,
    closeModal,
    onChangeFolderName,
    onAddFolder,
    onPressFolder,
    setFocus,
  };
};
