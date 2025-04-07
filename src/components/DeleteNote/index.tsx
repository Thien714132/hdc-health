/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
import { Modal, Spin } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import IconShy from '../../../public/svg/icShy.svg';
import IconClose from '../../../public/svg/ic_grey_close.svg';
import { NetWork } from '@/network';
import { getRequestUrl } from '@/network/utils';
import { API_URL } from '@/network/url';
import { isNullOrEmpty } from '@/utils/method';
import { RESPONSE_CODE } from '@/network/config';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

type DeleteNoteProps = { onConfirmDelete: () => void };

export type DeleteNoteRefProps = {
  showModal: (id: string) => void;
  closeModal: () => void;
};

export const DeleteNote = forwardRef<DeleteNoteRefProps, DeleteNoteProps>(
  (props, ref) => {
    const [state, setState] = useState<{
      isShow: boolean;
      id: string;
      loading: boolean;
    }>({
      isShow: false,
      id: '',
      loading: false,
    });

    const onDeleteNote = async () => {
      if (isNullOrEmpty(state?.id)) {
        return;
      }
      setState(prev => ({
        ...prev,
        loading: true,
      }));
      const res = await NetWork.deleteMethod(
        getRequestUrl(API_URL.NOTES, {
          parentId: state?.id,
        }),
      );
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        toast.success('Delete note success');
        closeModal();
        props?.onConfirmDelete();
      }

      setState(prev => ({
        ...prev,
        loading: false,
      }));
    };

    const showModal = (id: string) => {
      setState(prev => ({
        ...prev,
        isShow: true,
        id: id,
      }));
    };
    const closeModal = () => {
      setState(prev => ({
        ...prev,
        isShow: false,
        id: '',
      }));
    };
    useImperativeHandle(ref, () => ({
      showModal,
      closeModal,
    }));

    return (
      <Modal
        centered
        destroyOnClose
        open={state?.isShow}
        footer={null}
        width={500}
        closable={false}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex flex-1 justify-center text-[24px] font-bold leading-[36px]">
              Delete note
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
          <IconShy
            height={200}
            width={434.7}
            style={{ innerHeight: '115px', innerWidth: '250px' }}
          />
          <div className="font-[500] text-[16px] leading-[24px] text-[#98A2B3] text-center mt-[-30px]">
            You're about to delete this note permanently. <br />
            This action cannot be undone. Are you sure?
          </div>
          <div
            onClick={onDeleteNote}
            className="mb-[10px] cursor-pointer mt-[40px] bg-[#000] h-[56px] w-[310px] flex items-center justify-center rounded-[100px] text-[#F04438] font-[600]  text-[18px] leading-[28px]">
            {state?.loading ? (
              <Spin
                indicator={
                  <LoadingOutlined spin style={{ color: '#F04438' }} />
                }
                size="large"
              />
            ) : (
              'Yes, delete note'
            )}
          </div>
        </div>
      </Modal>
    );
  },
);
