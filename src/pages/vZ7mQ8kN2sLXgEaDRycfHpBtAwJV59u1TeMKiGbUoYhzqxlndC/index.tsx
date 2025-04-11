/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetMeal, GetMealRefProps } from "@/components/GetMeal";
import AppContext from "@/context/appContext";
import React, { useContext, useRef } from "react";
import styles from "./index.module.scss";

type Props = { isLogin: boolean };

const Meals: React.FC<Props> = ({}: Props) => {
  const getMealRef = useRef<GetMealRefProps>(null);

  const { appState } = useContext(AppContext);

  console.log("appState", appState);

  const clickGetMeal = (item: any) => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setFocusMeal(item);
    //   setIsLoading(false);
    //   setIsShow(true);
    // }, 1000);

    const existItem = appState?.saveMeals?.findIndex(
      (item2) => item2?.id === item?.id
    );

    if (existItem !== -1) {
      getMealRef.current?.showModal(appState?.saveMeals[existItem], true);
      return;
    }
    getMealRef.current?.showModal(item, false);
  };

  const returnNote = (title: string) => {
    switch (title) {
      case "Ăn trưa ngày 18/4/2025": {
        return (
          <div className="w-full text-[16px] text-[#98A2B3] font-[400] leading-[24px] italic">
            Phiếu ăn sẽ được đóng lúc 9h30 18/4/2025
          </div>
        );
      }

      case "Tiệc chào mừng tối 18/4/2025": {
        return (
          <div className="w-full text-[16px] text-[#98A2B3] font-[400] leading-[24px] italic">
            Phiếu ăn sẽ được đóng lúc 16h50 18/4/2025
          </div>
        );
      }
      case "Ăn trưa ngày 19/4/2025": {
        return (
          <div className="w-full text-[16px] text-[#98A2B3] font-[400] leading-[24px] italic">
            Phiếu ăn sẽ được đóng lúc 10h00 19/4/2025
          </div>
        );
      }
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col w-[100vw] relative">
      <div
        className={[
          "flex flex-col relative z-1  items-center",
          styles.container,
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-wrap w-full justify-center gap-[20px] items-center h-full",
            styles?.mealContainer,
          ].join(" ")}
        >
          {appState?.general_data?.mealTickets?.map((item: any) => (
            <div
              key={item?.id}
              className="items-center flex flex-col w-full max-w-[350px] bg-[#fff] rounded-[16px] p-[15px] shadow-medium"
            >
              <div className="text-[20px] leading-[30px] text-[#2A2E92] font-[700] w-full flex justify-center border-b-[1px] border-b-[#2A2E92] pb-[6px] mb-[20px]">
                {item?.title}
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Thời gian:</strong> {item?.time}
                </div>
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Địa điểm: </strong>
                  {item?.location}
                </div>
                {returnNote(item?.title)}
              </div>
              <div className="cursor-pointer flex justify-center mt-[20px] bg-[#2A2E92] p-[10px] rounded-[10px] text-[#fff] text-[14px] font-[500] leading-[21px]">
                <div className="" onClick={clickGetMeal?.bind(null, item)}>
                  Nhận phiếu ăn
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />

      <GetMeal ref={getMealRef} />
    </div>
  );
};

export default Meals;
