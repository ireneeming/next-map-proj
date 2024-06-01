import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { useQuery, useInfiniteQuery } from "react-query";
import { StoreApiResponse, StoreType } from "@/interface/index";
import Loading from "@/components/Loading";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";

export default function StoreListPage() {
 const router = useRouter();
 const { page = "1" } = router.query;

 const ref = useRef<HTMLDivElement | null>(null);
 const pageRef = useIntersectionObserver(ref, {});
 const isPageEnd = !!pageRef?.isIntersecting;

 const [pageEnd, setPageEng] = useState<boolean>(false);

 const fetchProjects = async ({ pageParam = "1" }) => {
  const { data } = await axios("/api/stores?page=" + pageParam, {
   params: {
    limit: 10,
    page: pageParam,
   },
  });
  return data;
 };

 const {
  data: stores,
  isFetching,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isError,
  isLoading,
 } = useInfiniteQuery("stores", fetchProjects, {
  getNextPageParam: (lastPage: any) =>
   lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
 });

 const fetchNext = useCallback(async () => {
  const res = await fetchNextPage();

  if (res.isError) {
   console.log(res.error);
  }
 }, [fetchNextPage]);

 useEffect(() => {
  let timerId: NodeJS.Timeout | undefined;
  if (isPageEnd && hasNextPage) {
   timerId = setTimeout(() => {
    fetchNext();
   }, 500);
  }

  return () => clearTimeout(timerId);
 }, [fetchNext, hasNextPage, isPageEnd]);

 if (isError) {
  return <span>errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</span>;
 }

 return (
  <div className="px-4  md:max-w-5xl mx-auto py-8">
   <ul className="divide-y devide-gray-100" role="list">
    {isLoading ? (
     <Loading />
    ) : (
     stores?.pages.map((page, idx) => (
      <React.Fragment key={idx}>
       {page.data.map((store: StoreType, i: number) => (
        <li className="flex justify-between gap-x-6 py-5" key={i}>
         <div className="flex gap-x-4">
          <Image
           src={
            store?.category !== "null"
             ? `/images/markers/${store?.category}.png`
             : "/images/markers/default.png"
           }
           width={48}
           height={48}
           alt="아이콘이미지"
          />
          <div>
           <div className="text-sm font-semibold leading-9 text-gray-900">
            {store?.name}
           </div>
           <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
            {store?.storeType}
           </div>
          </div>
         </div>
         <div className="hidden sm:flex sm:flex-col sm:items-end">
          <div className="text-sm font-semibold leading-6 text-gray-900">
           {store?.address}
          </div>
          <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
           {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
           {store?.category}
          </div>
         </div>
        </li>
       ))}
      </React.Fragment>
     ))
    )}
   </ul>

   {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
   <div className="w-full touch-none h-10 mb-10 " ref={ref} />
  </div>
 );
}
