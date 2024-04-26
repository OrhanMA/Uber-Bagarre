import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import Head from "next/head";
import Script from "next/script";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

import { Icon } from "leaflet";
import { useCallback, useMemo, useRef, useState } from "react";
import { Muted } from "./typograhpy";

const defaultIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const fightSchema = z.object({
  title: z
    .string({ message: "A short resume of what is it all about" })
    .min(2)
    .max(255),
  message: z
    .string({ message: "Give us some context about the fight" })
    .min(5)
    .max(1000),
  fighters_needed: z
    .number({ message: "Pick a number between 1 and 10" })
    .min(1)
    .max(10),
  // address: z
  //   .string({
  //     message: "The place where the fight is going to happen",
  //   })
  //   .max(255),
  fighting: z.boolean().default(true).optional(),
  cover: z.boolean().default(false).optional(),
});

export default function CreateFightForm() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [finalPosition, setFinalPosition] = useState<[number, number] | null>(
    null
  );

  console.log(finalPosition);

  // 1. Define your form
  const form = useForm<z.infer<typeof fightSchema>>({
    resolver: zodResolver(fightSchema),
    defaultValues: {
      title: "test1234",
      message: "Here is a description",
      fighters_needed: 4,
      // address: "34 Avenue de l'Europe, 38000 Grenoble",
      fighting: true,
      cover: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof fightSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${position[1]}&latitude=${position[0]}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    console.log(data);

    const address = data.features[0].properties.full_address;

    console.log(address);

    const finalData = {
      ...values,
      address: address || "unknown",
    };

    // const response = await createFight(finalData);
    // const data = await response;
    // console.log(data);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your title for the request.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message here" {...field} />
                </FormControl>
                <FormDescription>
                  Your message to describe the fight context
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fighters_needed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fighters needed</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    max={10}
                    defaultValue={1}
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How many fighters your need (0-10)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel>Fight location</FormLabel>
            <Muted>
              Click on the map to set your position then use the draggable
              marker to set a more precise position
            </Muted>
            <MapContainer
              className="w-full h-[300px]"
              // style={{ height: "200px", width: "100vw" }}
              center={position}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <Marker icon={defaultIcon} position={position}>
              <Popup>Fight location</Popup>
            </Marker> */}
              <LocationMarker setFinalPosition={setFinalPosition} />
            </MapContainer>
          </div>
          {/* <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={"unknown"}
                    placeholder="34 Avenue de l'Europe, 38000 Grenoble"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The address where the fight takes place
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex flex-wrap gap-6">
            <FormField
              control={form.control}
              name="fighting"
              render={({ field }) => (
                <FormItem className="flex min-w-[275px] grow w-fit flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      I&apos;m fighting
                    </FormLabel>
                    <FormDescription>Are you also fighting</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem className="flex min-w-[275px] grow w-fit flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Anonymous fight</FormLabel>
                    <FormDescription>Select for anonymity</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Request fight</Button>
        </form>
      </Form>
    </div>
  );
}

function LocationMarker({ setFinalPosition }: { setFinalPosition: any }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      setFinalPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setFinalPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return position === null ? null : (
    <Marker
      icon={defaultIcon}
      position={position}
      draggable={draggable}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup>
        {" "}
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}
