import React from "react";

type Props = { isLogin: boolean };

const MEALS_DATA = [
  {
    id: 1,
    name: "Ăn trưa ngày 18/4/2025",
    time: "11h30 - 13h15 Ngày 18/4/2025",
    location: "Nhà hàng khách sạn Nam Cường",
  },
  {
    id: 2,
    name: "Tiệc chào mừng tối 18/4/2025",
    time: "18h50 - 21h00 tối 18/4/2025",
    location: "Trống đồng Place Hoàng Gia - 172 Trường Chinh, TP. Hải Dương",
  },
  {
    id: 3,
    name: " Ăn trưa ngày 19/4/2025",
    time: "12h00 - 13h30 Ngày 19/4/2025",
    location: "Nhà hàng khách sạn Nam Cường",
  },
];

const Meals: React.FC<Props> = ({}: Props) => {
  return (
    <div className="flex flex-col w-[100vw] relative">
      <div className="flex flex-col relative z-1  h-[100vh] items-center">
        Phiếu ăn
        <div className="flex flex-wrap w-full justify-center gap-[20px] items-center h-full">
          {MEALS_DATA?.map((item) => (
            <div
              key={item?.id}
              className="items-center flex flex-col w-full max-w-[350px] bg-[#fff] rounded-[16px] p-[15px] shadow-medium"
            >
              <div className="text-[20px] leading-[30px] text-[#2A2E92] font-[700] w-full flex justify-center border-b-[1px] border-b-[#2A2E92] pb-[6px] mb-[20px]">
                {item?.name}
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Thời gian:</strong> {item?.time}
                </div>
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Địa điểm: </strong>
                  {item?.location}
                </div>
              </div>
              <div className="cursor-pointer flex justify-center mt-[20px] bg-[#2A2E92] p-[10px] rounded-[10px] text-[#fff] text-[14px] font-[500] leading-[21px]">
                <div className="">Nhận phiếu ăn</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center image-background items-center justify-center pt-[120px] fixed" />
    </div>
  );
};

export default Meals;
