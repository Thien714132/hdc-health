import { Spin } from 'antd';
import { useLoading } from '../../context/loadingContext';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingModal = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.8)] bg-opacity-50 z-50">
      <Spin
        indicator={
          <LoadingOutlined spin style={{ color: '#000', fontSize: 100 }} />
        }
        size="large"
      />
    </div>
  );
};

export default LoadingModal;
