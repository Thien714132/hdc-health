/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNews } from "@/hooks/useNews";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

export const NewsList = () => {
  const { newsData } = useNews();

  const router = useRouter();

  const onClick = (id: number) => {
    router.push("/new?id=" + id);
  };

  return (
    <div>
      <div
        className={[
          "w-full flex flex-col pl-[10px] pr-[10px]",
          styles.mobileNews,
        ].join(" ")}
      >
        {newsData?.map((item: any) => {
          return (
            <div
              onClick={onClick?.bind(null, item?.id)}
              key={item?.id}
              className={[
                "w-[90vw] h-[250px] flex flex-col relative mb-[30px] gap-[20px] rounded-[20px] cursor-pointer",
              ].join(" ")}
            >
              <div className=" h-full bg-[#E7F2FF] flex-1 rounded-[20px]">
                <img
                  src={item?.banner}
                  className="h-full w-full rounded-[20px] object-cover"
                  alt="banner"
                />
              </div>
              <div
                className={[
                  "rounded-b-[20px] flex flex-col justify-end absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0 p-[10px]",
                ].join(" ")}
              >
                <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                  {item?.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={[
          "w-full flex flex-wrap max-w-[1200px] justify-evenly pl-[20px] pr-[20px] ",
          styles.webNews,
        ].join(" ")}
      >
        <div className="flex flex-1 items-center max-w-[1330] w-full justify-between mb-[20px]">
          <div
            onClick={onClick?.bind(null, newsData[0]?.id)}
            className={[
              "w-[700px] h-[300px] flex flex-col relative mr-[20px] cursor-pointer",
            ].join(" ")}
          >
            <div className="rounded-[20px] w-full h-full bg-[#E7F2FF] flex-1">
              <img
                src={newsData[0]?.banner}
                className="h-full w-full rounded-[20px] object-cover"
                alt="banner"
              />
            </div>
            <div className="p-[10px] flex flex-col justify-end rounded-b-[20px] absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0">
              {" "}
              <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                {newsData[0]?.title}
              </div>
            </div>
          </div>
          <div
            onClick={onClick?.bind(null, newsData[1]?.id)}
            className={[
              "w-[500px] h-[300px] flex flex-col relative cursor-pointer",
            ].join(" ")}
          >
            <div className="rounded-[20px] w-full h-full bg-[#E7F2FF] flex-1">
              <img
                src={newsData[1]?.banner}
                className="h-full w-full rounded-[20px] object-cover"
                alt="banner"
              />
            </div>
            <div className="p-[10px] flex flex-col justify-end rounded-b-[20px] absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0">
              <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                {newsData[1]?.title}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center max-w-[1200px] w-full justify-between flex-wrap">
          {newsData?.slice(2, newsData?.length)?.map((item) => {
            return (
              <div
                onClick={onClick?.bind(null, item?.id)}
                key={item?.id}
                className={[
                  "w-[370px] h-[250px] flex flex-col relative mb-[30px] rounded-[20px] cursor-pointer",
                ].join(" ")}
              >
                <div className="w-full h-full bg-[#E7F2FF] flex-1 rounded-[20px]">
                  <img
                    src={item?.banner}
                    className="h-full w-full rounded-[20px] object-cover"
                    alt="banner"
                  />
                </div>
                <div
                  className={[
                    "rounded-b-[20px] flex flex-col justify-end absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0 p-[10px]",
                  ].join(" ")}
                >
                  <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                    {item?.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
