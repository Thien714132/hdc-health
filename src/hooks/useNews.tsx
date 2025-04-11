/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useNews = () => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getNews = async () => {
    setLoading(true);

    const res = await NetWork.get(getRequestUrl(API_URL.POST));

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setNewsData(res?.data);
      console.log(res?.data);
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  return { newsData, loading };
};
