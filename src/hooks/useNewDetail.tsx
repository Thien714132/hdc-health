/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { NetWork } from "@/network";
import { RESPONSE_CODE } from "@/network/config";
import { API_URL } from "@/network/url";
import { getRequestUrl } from "@/network/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useNewDetail = () => {
  const router = useRouter();

  const { id } = router.query;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const getNews = async () => {
    setLoading(true);

    const res = await NetWork.get(
      getRequestUrl(API_URL.POST, { parentId: id + "" })
    );

    if (res?.status === RESPONSE_CODE.SUCCESS) {
      if (res?.data?.content?.includes(".pdf")) {
        const proxyUrl = `/api/pdf-proxy?fileUrl=${encodeURIComponent(
          res?.data?.content
        )}`;

        const iframeHtml = `<iframe src="${proxyUrl}" width="100%" height="700px" style="border:none; backgroundColor:grey"></iframe>`;
        setData({ ...res?.data, contentBlob: iframeHtml });
      } else {
        setData(res?.data);
      }
      console.log(res?.data);
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getNews();
    }
  }, [id]);

  return { data, loading };
};
