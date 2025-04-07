import Image from "next/image";
import template from "../../../public/images/template.png";
import styles from "./index.module.scss";

const DATA_NEWS = [
  {
    id: 1,
    title:
      "Thông báo tổ chức hội nghị thường niên câu lạc bộ giám đôc bệnh viện các tỉnh phía Bắc Năm 2025",
  },
  {
    id: 2,
    title:
      "Thông báo tổ chức hội nghị thường niên câu lạc bộ giám đôc bệnh viện các tỉnh phía Bắc Năm 2025",
  },
  {
    id: 1,
    title:
      "Thông báo tổ chức hội nghị thường niên câu lạc bộ giám đôc bệnh viện các tỉnh phía Bắc Năm 2025",
  },
  {
    id: 3,
    title:
      "Thông báo tổ chức hội nghị thường niên câu lạc bộ giám đôc bệnh viện các tỉnh phía Bắc Năm 2025",
  },

  {
    id: 4,
    title:
      "Thông báo tổ chức hội nghị thường niên câu lạc bộ giám đôc bệnh viện các tỉnh phía Bắc Năm 2025",
  },
];

export const NewsList = () => {
  //   console.log();
  return (
    <div>
      <div
        className={[
          "w-full flex flex-col pl-[10px] pr-[10px]",
          styles.mobileNews,
        ].join(" ")}
      >
        {DATA_NEWS?.map((item) => {
          return (
            <div
              key={item?.id}
              className={[
                "w-full h-[250px] flex flex-col relative mb-[30px]  mr-[20px] last:mr-[0px] rounded-[20px] cursor-pointer",
              ].join(" ")}
            >
              <div className="w-full h-full bg-[#E7F2FF] flex-1 rounded-[20px]">
                <Image
                  src={template}
                  className="h-full w-full rounded-[20px]"
                  alt="alo"
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
            className={[
              "w-[700px] h-[300px] flex flex-col relative mr-[20px] cursor-pointer",
            ].join(" ")}
          >
            <div className="rounded-[20px] w-full h-full bg-[#E7F2FF] flex-1">
              <Image
                src={template}
                className="h-full w-full rounded-[20px]"
                alt="alo"
              />
            </div>
            <div className="p-[10px] flex flex-col justify-end rounded-b-[20px] absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0">
              {" "}
              <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                {DATA_NEWS[0]?.title}
              </div>
            </div>
          </div>
          <div
            className={[
              "w-[500px] h-[300px] flex flex-col relative cursor-pointer",
            ].join(" ")}
          >
            <div className="rounded-[20px] w-full h-full bg-[#E7F2FF] flex-1">
              <Image
                src={template}
                className="h-full w-full rounded-[20px]"
                alt="alo"
              />
            </div>
            <div className="p-[10px] flex flex-col justify-end rounded-b-[20px] absolute bottom-0 h-[90px] w-[100%] bg-gradient-to-t w-full from-[#0B4E9D] to-transparent absolute bottom-0">
              <div className="limited-lines-2 text-[#fff] text-[16px] leading-[24px] font-[600]">
                {DATA_NEWS[1]?.title}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center max-w-[1200px] w-full justify-between ">
          {DATA_NEWS?.slice(2, 5)?.map((item) => {
            return (
              <div
                key={item?.id}
                className={[
                  "w-[390px] h-[250px] flex flex-col relative mb-[30px]  mr-[20px] last:mr-[0px] rounded-[20px] cursor-pointer",
                ].join(" ")}
              >
                <div className="w-full h-full bg-[#E7F2FF] flex-1 rounded-[20px]">
                  <Image
                    src={template}
                    className="h-full w-full rounded-[20px]"
                    alt="alo"
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
