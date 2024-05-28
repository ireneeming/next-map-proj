import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType } from "@/interface";
import { PrismaClient } from "../../../prisma";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse<StoreType[]>
) {
 //  const stores = (await import("../../data/store_data.json"))[
 //   "DATA"
 //  ] as StoreType[];

 const prisma = new PrismaClient();
 const stores = await prisma.store.findMany({
  orderBy: { id: "asc" },
 });

 res.status(200).json(stores);
}
