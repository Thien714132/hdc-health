/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { isNullOrEmpty } from "@/utils/method";
import { Input, Modal } from "antd";
import html2canvas from "html2canvas";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import IconCheck from "../../../public/svg/icCheckDOne.svg";
import { LoadingIndicator } from "../LoadingIndicator";
import styles from "./index.module.scss";
import AppContext from "@/context/appContext";
import { APPLICATION_ACTION_TYPE } from "@/context/action";

type GetMealProps = {};

export type GetMealRefProps = {
  showModal: (meal: any, isSuccess?: boolean) => void;
  closeModal: () => void;
};

export const GetMeal = forwardRef<GetMealRefProps, GetMealProps>(
  (props, ref) => {
    const [state, setState] = useState<{
      isShow: boolean;
      meal: any;
      loading: boolean;
      name: string;
      community: string;
      error: string | undefined;
      isSuccess: boolean;
    }>({
      isShow: false,
      meal: {},
      loading: false,
      name: "",
      community: "",
      error: undefined,
      isSuccess: false,
    });

    const { dispatch } = useContext(AppContext);

    const showModal = (meal: any, isSuccess?: boolean) => {
      setState((prev) => ({
        ...prev,
        isShow: true,
        meal,
        isSuccess: isSuccess ?? false,
      }));
    };
    const closeModal = () => {
      setState((prev) => ({
        ...prev,
        isShow: false,
        meal: {},
        loading: false,
        name: "",
        community: "",
        error: undefined,
        isSuccess: false,
      }));
    };
    useImperativeHandle(ref, () => ({
      showModal,
      closeModal,
    }));

    const onGetMeal = () => {
      if (isNullOrEmpty(state?.name) || isNullOrEmpty(state?.community)) {
        setState((prev) => ({
          ...prev,
          error: "Họ và tên hoặc tên đoàn không được để trống",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
      }));
      dispatch({
        type: APPLICATION_ACTION_TYPE.SAVE_MEAL,
        payload: {
          ...state?.meal,
          userName: state?.name,
          community: state?.community,
        },
      });
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
          isSuccess: true,
        }));
      }, 1000);
    };
    console.log("asdasda___", state?.meal);
    const captureRef = useRef<any>(null);

    const handleCapture = async () => {
      const canvas = await html2canvas(captureRef.current);
      const image = canvas.toDataURL("image/png");

      // Trigger download
      const link = document.createElement("a");
      link.href = image;
      link.download = `captured-view-${Date.now()}.png`;
      link.click();
    };

    return (
      <Modal
        centered
        destroyOnClose
        open={state?.isShow}
        footer={null}
        width={700}
        onCancel={closeModal}
        maskClosable={false}
      >
        {state?.isSuccess ? (
          <div className="flex flex-col items-center justify-center pt-[20px] relative">
            <div
              ref={captureRef}
              className="flex w-full flex-col items-center p-[20px] pb-0 justify-center  image-background2"
            >
              <div className="pt-[10px]">
                <IconCheck height={60} width={60} />
              </div>
              <div
                className={["text-[#002F89] mt-[22px] ", styles.congrats].join(
                  " "
                )}
              >
                Nhận phiếu ăn thành công
              </div>
              <div
                className={[" mt-[10px] text-center ", styles.txtRed].join(" ")}
              >
                {state?.meal?.userName ?? state?.name} -{" "}
                {state?.meal?.community ?? state?.community}
              </div>
              <div className="flex flex-col gap-[10px] mt-[20px] items-center">
                <div className="text-[16px] leading-[24px] font-[700] text-[#2A2E92]">
                  {state?.meal?.name}
                </div>
                <div
                  className={[
                    "w-full  text-[#2A2E92] flex justify-center",
                    styles.txtTime,
                  ].join(" ")}
                >
                  <strong>Thời gian:</strong> {state?.meal?.time}
                </div>
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px] text-center justify-center pb-[100px]">
                  <strong>Địa điểm: </strong>
                  {state?.meal?.location}
                </div>
              </div>
              <div className="italic text-[14px] leading-[21px] font-[400] text-[#ec0f00]">
                Vui lòng lưu lại phiếu ăn
              </div>
            </div>

            <div
              onClick={handleCapture}
              className="bottom-[20px] absolute border-white border-[1px] border-solid mb-[20px] cursor-pointer flex h-[40px] w-[130px] rounded-[16px] items-center justify-center bg-[#178FEB] mt-[30px] text-[#fff] text-[16px] leading-[24px] font-[500]"
            >
              Lưu phiếu
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex  flex-1 justify-center text-[22px] font-bold leading-[33px] text-[#2A2E92]">
              Nhận phiếu ăn
            </div>
            <div className="flex flex-col w-full mt-[20px]">
              <span className="tex-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px]">
                Họ và tên<span className="text-[#FF0000]">*</span>
              </span>
              <Input
                placeholder="Nhập họ và tên..."
                value={state?.name}
                onFocus={() => {
                  setState((prev) => ({
                    ...prev,
                    error: undefined,
                  }));
                }}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    name: e?.target?.value,
                  }));
                }}
              />

              <span className="tex-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px] mt-[20px]">
                Tên đoàn<span className="text-[#FF0000]">*</span>
              </span>
              <Input
                placeholder="Nhập tên đoàn..."
                value={state?.community}
                onFocus={() => {
                  setState((prev) => ({
                    ...prev,
                    error: undefined,
                  }));
                }}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    community: e?.target?.value,
                  }));
                }}
              />
            </div>
            {!isNullOrEmpty(state?.error) && (
              <div className="tex-[18px] leading-[23px] font-[500] text-[#FF0000] mb-[5px] mt-[20px] italic">
                {state?.error}
              </div>
            )}
            <div
              onClick={onGetMeal}
              className="cursor-pointer h-[40px] w-[80px] rounded-[10px] bg-[#178FEB] flex items-center justify-center mt-[40px] text-[20px] font-[600] leading-[30px] text-[#fff]"
            >
              {state?.loading ? (
                <LoadingIndicator size={20} color="#fff" />
              ) : (
                "Nhận"
              )}
            </div>
          </div>
        )}
      </Modal>
    );
  }
);
