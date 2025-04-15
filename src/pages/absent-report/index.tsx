/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoading } from "@/context/loadingContext";
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = { isLogin: boolean };

const Report = ({}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const { setIsLoading } = useLoading();

  const onPressGet = async () => {
    setLoading(true);

    const res = await NetWork.downloadFile(
      getRequestUrl(API_URL.MEAL_TICKET, { partial: API_URL.REPORT })
    );
    console.log("res", res);

    if (res?.status !== RESPONSE_CODE.SUCCESS) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    }
    setLoading(false);
  };

  const getNumberGuestSubscribe = async () => {
    setIsLoading(true);
    const res = await NetWork.get(
      getRequestUrl(API_URL.MEAL_TICKET, { parentId: API_URL.SUBSCRIBE })
    );
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setIsLoading(false);
      setData(res?.data);
    } else {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    getNumberGuestSubscribe();
  }, []);

  return (
    <div className="flex flex-col w-[100vw]">
      <div className="flex flex-col items-center image-background items-center justify-center greeting-container relative pl-[10px] pr-[10px]">
        <div className="flex items-center mb-[50px] gap-[20px]">
          {data?.map((item: any) => (
            <div
              key={item?.id}
              className="items-center flex flex-col w-full max-w-[350px] bg-[#fff] rounded-[16px] p-[15px] shadow-medium"
            >
              <div className="text-[20px] leading-[30px] text-[#2A2E92] font-[700] w-full flex justify-center border-b-[1px] border-b-[#2A2E92] pb-[6px] mb-[20px]">
                {item?.mealTicket?.title}
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Thời gian:</strong> {item?.mealTicket?.time}
                </div>
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Địa điểm: </strong>
                  {item?.mealTicket?.location}
                </div>
                <div className="w-full text-[16px] text-[#2A2E92] font-[500] leading-[24px]">
                  <strong>Số lượng đại biểu đã đăng kí: </strong>
                  {item?.count}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="cursor-pointer h-[50px] pl-[30px] pr-[30px] bg-[#0052d4] items-center justify-center flex rounded-[16px] text-[#fff]"
          onClick={onPressGet}
        >
          {loading ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
              size="default"
            />
          ) : (
            "Export danh sách đại biểu chưa đăng kí"
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
