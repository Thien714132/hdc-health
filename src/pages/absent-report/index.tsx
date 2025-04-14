/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = { isLogin: boolean };

const Report = ({}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPressGet = async () => {
    setLoading(true);

    const res = await NetWork.get(
      getRequestUrl(API_URL.MEAL_TICKET, { partial: API_URL.REPORT })
    );

    if (res?.status !== RESPONSE_CODE.SUCCESS) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-[100vw]">
      <div className="flex flex-col items-center image-background items-center justify-center greeting-container relative pl-[10px] pr-[10px]">
        <div
          className="cursor-pointer h-[50px] w-[260px] bg-[#0052d4] items-center justify-center flex rounded-[16px] text-[#fff]"
          onClick={onPressGet}
        >
          {loading ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
              size="default"
            />
          ) : (
            "Lấy danh sách vắng mặt"
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
