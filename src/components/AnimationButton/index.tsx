import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AnimateRightArrow from '../AnimateRightArrow';

type Props = {
  disable?: boolean;
  onClick?: () => void;
  loading?: boolean;
  title?: string;
};

export const AnimationButton = ({
  disable,
  onClick,
  loading,
  title,
}: Props) => {
  return (
    <div
      onClick={disable || loading ? () => {} : onClick}
      className={[
        'mt-[40px]  text-[#fff] text-[16px] leading-[24px] font-semibold flex items-center justify-center bg-black w-[200px] rounded-[16px] h-[40px] ',
        disable ? '' : 'cursor-pointer',
      ].join(' ')}
      style={{
        background: disable ? '#F2F2F7' : undefined,
        color: disable ? '#98A2B3' : undefined,
      }}>
      {loading ? (
        <Spin
          indicator={<LoadingOutlined spin style={{ color: '#fff' }} />}
          size="default"
        />
      ) : (
        <div className="flex items-center">
          {title ?? 'Create note'}
          <AnimateRightArrow fill={disable ? '#98A2B3' : undefined} />
        </div>
      )}
    </div>
  );
};
