import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUploader = ({ getUuid }: { getUuid: (uuid: string) => void }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
  };

  const handleChange = async ({ file }: { file: UploadFile }) => {
    const originFile = file.originFileObj as File;
    if (originFile) {
      const uploadedImageUrl = await uploadToServer(originFile);

      if (uploadedImageUrl) {
        const preview = await getBase64(originFile);

        setFileList([
          {
            uid: file.uid,
            name: originFile.name,
            status: "done",
            url: uploadedImageUrl,
            thumbUrl: preview,
          },
        ]);
        toast.success("Upload thành công!");
      } else {
        toast.error("Upload thất bại!");
      }
    }
  };

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await NetWork.postFormData(
        "/v1/attachments/upload",
        formData
      );
      if (res?.status === RESPONSE_CODE.SUCCESS) {
        console.log(res?.data?.[0]?.url);
        getUuid(res?.data?.[0]?.uuid);
        return res?.data?.[0]?.url;
      }
    } catch (err) {
      getUuid("");
      console.error("Upload error:", err);
      return null;
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={() => {}} // prevent Ant Design from uploading automatically
        onChange={handleChange}
        maxCount={1}
        showUploadList={{ showRemoveIcon: true }}
        onRemove={() => {
          setFileList([]);
          setPreviewImage("");
          getUuid("");
        }}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined style={{ fontWeight: "700", color: "#000" }} />
            <div style={{ marginTop: 8, fontWeight: "700", color: "#000" }}>
              Upload
            </div>
          </div>
        )}
      </Upload>

      <Modal
        open={previewVisible}
        title="Preview"
        footer={null}
        onCancel={handleCancel}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            layout="responsive"
            width={500}
            height={500}
          />
        )}
      </Modal>
    </>
  );
};

export default ImageUploader;
