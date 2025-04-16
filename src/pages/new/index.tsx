/* eslint-disable @next/next/no-img-element */
import { useNewDetail } from "@/hooks/useNewDetail";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";
import { DocumentViewer } from "react-documents";
import styles from "./index.module.scss";

type Props = { isLogin: boolean };

const NewDetail: React.FC<Props> = ({}: Props) => {
  const { data } = useNewDetail();
  const router = useRouter();

  console.log("data", data);
  //docs.google.com/viewerng/viewer?url=https://hdc.health.vn/api/v1/attachments/4003671b-6c66-4057-990b-0b26a9539bbe.pdf&hl=Nl
  https: return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1  items-center overflow-y-auto scroll-container",
          styles.container,
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-col mt-[90px] w-full pl-[40px] pr-[40px] max-w-[1500px] items-center",
            styles.contentField,
          ].join(" ")}
        >
          <div
            className="flex gap-[10px] w-full items-center text-[16px] font-[600] leading-[24px] text-[#0052d4] cursor-pointer"
            onClick={router.back}
          >
            <LeftOutlined />
            {data?.title}
          </div>
          {data?.banner && (
            <img
              src={data?.banner}
              className="w-[1000px] h-[400px] object-cover  rounded-[20px] mt-[20px]"
              alt="banner"
            />
          )}

          {data?.content?.includes(".pdf") ? (
            <div className="relative w-full flex flex-col items-center justify-center">
              <DocumentViewer
                style={{
                  width: "100%",
                  background: "grey",
                  marginTop: "30px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
                className={["h-[700px]", styles.pdfContainer].join(" ")}
                queryParams="hl=Nl"
                url={data?.content}
              ></DocumentViewer>
              <div
                dangerouslySetInnerHTML={{ __html: data?.contentBlob }}
                className={[
                  "w-[90%] pr-[20px] pl-[20px] mt-[30px] pb-[200px]",
                  styles.contentContainerWeb,
                  styles.contentContainer,
                ].join(" ")}
              ></div>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: data?.content }}
              className={[
                "w-[90%] pr-[20px] pl-[20px] mt-[30px] pb-[200px]",
                styles.contentContainer,
              ].join(" ")}
            ></div>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" /> */}
    </div>
  );
};

export default NewDetail;
