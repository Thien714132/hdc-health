/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileDetailModal,
  FileDetailModalRefProps,
} from "@/components/FileDetail";
import AppContext from "@/context/appContext";
import { Collapse } from "antd";
import Image from "next/image";
import { useContext, useRef } from "react";
import IconDownload from "../../../public/images/iconDownload.png";
import IconFile from "../../../public/svg/ic_file_purple.svg";
import IconFolder from "../../../public/svg/iconYellowFolder.svg";
import styles from "./index.module.scss";

type Props = { isLogin: boolean };

const Documents = ({}: Props) => {
  const { appState } = useContext(AppContext);
  const ref = useRef<FileDetailModalRefProps>(null);
  const renderDocument = (documents: any[]) => {
    return (
      <div className="flex flex-col justify-center gap-[10px] cursor-pointer  ">
        {documents
          ?.sort((a, b) => a?.title.localeCompare(b?.title))
          ?.map((item, index) => (
            <div
              onClick={() => {
                console.log(item?.url);
                if (item?.url?.includes(".pdf")) {
                  window.open(item?.url);
                } else {
                  ref?.current?.showModal(item?.url);
                }
                // window.open(item?.url);
              }}
              key={index}
              className="flex items-center gap-[10px] bg-[#ebf5fd] p-[10px] rounded-[6px]"
            >
              <IconFile width={24} height={24} />
              <div className="flex-1">{item?.title}</div>
              <Image
                alt={"download_icon"}
                src={IconDownload}
                width={24}
                height={24}
                onClick={(e: any) => {
                  e.stopPropagation();
                  window.open(item?.url);
                }}
              />
            </div>
          ))}
      </div>
    );
  };

  const renderItem = () => {
    return appState?.documents?.map((item) => ({
      key: item?.conferenceId,
      // label:  item?.conferenceSession + " - " + item?.conferenceTitle,
      label: (
        <div className="flex items-center gap-[10px]">
          <IconFolder width={24} height={24} />
          {item?.conferenceSession + " - " + item?.conferenceTitle}
        </div>
      ),
      children: renderDocument(item?.data),
      color: "red",
    }));
  };

  // console.log("asdasd___", renderItem());

  return (
    <div className="flex flex-col w-[100vw]">
      <div className="flex flex-col items-center image-background items-center justify-center greeting-container relative pl-[10px] pr-[10px]">
        <div
          className={[
            "flex flex-1 w-full mt-[85px] justify-center gap-[40px] flex-wrap overflow-y-auto scroll-container scroll-container",
            styles.dropList,
          ].join()}
        >
          <Collapse
            accordion
            items={renderItem()}
            className={["w-full max-w-[1500px]", styles.dropList].join(" ")}
            // style={{ background: "#fff", marginBottom: 20 }}
            style={{ background: "#fff", marginBottom: 20 }}
          />
        </div>
      </div>
      <FileDetailModal ref={ref} />
    </div>
  );
};

export default Documents;
