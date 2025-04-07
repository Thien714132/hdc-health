'use client';

import { motion } from 'framer-motion';
import IconArrow from '../../../public/svg/ic_white_arrow_right.svg';
import { useEffect, useState } from 'react';

const AnimateRightArrow = ({ fill }: { fill?: string }) => {
  const [direction, setDirection] = useState(-10);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(prev => -prev);
    }, 750);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ x: direction }}
      transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse' }}
      className="ml-5">
      {/* <IconAssets.IconRightArrow fill="#fff" width={24} height={24} /> */}
      <IconArrow
        alt={'IconArrow'}
        src={IconArrow}
        width={24}
        height={24}
        fill={fill ?? 'white'}
      />
    </motion.div>
  );
};

export default AnimateRightArrow;
