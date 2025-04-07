/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { RichTextEditorHandle } from '@/components/RichTextEditor/RichTextEditor';
import { formatSummary } from '@/utils/helper';
import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import IconClose from '../../../public/svg/ic_grey_close.svg';
import dynamic from 'next/dynamic';
import { NetWork } from '@/network';
import { API_URL } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { RESPONSE_CODE } from '@/network/config';
import { toast } from 'react-toastify';
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor/RichTextEditor'),
  {
    ssr: false,
  },
);

type EditorModalProps = {
  summary: any;
  callBackSuccess: (summary: string) => void;
  noteId: string;
};

export type EditorModalRefProps = {
  showModal: () => void;
  closeModal: () => void;
};

type stateProps = {
  isShow: boolean;
  loading: boolean;
};

export const EditorModal = forwardRef<EditorModalRefProps, EditorModalProps>(
  (props, ref) => {
    const [state, setState] = useState<stateProps>({
      isShow: false,
      loading: false,
    });
    const showModal = () => {
      setState(prev => ({
        ...prev,
        isShow: true,
      }));
    };
    const closeModal = () => {
      setState(prev => ({
        ...prev,
        isShow: false,
      }));
    };

    useImperativeHandle(ref, () => ({
      showModal,
      closeModal,
    }));

    const richTextEditorRef = useRef<RichTextEditorHandle>(null);
    // const [editorContent, setEditorContent] = useState<string>('');

    const onSave = async (summary: string) => {
      setState(prev => ({
        ...prev,
        loading: true,
      }));
      const res = await NetWork.patch(
        getRequestUrl(API_URL.NOTES, { partial: props?.noteId }),
        { summary },
      );
      if (res?.status === RESPONSE_CODE?.SUCCESS) {
        props?.callBackSuccess(summary);
      } else {
        toast.error(
          typeof res?.data === 'string' ? res?.data : 'Something went wrong',
        );
      }
      setState(prev => ({
        ...prev,
        loading: false,
      }));
    };

    return (
      <Modal
        destroyOnClose
        open={state?.isShow}
        footer={null}
        width={'80vw'}
        centered
        // className="p-[20px]"
        closable={false}>
        <div className="flex flex-col items-center justify-center h-[80vh] max-h-[1000px]">
          <div className="flex items-center w-full">
            <div className="flex flex-1 justify-center text-[24px] font-bold leading-[36px]">
              Edit
            </div>
            <IconClose
              src={IconClose}
              style={{
                innerHeight: '20px',
                innerWidth: '20px',
              }}
              className="absolute right-[20px] z-1 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="h-[20px] flex flex-col h-full w-full">
            <RichTextEditor
              ref={richTextEditorRef}
              htmlContent={formatSummary(props?.summary as any) as any}
              onClose={closeModal}
              onSave={onSave}
              loading={state?.loading}
            />
          </div>
        </div>
      </Modal>
    );
  },
);
