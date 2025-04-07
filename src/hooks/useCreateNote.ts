/* eslint-disable @typescript-eslint/no-explicit-any */
import AppContext from '@/context/appContext';
import { usePremiumModal } from '@/context/premiumModalContext';
import { NetWork } from '@/network';
import { RESPONSE_CODE } from '@/network/config';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { NEW_NOTE_METHODS } from '@/utils/enums';
import { isNullOrEmpty } from '@/utils/method';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export const useCreateNote = (
  callbackCreateSuccess?: () => void,
  noteRef?: any,
) => {
  const { appState } = useContext(AppContext);
  const [title, setTitle] = useState<string>('');
  const [attachments, setAttachments] = useState<any | undefined>(undefined);
  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<FolderItem | undefined>(
    undefined,
  );
  const [visibleRecordAudio, setVisibleRecordAudio] = useState<boolean>(false);
  const disable = isNullOrEmpty(attachments);
  const { openPremiumModal } = usePremiumModal();

  const isLimitNote =
    appState?.userInfo?.amount <= 0 &&
    isNullOrEmpty(appState?.userInfo?.vipPackage);

  console.log(
    'attachments',
    appState?.userInfo?.amount,
    appState?.userInfo?.vipPackage,
  );

  // const isLimitNote =
  //   appState?.userInfo?.amount <= 0 && !appState?.userInfo?.vipPackage;

  // const onSelectFile = (file: DocumentPickerResponse[]) => {
  //   setAttachments({
  //     name: encodeFilename(file?.[0]?.name),
  //     size: file?.[0]?.size,
  //     uri: file?.[0]?.uri,
  //     type: file?.[0]?.type,
  //   })
  // }

  const onSendRecordAudio = (audio: File) => {
    setAttachments({
      name: audio?.name,
      uri: audio?.webkitRelativePath,
      type: audio?.type,
      size: audio?.size,
    });
  };

  // console.log('attachments', attachments);

  // const onSelectImage = (image: ImageOrVideo) => {
  //   const pathParts = image.path.split('/')
  //   setAttachments({
  //     name: pathParts[pathParts.length - 1],
  //     uri: image?.path,
  //     type: image?.mime ?? 'image/jpeg',
  //   })
  //

  // const { onPickerDocument } = usePickerDocument(onSelectFile, callbackErrorFile)
  // const { onPickerImage } = usePickerImage(onSelectImage)

  const onChangeNoteTitle = (value: string) => {
    setTitle(value);
  };

  const onCloseTextInput = () => {
    if (!isNullOrEmpty(inputText)) {
      setInputText('');
    } else {
      setAttachments(undefined);
    }
  };

  const onChangeText = (text: string) => {
    setInputText(text);
  };

  // const getUserInfo = async () => {
  //   const res = await AuthServices.getUserInfo();
  //   const userData = { ...res.data };
  //   userData.isPremium = !!userData.vipPackage;
  //   if (res.status === RESPONSE_CODE.SUCCESS) {
  //     dispatch({
  //       type: APPLICATION_ACTION_TYPE.UPDATE_USER_INFO,
  //       payload: userData,
  //     });
  //   }
  // };

  const startGenerate = async () => {
    // logEventTracking(FirebaseLogEvent.robonote_new_gen)
    console.log(
      'attachments',
      appState?.userInfo?.amount,
      appState?.userInfo?.vipPackage,
    );
    if (isLimitNote) {
      openPremiumModal();
      return;
    }
    setLoading(true);

    const body = new FormData();
    if (!isNullOrEmpty(title)) {
      body.append('title', title);
    }
    if (!isNullOrEmpty(inputText) && method === NEW_NOTE_METHODS.INPUT_TEXT) {
      body.append('text', inputText);
    }
    if (
      attachments?.size > 0 &&
      (method === NEW_NOTE_METHODS.UPLOAD_FILE ||
        method === NEW_NOTE_METHODS.RECORD_AUDIO)
    ) {
      body.append('file', attachments);
    }

    if (method === NEW_NOTE_METHODS.USE_LINK) {
      body.append('link', attachments?.name);
    }
    if (!isNullOrEmpty(currentFolder)) {
      body.append('folderId', currentFolder?.id ?? '');
    }

    const res = await NetWork.postFormData(
      getRequestUrl(API_URL.WEB_NOTES),
      body,
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      // logEvent(FirebaseLogEvent.robonote_new_gen_success)
      // if (!isShowedRateApp) {
      //   setTimeout(() => {
      //     setKeyBoolean(MMKV_KEYS.IS_SHOWN_RATE_APP_DETAIL, true)
      //   }, 500)
      // }
      // navigate(APP_SCREEN.NOTE_DETAIL_SCREEN, {
      //   noteId: res?.data?.id,
      //   callbackUpdateTitle: () => {
      //     callbackCreateSuccess?.(folderId)
      //   },
      // })
      goBack();
      callbackCreateSuccess?.();
      // await getUserInfo();
    } else {
      toast.error(
        typeof res?.data === 'string' ? res?.data : 'Something went wrong',
      );
      if (res?.data.includes('violates our guidelines')) {
        // logEvent(FirebaseLogEvent.robonote_new_gen_nsfw)
      }
      setError(
        res?.data?.errorMessages ??
          'An error occurred. Please try again later.',
      );
      if (res?.data.includes('No more free notes')) {
        // navigate(APP_SCREEN.PAY_WALL_SCREEN, {})
        openPremiumModal();
        setError('No more free notes.');
      } else {
        // logEvent(FirebaseLogEvent.robonote_new_gen_noassist)
      }
    }
    setLoading(false);
  };

  const handleClearAttachment = () => {
    setAttachments(undefined);
    setTitle('');
  };

  const onDisableNewNotes = (folder?: FolderItem) => {
    setIsShow(false);
    setCurrentFolder(folder ?? undefined);
    setAttachments(undefined);
    setTitle('');
    // setLink('');
  };

  const onShowNewNotes = (method: string) => {
    setMethod(method);
    setIsShow(true);
  };

  const saveAudio = (audio: any) => {
    setAttachments(audio);
  };

  console.log(disable);

  const saveLink = (link: string) => {
    setAttachments({ size: 1, name: link });
  };

  const goBack = () => {
    onDisableNewNotes();
    noteRef?.current?.onShowNotes();
  };

  const saveText = (text: string) => {
    setInputText(text);
    setAttachments({ size: 1, name: text });
  };

  return {
    disable,
    attachments,
    method,
    title,
    error,
    loading,
    // link,
    isShow,
    visibleRecordAudio,
    currentFolder,
    handleClearAttachment,
    // onClosePasteLink,
    onChangeNoteTitle,
    startGenerate,
    // handleSubmitLink,
    // onChangeLink,
    setVisibleRecordAudio,
    onSendRecordAudio,
    onCloseTextInput,
    onChangeText,
    inputText,
    onDisableNewNotes,
    onShowNewNotes,
    setAttachments,
    saveAudio,
    saveLink,
    goBack,
    saveText,
  };
};
