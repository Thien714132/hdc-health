/* eslint-disable react/display-name */
import { RESPONSE_CODE } from '@/network/config';
import { noteServices } from '@/services/noteServices';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const REASONS: string[] = [
  'Spam',
  'Violence',
  'Pornography',
  'Illegal drugs',
  'Child abuse',
  'Copyright',
  'Personal details',
  'Illogical',
  'Boring',
  'Repetitive',
];

interface ReportModalProps {
  id: string;
  callback: () => void;
}

export interface ReportModalRef {
  open: () => void;
  close: () => void;
}

const ReportModal = forwardRef<ReportModalRef, ReportModalProps>(
  ({ id }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectType, setSelectType] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');
    const [loadingReport, setLoadingReport] = useState<boolean>(false);

    const close = () => {
      setVisible(false);
      setContent('');
      setSelectType([]);
      setLoadingReport(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => setVisible(true),
      close,
    }));

    const handleSelectType = (item: string) => {
      const newSelectedValues = [...selectType];
      const itemIndex = newSelectedValues.indexOf(item);
      if (itemIndex !== -1) {
        newSelectedValues.splice(itemIndex, 1);
      } else {
        newSelectedValues.push(item);
      }
      setSelectType(newSelectedValues);
    };

    const handleSubmit = async () => {
      setLoadingReport(true);

      const response = await noteServices.reportNote(id, selectType, content);
      if (response.status === RESPONSE_CODE.SUCCESS) {
        toast.success('Report successfully!!!');
        setLoadingReport(false);
        setContent('');
        setSelectType([]);
        setTimeout(() => {
          close();
        }, 1000);
      }
    };

    return (
      <Modal
        destroyOnClose
        open={visible}
        footer={false}
        onClose={close}
        onCancel={close}
        centered
        closable>
        <div className="w-full text-[24px] leading-[36px] font-[600] items-center flex flex-col border-b-[1px] border-[#EAECF0] border-solid pb-[10px] mb-[20px]">
          Report to us
        </div>
        <div className="text-[16px] leading-[24px] font-[400] text-center mb-[30px]">
          Help us enhance our service by selecting the option that best
          describes the issue.
        </div>

        <div className="flex items-center gap-[10px] justify-center w-full flex-wrap mb-[30px]">
          {REASONS.map((item, index) => (
            <div
              className={[
                'cursor-pointer p-[10px] rounded-[16px]  border-[1px] border-[#98A2B3] border-solid',
                selectType.includes(item) ? 'bg-[#000]' : 'bg-[#fff]',
              ].join(' ')}
              key={'report-item-' + index}
              onClick={handleSelectType.bind(null, item)}>
              <div
                className="text-[16px] leading-[24px] font-[500] "
                style={{
                  color: selectType.includes(item) ? '#FFFFFF' : '#98A2B3',
                }}>
                {item}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[16px] leading-[24px] font-[400] mb-[10px]">
          Other (Optional)
        </div>
        <TextArea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Describe your issue..."
          maxLength={500}
          showCount
          rows={5}
          style={{
            borderRadius: '16px',
            minHeight: 100,
            fontSize: '16px',
            lineHeight: '24px',
          }}
        />

        <Space
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!selectType.length}
            style={{
              background: !selectType.length ? '#fff' : '#000',
              fontSize: '16px',
              lineHeight: '24px',
              padding: '20px',
              width: '122px',
              borderRadius: '16px',
            }}>
            {loadingReport ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: '#fff' }} />}
                size="default"
              />
            ) : (
              'Submit'
            )}
          </Button>
        </Space>
      </Modal>
    );
  },
);

export default ReportModal;
