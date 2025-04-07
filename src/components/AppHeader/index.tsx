import Image from "next/image";
import { useState } from "react";
import IconMenu from "../../../public/svg/icMenu.svg";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

export const AppHeader = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(false);
  const currentRoute = router?.asPath;

  const toggleBtn = () => {
    setIsShow(!isShow);
  };

  const MENU_DATA = [
    { id: 1, name: "Tin tức", route: "/" },
    { id: 2, name: "Tài liệu hội nghị", route: "/documents" },
    { id: 3, name: "Câu hỏi hoặc tham luận", route: "/questions" },
    { id: 4, name: "Thư viện ảnh", route: "/pictures" },
  ];

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 z-50">
      {/* Header Section */}
      <div className="w-[100vw] flex items-center bg-[rgba(255,255,255,1)]  p-[10px] border-b-[#0052d4] border-b-[1px] border-b-solid header">
        <Image
          rel="icon"
          src="/logoApp.png"
          height={50}
          width={50}
          className={styles.logoApp}
          alt="logo app"
        />
        <div
          className={[
            "flex flex-col justify-center min-w-[400px]",
            styles.txtLogoContainer,
          ].join(" ")}
        >
          <div
            className={[
              "no-wrap font-semibold text-[#22233E] text-[14px] leading-[21px]",
              styles.txtClub,
            ].join(" ")}
          >
            CÂU LẠC BỘ GIÁM ĐỐC BỆNH VIỆN CÁC TỈNH PHÍA BẮC
          </div>
          <div
            className={[
              "no-wrap text-[20px] leading-[30px] font-[700]",
              styles["gradient-text"],
            ].join(" ")}
          >
            HỘI NGHỊ THƯỜNG NIÊN 2025
          </div>
        </div>
        <div
          className={[styles.icMenu, "cursor-pointer"].join(" ")}
          onClick={toggleBtn}
        >
          <IconMenu height={24} width={24} />
        </div>

        <div
          className={[
            "flex-1 flex items-center justify-end gap-[70px] mr-[10px] min-w-[700px]",
            styles.menuContainer,
          ].join(" ")}
        >
          {MENU_DATA?.map((item) => {
            return (
              <div
                onClick={() => {
                  router?.push(item?.route);
                }}
                key={item?.id}
                className="no-wrap group relative text-[#22233E] text-[16px] leading-[24px] font-[600] cursor-pointer transition-colors duration-300 hover:text-[#0052d4]"
                style={currentRoute === item?.route ? { color: "#0052d4" } : {}}
              >
                {item?.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0052d4] transition-all duration-300 group-hover:w-full"></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fade-in content under the header */}
      {isShow && (
        <div
          className={`flex justify-end h-[100vh] ${
            isShow ? "opacity-100" : "opacity-0"
          } ${styles.menuDropDown}`}
          onClick={toggleBtn}
        >
          <div
            className={[
              "bg-[rgba(255,255,255,1)] p-4 flex flex-col items-end gap-[10px] rounded-b-[20px]",
              styles["box_shadow"],
            ].join(" ")}
          >
            {MENU_DATA?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="w-full flex justify-center bg-[#EAF8FF] rounded-[16px] p-[10px] no-wrap group relative text-[#22233E] text-[16px] leading-[24px] font-[600] cursor-pointer transition-colors duration-300 hover:text-[#0052d4]"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    router?.push(item?.route);
                    console.log("alooo");
                    setIsShow(false);
                  }}
                >
                  {item?.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0052d4] transition-all duration-300 group-hover:w-full"></span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
