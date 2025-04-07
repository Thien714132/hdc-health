import { APP_STORE_URL, PLAY_STORE_URL, WEB_URL } from '@/utils/constants';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import IconApple from '../../../public/svg/settings/apple-settings.svg';
import IconGoogle from '../../../public/svg/settings/google-settings.svg';
import IconCopy from '../../../public/svg/settings/icon-copy.svg';
import IconLink from '../../../public/svg/settings/icon-link.svg';
import styles from './index.module.scss';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ShareItem = ({
  icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  const IconComponent = icon;
  return (
    <div className="flex flex-row items-center w-[460px] h-[40px] bg-[#F2F2F7] rounded-[14px] border border-[#D0D5DD] gap-[10px] p-[10px]">
      <IconComponent fill={'#98A2B3'} />
      <div className="truncate text-[#98A2B3] text-[16px] max-w-[360px] font-[200] ">
        {text}
      </div>
      <IconCopy
        alt="IconCopy"
        className="ml-auto  cursor-pointer "
        style={{ width: '24px', height: '24px' }}
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      />
    </div>
  );
};

export const ShareModal = ({ visible, onClose }: Props) => {
  const dataList = [
    {
      icon: IconLink,
      text: WEB_URL,
    },
    {
      icon: IconGoogle,
      text: PLAY_STORE_URL,
    },
    {
      icon: IconApple,
      text: APP_STORE_URL,
    },
  ];
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined style={{ fontSize: '16px', color: '#888' }} />}
      width={500}
      className={styles['custom-modal']}
      centered>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-center mb-6">
          Share Robolearn
        </div>
        <div className="flex flex-col gap-[10px]">
          {dataList.map((item, index) => (
            <ShareItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
        <Button
          onClick={onClose}
          type="default"
          htmlType="submit"
          size="large"
          style={{
            width: '200px',
            borderRadius: '14px',
            backgroundColor: '#000',
            fontFamily: 'opensans',
            border: 'none',
            marginTop: '20px',
            marginBottom: '20px',
            color: '#fff',
            gap: '16px',
          }}>
          Done{' '}
        </Button>
      </div>
    </Modal>
  );
};
