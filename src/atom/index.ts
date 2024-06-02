import { LocationType, StoreType } from "@/interface";
import { atom } from "recoil";

const DEFAULT_LAT = 37.49765203;
const DEFAULT_LNG = 127.03088379;
const DEFAULT_ZOOM = 3;

export const mapState = atom({
 key: "map",
 default: null,
 dangerouslyAllowMutability: true, // 읽기 전용 상태도 수정할 수 있도록 옵션 true
});

export const currentStoreState = atom<StoreType | null>({
 key: "store",
 default: null,
});

export const locationState = atom<LocationType>({
 key: "location",
 default: {
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  zoom: DEFAULT_ZOOM,
 },
});
