"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Muted } from "./typograhpy";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapContainer, TileLayer } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { LocationMarker, defaultIcon } from "@/components/create-fight-form";
import { Form } from "@/components/ui/form";
import { fightSchema } from "@/components/create-fight-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { updateFight } from "@/app/actions";
export default function UpdateFightForm({ fight }: { fight: any }) {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [finalPosition, setFinalPosition] = useState<[number, number] | null>(
    null
  );

  const form = useForm<z.infer<typeof fightSchema>>({
    resolver: zodResolver(fightSchema),
    defaultValues: {
      title: fight.title,
      message: fight.message,
      fighters_needed: fight.fighters_needed,
      fighting: fight.fighting,
      cover: fight.cover,
    },
  });

  async function onSubmit(values: z.infer<typeof fightSchema>) {
    let address = "";
    if (finalPosition !== null) {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${finalPosition[1]}&latitude=${finalPosition[0]}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      // console.log(data);

      address = data.features[0].properties.full_address;
    } else {
      address = "unknown";
    }

    // console.log(address);

    const finalData = {
      ...values,
      // address: "24 Avenue Daniel Rops, 73000 Chambéry",
      address: address,
    };
    const postResponse = await updateFight(finalData, fight.id);
    console.log(postResponse);
  }

  return (
    <div className="mt-10">
      <Form {...form}>
        <form
          method="PUT"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
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
                    min="1"
                    max="10"
                    defaultValue={1}
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  How many fighters you need (0-10)
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
          <Button type="submit" disabled={finalPosition == null ? true : false}>
            Request fight
          </Button>
        </form>
      </Form>
    </div>
  );
}
