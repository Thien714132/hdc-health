import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type LoadingIndicatorProps = {
  color?: string;
  size?: number;
};

export const LoadingIndicator = ({
  color = '#5A45FE',
  size = 48,
}: LoadingIndicatorProps) => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: size, color: color }} spin />
      }
    />
  );
};
