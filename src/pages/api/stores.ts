import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import prisma from "@/db";
import axios from "axios";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
 const { page = "" }: { page?: string } = req.query; // request에서 page 값 가져오기 기본값=1

 //  if (req.method === "POST") {
 //   // 데이터 생성 처리
 //   const data = req.body;
 //   const result = await prisma.store.create({
 //    data: { ...data },
 //   });

 //   return res.status(200).json(result);
 //  }

 if (req.method === "POST") {
  // 데이터 생성을 처리한다
  const formData = req.body;
  const headers = {
   Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
   `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
    formData.address
   )}`,
   { headers }
  );

  const result = await prisma.store.create({
   data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  });

  return res.status(200).json(result);
 }

 if (page) {
  const count = await prisma.store.count(); //prisma에서 호출된 데이터가 몇개인지 count
  const skipPage = parseInt(page) - 1; // 기본 페이지는 1부터 시작하니까 처음부터 시작하기 위해 생성
  const stores = await prisma.store.findMany({
   orderBy: { id: "asc" },
   take: 10, // 항상 데이터 10개만 가져오기
   skip: skipPage * 10, // 해당 숫자 페이지를 가져옴
  });

  //totalpage, data, page, totalCount

  return res.status(200).json({
   page: parseInt(page),
   data: stores,
   totalCount: count, // 총 레코드의 갯수
   totalPage: Math.ceil(count / 10), // 총 레코드 갯수 /10으로 총 몇페이지 나왔는지 계산
  });
 } else {
  const { id }: { id?: string } = req.query;

  const stores = await prisma.store.findMany({
   orderBy: { id: "asc" },
   where: {
    id: id ? parseInt(id) : {},
   },
  });

  return res.status(200).json(id ? stores[0] : stores);
 }
}
