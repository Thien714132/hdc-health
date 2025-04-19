/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import ClbLogo from "../../../public/images/clbLogo.png";
import styles from "./index.module.scss";

export const AppHeader = () => {
  const router = useRouter();
  const currentRoute = router?.asPath;

  const MENU_DATA = [
    { id: 1, name: "Tin tức", route: "/" },
    { id: 2, name: "Tài liệu hội nghị", route: "/documents" },
    { id: 3, name: "Đặt câu hỏi tham luận", route: "/conference" },
    { id: 4, name: "Thư viện ảnh", route: "/pictures" },
  ];

  const MENU_DATA_MOBILE = [
    { id: 1, name: "Tin tức", route: "/" },
    { id: 2, name: "Tài liệu", route: "/documents" },
    { id: 3, name: "Câu hỏi tham luận", route: "/conference" },
    { id: 4, name: "Ảnh", route: "/pictures" },
  ];

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 z-50">
      {/* Header Section */}
      <div className="w-[100vw] flex items-center bg-[rgba(255,255,255,1)]  p-[10px] border-b-[#0052d4] border-b-[1px] border-b-solid header">
        <div className="flex items-center">
          <img
            rel="icon"
            src="https://hdc.health.vn/logo"
            height={50}
            width={50}
            className={styles.logoApp}
            alt="logo app"
          />
          <img
            rel="icon"
            src={
              "https://hdc.health.vn/api/v1/attachments/b1f48355-369f-4cf8-8f5b-b20056798fca.png"
            }
            width={80}
            // className={styles.logoApp}
            alt="logo app"
          />
        </div>
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
          className={[
            "flex-1 flex items-center justify-end gap-[50px] mr-[10px] min-w-[700px]",
            styles.menuContainer,
          ].join(" ")}
        >
          {MENU_DATA?.map((item) => {
            return (
              <div
                onClick={() => {
                  if (item?.id === 4) {
                    window.open(
                      "https://drive.google.com/drive/folders/18450nhgParna80mjjBZ5mLo2sqQcl6LL"
                    );
                    return;
                  }
                  router?.push(item?.route);
                }}
                key={item?.id}
                className="no-wrap group relative text-[#22233E] text-[14px] leading-[21px] font-[600] cursor-pointer transition-colors duration-300 hover:text-[#0052d4]"
                style={currentRoute === item?.route ? { color: "#0052d4" } : {}}
              >
                {item?.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0052d4] transition-all duration-300 group-hover:w-full"></span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={[
          "bg-[rgba(255,255,255,1)] p-[10px] flex items-end gap-[10px] justify-center flex-wrap",
          styles["box_shadow"],
          styles.mobileMenu,
        ].join(" ")}
      >
        {MENU_DATA_MOBILE?.slice(0, 4)?.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex justify-center bg-[#EAF8FF] rounded-[16px] no-wrap group relative text-[#0052d4] text-[12px] leading-[21px] font-[600] cursor-pointer transition-colors duration-300 hover:text-[#0052d4] pl-[10px] pr-[10px]"
              onClick={(e: React.MouseEvent) => {
                if (item?.id === 4) {
                  window.open(
                    "https://drive.google.com/drive/folders/18450nhgParna80mjjBZ5mLo2sqQcl6LL"
                  );
                  return;
                }

                e.stopPropagation();
                router?.push(item?.route);
              }}
            >
              {item?.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#0052d4] transition-all duration-300 group-hover:w-full"></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
