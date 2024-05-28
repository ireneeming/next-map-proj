import { StoreApiResponse, StoreType } from "@/interface/index";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

import Link from "next/link";

export default function StoreListPage() {
 const router = useRouter();
 const { page = "1" } = router.query;

 const {
  isLoading,
  isError,
  data: stores,
 } = useQuery(`stores-${page}`, async () => {
  const { data } = await axios(`/api/stores?page=${page}`);

  return data as StoreApiResponse;
 });

 if (isError) {
  return <span>errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</span>;
 }

 return (
  <div className="px-4  md:max-w-5xl mx-auto py-8">
   <ul className="divide-y devide-gray-100" role="list">
    {isLoading ? (
     <Loading />
    ) : (
     stores?.data.map((store, idx) => (
      <li className="flex justify-between gap-x-6 py-5" key={idx}>
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
     ))
    )}
   </ul>
   {stores?.totalPage && (
    <div className="py-6 w-full px-10 flex justify-center gap-4 bg-white my-10 flex-wrap text-black">
     {stores?.totalPage <= 10 ? (
      [...Array(stores?.totalPage)].map((x, i) => (
       <Link href={{ pathname: "/stores", query: { page: i + 1 } }} key={i}>
        <span
         className={`px-3 py-2 rounded border shadow-sm bg-white ${
          i + 1 === parseInt(page, 10)
           ? "text-blue-600 font-bold"
           : "text-gray-300"
         }`}
        >
         {i + 1}
        </span>
       </Link>
      ))
     ) : (
      <>
       {parseInt(page) > 1 && (
        <Link
         href={{ pathname: "/stores", query: { page: parseInt(page) - 1 } }}
        >
         <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
          이전
         </span>
        </Link>
       )}

       <Link href={{ pathname: "/stores", query: { page: page } }}>
        <span
         className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-600`}
        >
         {page}
        </span>
       </Link>
       {stores?.totalPage > parseInt(page) && (
        <Link
         href={{ pathname: "/stores", query: { page: parseInt(page) + 1 } }}
        >
         <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
          다음
         </span>
        </Link>
       )}
      </>
     )}
    </div>
   )}
  </div>
 );
}
