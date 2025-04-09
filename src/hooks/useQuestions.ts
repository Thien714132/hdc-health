/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useQuestions = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  // const { dispatch } = useContext(AppContext);
  const [question, setQuestion] = useState<any>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  console.log("Asdasdasd___");

  const fetchData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    const res = await NetWork.get(getRequestUrl(API_URL.QUESTIONS), {
      conferenceId: id,
    });
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setQuestion(res?.data);
    }
    setLoading(false);
  };

  return { fetchData, loading, question };
};
