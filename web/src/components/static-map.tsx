"use client";
import { defaultIcon } from "@/components/create-fight-form";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function StaticMap({
  coordinates,
}: {
  coordinates: [number, number];
}) {
  return (
    <MapContainer
      className="w-full h-[300px]"
      // style={{ height: "200px", width: "100vw" }}
      center={[coordinates[1], coordinates[0]]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={defaultIcon} position={[coordinates[1], coordinates[0]]}>
        <Popup>Fight location</Popup>
      </Marker>
    </MapContainer>
  );
}
