/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react/display-name */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { isNullOrEmpty } from "@/utils/method";
import { Input, Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
import { LoadingIndicator } from "../LoadingIndicator";

type AskingModalProps = { id: number; callbackSuccess?: () => void };

export type AskingModalRefProps = {
  showModal: () => void;
  closeModal: () => void;
};

export const AskingModal = forwardRef<AskingModalRefProps, AskingModalProps>(
  ({ id, callbackSuccess }, ref) => {
    const [state, setState] = useState<{
      isShow: boolean;
      title: string;
      content: string;
      loading: boolean;
      name: string;
      community: string;
    }>({
      isShow: false,
      loading: false,
      title: "",
      content: "",
      community: "",
      name: "",
    });

    const showModal = () => {
      setState((prev) => ({
        ...prev,
        isShow: true,
      }));
    };
    const closeModal = () => {
      setState((prev) => ({
        ...prev,
        isShow: false,
        loading: false,
        title: "",
        content: "",
        community: "",
        name: "",
      }));
    };
    useImperativeHandle(ref, () => ({
      showModal,
      closeModal,
    }));

    const onAdd = async () => {
      if (
        isNullOrEmpty(state?.community) ||
        isNullOrEmpty(state?.name) ||
        isNullOrEmpty(state?.content) ||
        isNullOrEmpty(state?.title)
      ) {
        toast.error("Bạn cần nhập đầy đủ thông, vui lòng thử lại");
        return;
      }
      setState((prev) => ({
        ...prev,
        loading: true,
      }));

      const params = {
        content: state?.content,
        name: state?.name,
        community: state?.community,
        title: state?.title,
        conferenceId: id,
      };
      const res = await NetWork.post(getRequestUrl(API_URL.QUESTIONS), params);
      if (res?.status == RESPONSE_CODE.SUCCESS) {
        toast.success("Thêm câu hỏi thành công");
        callbackSuccess?.();
        closeModal();
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      } else {
        toast.error("Thêm câu hỏi thất bại, vui lòng thử lại");
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
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
        <div className="flex flex-col justify-center">
          <div className="text-[22px] leading-[33px] font-[500] text-[#2A2E92] mb-[20px] flex justify-center">
            Thêm câu hỏi
          </div>
          <span className="text-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px] mt-[20px]">
            Title<span className="text-[#FF0000]">*</span>
          </span>
          <Input
            placeholder="Nhập title..."
            value={state?.title}
            onFocus={() => {
              setState((prev) => ({
                ...prev,
                error: undefined,
              }));
            }}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                title: e?.target?.value,
              }));
            }}
          />
          <span className="text-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px] mt-[20px]">
            Câu hỏi<span className="text-[#FF0000]">*</span>
          </span>
          <textarea
            placeholder="Nhập câu hỏi..."
            value={state?.content}
            className="p-[10px] border-[1px] border-solid border-[rgba(0,0,0,0.15)] rounded-[6px]"
            onFocus={() => {
              setState((prev) => ({
                ...prev,
                error: undefined,
              }));
            }}
            rows={6}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                content: e?.target?.value,
              }));
            }}
          />
          <span className="text-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px] mt-[20px]">
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
          <span className="text-[18px] leading-[23px] font-[500] text-[#2A2E92] mb-[5px] mt-[20px]">
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
          <div className="w-full flex items-center justify-center mt-[40px]">
            <div
              onClick={onAdd}
              className="w-[100px] flex justify-center cursor-pointer text-[20px] leading-[30px] font-[600] p-[10px] bg-[#2196F3] rounded-[10px] text-[#fff]"
            >
              {state?.loading ? (
                <LoadingIndicator size={20} color="#fff" />
              ) : (
                "Thêm"
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);
