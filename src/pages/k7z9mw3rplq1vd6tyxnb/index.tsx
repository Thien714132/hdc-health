import { RichTextEditorHandle } from "@/components/RichTextEditor/RichTextEditor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import styles from "./index.module.scss";
const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);
type Props = { isLogin: boolean };

const CreatePost: React.FC<Props> = ({}: Props) => {
  const richTextEditorRef = useRef<RichTextEditorHandle>(null);

  return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1  items-center overflow-y-auto scroll-container",
          styles.container,
        ].join(" ")}
      >
        <RichTextEditor
          ref={richTextEditorRef}
          style={{
            height: 400,
            width: "100%",
            background: "#fff",
            marginBottom: 20,
          }}
        />
      </div>
      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />
    </div>
  );
};

export default CreatePost;
