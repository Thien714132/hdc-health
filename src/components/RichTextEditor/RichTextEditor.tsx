"use client";

import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader/ImageUploader";

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => void;
};

type RichTextEditorProps = {
  style?: CSSProperties;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ style }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const [title, setTitle] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const onCreate = async () => {
      setLoading(true);
      const content = getContent();
      const params = {
        title,
        banner,
        content,
      };

      const res = await NetWork.post(getRequestUrl(API_URL.POST), params);

      if (res?.status === RESPONSE_CODE.SUCCESS) {
        toast.success("Tạo thành công");
        setTitle("");
        setBanner("");
      } else {
        toast.error("Tạo thất bại");
      }
      setLoading(false);
    };

    useEffect(() => {
      if (!editorRef.current) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      return () => {
        quillRef.current = null;
      };
    }, []);
    const getContent = () => {
      return quillRef.current ? quillRef.current.root.innerHTML : "";
    };
    useImperativeHandle(ref, () => ({
      getContent,
    }));

    return (
      <div className="flex flex-col mt-[100px] w-[90%]">
        <div className="flex flex-col justify-center mb-[20px]">
          <div className="mb-[10px] font-[700]">Title</div>
          <input
            value={title}
            className="bg-[#fff] border-[rgba(1,1,1,0.1)] border-[1px] border-solid pl-[10px] pr-[10px]"
            onChange={(e) => {
              setTitle(e?.target?.value);
            }}
          />
        </div>
        <div className="mb-[10px] font-[700]">Nội Dung</div>
        <div ref={editorRef} style={style} />
        <div className="mb-[10px] font-[700]">Ảnh</div>
        <div className="flex mb-[200px]">
          <ImageUploader getUuid={setBanner} />
          <div className="h-[40px] flex-1 flex justify-end">
            <div
              onClick={onCreate}
              className="cursor-pointer h-[40px] w-[100px] bg-[#0052d4] text-[#fff] font-bold items-center flex justify-center rounded-full"
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
                  size="default"
                />
              ) : (
                "Tạo"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
