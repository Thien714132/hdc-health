/* eslint-disable @typescript-eslint/no-explicit-any */
import AppContext from "@/context/appContext";
import { useQuestions } from "@/hooks/useQuestions";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import styles from "./index.module.scss";
import moment from "moment";
import { AskingModal, AskingModalRefProps } from "@/components/AskingModal";

type Props = { isLogin: boolean };

const Questions: React.FC<Props> = ({}: Props) => {
  const { appState } = useContext(AppContext);
  const { question, fetchData } = useQuestions();
  const router = useRouter();
  const { id } = router.query;

  const ref = useRef<AskingModalRefProps>(null);
  return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1  items-center overflow-y-auto scroll-container",
          styles.container,
        ].join(" ")}
      >
        <div className="w-full h-full flex flex-col mt-[90px]">
          <div className="flex items-center ml-[40px] mt-[20px]">
            <div
              className="flex items-center  cursor-pointer gap-[10px] "
              onClick={router?.back}
            >
              <LeftOutlined
                style={{ fontSize: 16, color: "#0052d4", fontWeight: "700" }}
              />
              <div className="text-[16px] text-[#0052d4] font-[600] leading-[24px] ">
                {appState?.current_session?.session} -{" "}
                {appState?.current_session?.title}
              </div>
            </div>
            <div className="flex-1 flex justify-end mr-[40px]  items-center">
              <div
                onClick={() => {
                  ref?.current?.showModal();
                }}
                className="text-[16px] leading-[24px] font-[500] flex items-center cursor-pointer bg-[#fff] gap-[10px] shadow-xl p-[5px] rounded-[10px]"
              >
                <div className="flex items-center justify-center h-[20px] w-[20px] rounded-full bg-[#0052d4]">
                  <PlusOutlined style={{ color: "#fff" }} />
                </div>
                Thêm câu hỏi
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col ml-[50px] mr-[50px] mt-[20px] bg-[#fff] mb-[30px] rounded-[20px] shadow-large p-[20px] gap-[10px] overflow-y-auto max-h-[75vh] scroll-container">
            {question?.data?.map((item: any) => (
              <div
                key={item?.id}
                className="bg-[#EBF5FD] rounded-[6px] p-[13px]"
              >
                <div className="text-[16px] leading-[24px] font-[700] text-[#2A2E92]">
                  {item?.title}
                </div>
                <div className="text-[14px] leading-[21px] font-[500] mt-[10px] text-[#2A2E92]">
                  {item?.content}
                </div>
                <div className="w-full flex justify-end italic text-[#2A2E92] text-[14px] leading-[21px]">
                  {item?.name} - {item?.community} -{" "}
                  {moment(item?.createTime).format("DD-MM-YYYY HH:mm:ss")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />
      <AskingModal ref={ref} callbackSuccess={fetchData} id={id as any} />
    </div>
  );
};

export default Questions;
