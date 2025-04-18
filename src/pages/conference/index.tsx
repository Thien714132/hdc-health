/* eslint-disable @typescript-eslint/no-explicit-any */
import AppContext from "@/context/appContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styles from "./index.module.scss";
import { APPLICATION_ACTION_TYPE } from "@/context/action";

type Props = { isLogin: boolean };

const Conference: React.FC<Props> = ({}: Props) => {
  const { appState, dispatch } = useContext(AppContext);
  const router = useRouter();

  const onPress = (item: any) => {
    dispatch({
      type: APPLICATION_ACTION_TYPE.SAVE_CURRENT_SESSION,
      payload: item,
    });

    setTimeout(() => {
      router.push("/conference/questions?id=" + item?.id);
    }, 200);
  };

  return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1  items-center",
          styles.container,
        ].join(" ")}
      >
        <div className="flex flex-wrap  w-full ml-[10px] mr-[10px] justify-center max-w-[1200px] gap-[20px]">
          {appState?.general_data?.conferences?.map(
            (item: any, index: number) => (
              <div
                onClick={
                  index === 5 || index === 6
                    ? onPress?.bind(null, item)
                    : () => {}
                }
                className={[
                  "  bg-[#fff] shadow-medium w-[100%] max-w-[350px] p-[10px] rounded-[16px]",
                  index === 5 || index === 6 ? "hover:bg-[#ebf6fb]" : "",
                ].join(" ")}
                key={item?.id}
                style={{
                  opacity: index === 5 || index === 6 ? 1 : 0.5,
                  cursor: index === 5 || index === 6 ? "pointer" : "default",
                }}
              >
                <div className="justify-center flex pb-[7px] text-[18px] leading-[34px] font-[700] text-[#0052d4] border-b-[1px] border-b-[#0052d4] border-b-solid">
                  {item?.session}
                </div>
                <div className="flex-1 w-full flex flex-col mt-[20px] items-center pb-[10px] gap-[10px]">
                  <div className="text-[14px] text-[#22233E] leading-[21px] font-[500]">
                    {item?.title}
                  </div>
                  <div className="text-[14px] text-[#22233E] leading-[21px] font-[500] text-center">
                    {item?.content}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />
    </div>
  );
};

export default Conference;
