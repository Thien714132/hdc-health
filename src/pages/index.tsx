import Image from "next/image";
import React from "react";
import Banner from "../../public/images/banner.jpeg";
import { NewsList } from "@/components/News/NewsList";

type Props = { isLogin: boolean };

const Home: React.FC<Props> = ({}: Props) => {
  // useGeneral();
  return (
    <div className="flex flex-col w-[100vw]">
      {/* <div
        className="flex flex-col items-center image-background items-center
      justify-center greeting-container pt-[400px]"
      >
        <div className="h-[110px] w-[100%] bg-gradient-to-t w-full from-white to-transparent absolute bottom-0" />
      </div> */}
      <div className="bannerContainer z-1">
        <Image src={Banner} alt="Banner" style={{ width: "100%" }} />
      </div>
      <div className="flex w-full flex-col items-center items-center pt-[30px] z-1">
        <div className="mb-[20px] font-[700] text-[24px] leading-[36px] text-[#0B4E9D]">
          Tin tức
        </div>
        <NewsList />
      </div>
      <div className="flex w-full flex-col items-center items-center pt-[30px] image-background absolute" />
    </div>
  );
};

export default Home;
