import { currentStoreState, mapState } from "@/atom";
import { StoreApiResponse, StoreType } from "@/interface/index";
import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface MarkersProps {
 stores: StoreType[];
}

export default function Markers({ stores }: MarkersProps) {
 const map = useRecoilValue(mapState);
 const setCurrentStore = useSetRecoilState(currentStoreState);
 const loadKakaoMarkers = useCallback(() => {
  if (map) {
   stores.map((store) => {
    // 마커가 표시될 위치입니다

    const imageSrc = store.category
      ? `/images/markers/${store?.category}.png`
      : "/images/markers/default.png",
     imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
     imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(
     imageSrc,
     imageSize,
     imageOption
    );

    const markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
     position: markerPosition,
     image: markerImage,
    });

    marker.setMap(map);

    // 커스텀 오버레이에 표시할 내용입니다
    // HTML 문자열 또는 Dom Element 입니다
    const content = `<div class='infowindow'>${store?.name}</div>`;

    // 커스텀 오버레이를 생성합니다
    const customOverlay = new window.kakao.maps.CustomOverlay({
     position: markerPosition,
     content: content,
     xAnchor: 0.6,
     yAnchor: 0.91,
    });

    // 마커에 마우스오버 이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "mouseover", function () {
     // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이 마커위에 표시합니다
     customOverlay.setMap(map);
    });

    // 마커에 마우스아웃 이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "mouseout", function () {
     // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
     customOverlay.setMap(null);
    });

    // 선택한 가게 저장
    window.kakao.maps.event.addListener(marker, "click", function () {
     setCurrentStore(store);
    });
   });
  }
 }, [map, setCurrentStore, stores]);

 useEffect(() => {
  loadKakaoMarkers();
 }, [map, loadKakaoMarkers]);
 return <></>;
}
