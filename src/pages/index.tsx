import { News } from "@/components/News";
import React from "react";

type Props = { isLogin: boolean };

const Home: React.FC<Props> = ({}: Props) => {
  return (
    <div className="flex flex-col w-[100vw]">
      <div
        className="flex flex-col items-center image-background items-center
      justify-center greeting-container relative"
      >
        <div className="text-[40px] font-[800] leading-[68px] text-center gradientTextRed">
          CHÀO MỪNG QUÝ VỊ ĐẠI BIỂU VỀ THAM DỰ HỘI NGHỊ THƯỜNG NIÊN
          <br /> CÂU LẠC BỘ GIÁM ĐỐC BỆNH VIỆN CÁC TỈNH PHÍA BẮC 2025
        </div>
        <div className="mt-[30px] italic font-[500] text-[24px] text-center text-[#22233E] txtHD">
          Hải Dương, ngày 18, 19 tháng 04 năm 2025
        </div>
        <div className="h-[110px] w-[100%] bg-gradient-to-t w-full from-white to-transparent absolute bottom-0" />
      </div>
      <div className="flex w-full flex-col items-center items-center">
        <div className="mb-[20px] font-[700] text-[24px] leading-[36px] text-[#0B4E9D]">
          Tin tức
        </div>
        <News />
      </div>
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async context => {
//   const cookies = parseCookies(context);

//   const access_token = cookies.access_token;
//   console.log('cookies', access_token);

//   if (!access_token) {
//     return {
//       redirect: {
//         destination: ROUTE_NAME.LOGIN,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
