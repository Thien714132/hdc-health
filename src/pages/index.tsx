import { NewsList } from "@/components/News";
import React from "react";
import Image from "next/image";
import Banner from "../../public/images/banner.jpeg";

type Props = { isLogin: boolean };

const Home: React.FC<Props> = ({}: Props) => {
  return (
    <div className="flex flex-col w-[100vw]">
      {/* <div
        className="flex flex-col items-center image-background items-center
      justify-center greeting-container pt-[400px]"
      >
        <div className="h-[110px] w-[100%] bg-gradient-to-t w-full from-white to-transparent absolute bottom-0" />
      </div> */}
      <div className="bannerContainer">
        <Image src={Banner} alt="Banner" style={{ width: "100%" }} />
      </div>
      <div className="flex w-full flex-col items-center items-center pt-[30px] image-background">
        <div className="mb-[20px] font-[700] text-[24px] leading-[36px] text-[#0B4E9D]">
          Tin tức
        </div>
        <NewsList />
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
