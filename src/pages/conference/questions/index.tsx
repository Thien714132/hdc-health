/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AskingModal, AskingModalRefProps } from "@/components/AskingModal";
import AppContext from "@/context/appContext";
import { useQuestions } from "@/hooks/useQuestions";
import { isNullOrEmpty } from "@/utils/method";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { FloatButton, Pagination } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
type Props = { isLogin: boolean };

const Questions: React.FC<Props> = ({}: Props) => {
  const { appState } = useContext(AppContext);
  const { state, fetchData, onPageChange } = useQuestions();
  const router = useRouter();
  const { id } = router.query;

  const ref = useRef<AskingModalRefProps>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Đã sao chép!");
    } catch (err: any) {
      toast.error("Lỗi sao chép!");
    }
  };

  return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1 items-center h-full",
          styles.container,
        ].join(" ")}
      >
        <div
          className={[
            "w-full flex flex-col  max-w-[1500px]",
            styles.contentContainer,
          ].join(" ")}
        >
          <div
            className={["flex items-center ml-[40px]", styles.header].join(" ")}
          >
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
            <div
              className={[
                "flex-1 flex justify-end mr-[40px]  items-center ",
                styles.btnAdd,
              ].join(" ")}
            >
              <div
                onClick={() => {
                  ref?.current?.showModal();
                }}
                className="text-[14px] leading-[21px] font-[500] flex items-center cursor-pointer bg-[#fff] gap-[10px] shadow-xl p-[5px] rounded-[10px]"
              >
                <div className="flex items-center justify-center h-[20px] w-[20px] rounded-full bg-[#0052d4]">
                  <PlusOutlined style={{ color: "#fff" }} />
                </div>
                Thêm câu hỏi
              </div>
            </div>
          </div>
          {isNullOrEmpty(state?.data) ? (
            <div></div>
          ) : (
            <div>
              <div
                className={[
                  "flex-1 flex flex-col ml-[50px] mr-[50px] mt-[20px] bg-[#fff] mb-[30px] rounded-[20px] shadow-large p-[10px] gap-[10px] overflow-y-auto max-h-[70vh] scroll-container",
                  styles.listContainer,
                ].join(" ")}
              >
                {state?.data?.map((item: any, index: number) => (
                  <div
                    key={item?.id}
                    className="bg-[#EBF5FD] rounded-[6px] p-[10px]"
                  >
                    <div className="text-[16px] leading-[24px] font-[700] text-[#2A2E92]">
                      {item?.title}
                    </div>
                    <div className="text-[14px] leading-[21px] font-[500] mt-[5px] text-[#2A2E92]">
                      {item?.content}
                    </div>
                    <div className="w-full flex items-center justify-end italic text-[#2A2E92] text-[12px] leading-[23px] flex-wrap">
                      {item?.name} - {item?.community} -{" "}
                      {moment(item?.createTime).format("DD-MM-YYYY HH:mm:ss")}
                      <div
                        className="cursor-pointer h-[20px] w-[50px] bg-[#fff] ml-[20px] text-[#2A2E92] rounded-full flex justify-center items-center"
                        onClick={() => {
                          handleCopy(
                            "- " +
                              item?.title +
                              "\n\n" +
                              item?.content +
                              "\n\n[" +
                              item?.name +
                              " - " +
                              item?.community +
                              " - " +
                              moment(item?.createTime).format(
                                "DD-MM-YYYY HH:mm:ss"
                              ) +
                              "]"
                          );
                        }}
                      >
                        Copy
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-end pr-[40px]">
                <Pagination
                  defaultCurrent={state?.page + 1}
                  total={state?.total}
                  // defaultPageSize={state?.size}
                  // pageSizeOptions={PAGE_SIZE_LIST}
                  style={{ marginTop: -10 }}
                  onChange={(page) => onPageChange(page)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatButton
        shape="circle"
        // type="primary"
        className={styles.floatBtn}
        style={{ insetInlineEnd: 10, insetBlockEnd: 20 }}
        icon={<PlusOutlined style={{ color: "#0052d4" }} />}
        onClick={() => ref?.current?.showModal()}
      />

      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />
      <AskingModal ref={ref} callbackSuccess={fetchData} id={id as any} />
    </div>
  );
};

export default Questions;
