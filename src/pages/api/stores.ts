import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "../../../prisma";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<StoreApiResponse | StoreType[]>
) {
 const { page = "" }: { page?: string } = req.query; // request에서 page 값 가져오기 기본값=1

 const prisma = new PrismaClient();

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
  const stores = await prisma.store.findMany({
   orderBy: { id: "asc" },
  });

  return res.status(200).json(stores);
 }
}
