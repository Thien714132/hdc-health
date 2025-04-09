import AppContext from "@/context/appContext";
import React, { useContext } from "react";

type Props = { isLogin: boolean };

const Documents: React.FC<Props> = ({}: Props) => {
  const {} = useContext(AppContext);

  return (
    <div className="flex flex-col w-[100vw]">
      <div
        className="flex flex-col items-center image-background items-center
      justify-center greeting-container relative"
      ></div>
    </div>
  );
};

export default Documents;
