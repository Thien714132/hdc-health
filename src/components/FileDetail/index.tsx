/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react/display-name */
import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";

type FileDetailModalProps = {};

export type FileDetailModalRefProps = {
  showModal: (url: string) => void;
  closeModal: () => void;
};

export const FileDetailModal = forwardRef<
  FileDetailModalRefProps,
  FileDetailModalProps
>(({}, ref) => {
  const [state, setState] = useState<{
    isShow: boolean;
    url: string;
    contentType: string;
  }>({
    isShow: false,
    url: "",
    contentType: "",
  });

  const detectFileType = async (url: string): Promise<string> => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const type = res.headers.get("Content-Type") || "";
      return type;
    } catch (err) {
      toast.error("Tải file thất bại. Vui lòng thử lại");
      console.error("Error detecting content type:", err);
      return "";
    }
  };

  const showModal = async (url: string) => {
    const contentType = await detectFileType(url);
    setState({
      isShow: true,
      url,
      contentType,
    });
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      isShow: false,
    }));
  };

  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }));

  const isPdf = state.contentType.includes("pdf");

  return (
    <Modal
      centered
      destroyOnClose
      open={state?.isShow}
      footer={null}
      width={700}
      onCancel={closeModal}
    >
      <iframe
        src={
          isPdf
            ? state.url
            : `https://docs.google.com/gview?url=${encodeURIComponent(
                state.url
              )}&embedded=true`
        }
        style={{ width: "100%", height: "90vh", border: "none" }}
        allowFullScreen
      />
    </Modal>
  );
});
