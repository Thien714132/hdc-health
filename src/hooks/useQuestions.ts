/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  loading: boolean;
  data: any[];
};

export const useQuestions = () => {
  const router = useRouter();
  const { id } = router.query;
  // const [loading, setLoading] = useState<boolean>(false);
  // const [question, setQuestion] = useState<any>([]);
  const [state, setState] = useState<Props>({
    page: 0,
    size: 0,
    total: 0,
    totalPages: 0,
    loading: false,
    data: [],
  });

  const onPageChange = (page: number) => {
    setState((prev) => ({
      ...prev,
      page: page - 1,
    }));
  };

  console.log(state);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id, state?.page]);

  const fetchData = async () => {
    if (!id) {
      return;
    }
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    const res = await NetWork.get(getRequestUrl(API_URL.QUESTIONS), {
      conferenceId: id,
      page: state?.page,
    });
    if (res?.status === RESPONSE_CODE.SUCCESS) {
      setState((prev) => ({
        ...prev,
        ...res?.data,
      }));
    }
    setState((prev) => ({
      ...prev,
      loading: false,
    }));
  };

  return { fetchData, state, onPageChange };
};
