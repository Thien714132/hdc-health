/* eslint-disable react-hooks/exhaustive-deps */
import { APPLICATION_ACTION_TYPE } from "@/context/action";
import AppContext from "@/context/appContext";
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useContext, useEffect, useState } from "react";

export const useGeneral = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(AppContext);

  const fetchData = async () => {
    setLoading(true);
    const res = await NetWork.get(getRequestUrl(API_URL.GENERAL));
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      dispatch({
        type: APPLICATION_ACTION_TYPE.SAVE_DATA_GENERAL,
        payload: res?.data,
      });
    }
    setLoading(false);
  };

  const fetchDataDocument = async () => {
    setLoading(true);
    const res = await NetWork.get(getRequestUrl(API_URL.DOCUMENT));
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      dispatch({
        type: APPLICATION_ACTION_TYPE.SAVE_DOCUMENTS,
        payload: res?.data,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchDataDocument();
  }, []);

  return { fetchData, loading };
};
