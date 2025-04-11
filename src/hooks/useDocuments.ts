import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useEffect, useState } from "react";

export const useDocuments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<boolean>(false);
  //   const { dispatch } = useContext(AppContext);

  const fetchData = async () => {
    setLoading(true);
    const res = await NetWork.get(getRequestUrl(API_URL.DOCUMENT));

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setData(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchData, loading, data };
};
