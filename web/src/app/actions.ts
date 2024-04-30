"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FightData } from "@/types";

export async function login(values: { username: string; password: string }) {
  // console.log(values);

  try {
    const response = await fetch("http://localhost:8000/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();

    console.log(data);

    // si c'est la réponse 401 Invalid credentials de Symfony
    if ((data.code !== null && data.code === 401) || !response.ok) {
      return data;
    }

    const token = data.token;
    cookies().set("jwtToken", token);
    console.log("USER FROM SIGNIN", data.user_id);
    cookies().set("user_id", data.user_id);
    // console.log(token);
    // set token in nextjs cookies, redirect to another page
  } catch (error) {
    console.error("Error trying to authenticate: ", error);
  }
  revalidatePath("/fighters"); // purge les données en cache pour la route pour avoir des données fraîches lors de la redirection
  redirect("/fighters");
}

export async function signup(values: {
  username: string;
  email: string;
  password: string;
}) {
  // console.log(values);

  try {
    const response = await fetch("http://localhost:8000/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    // console.log(data);

    // si c'est la réponse 401 Invalid credentials de Symfony
    if (!response.ok) {
      return data;
    }

    const token = data.token;
    cookies().set("jwtToken", token);

    cookies().set("user_id", data.user_id);
    // console.log(token);
    // set token in nextjs cookies, redirect to another page
  } catch (error) {
    console.error("Error trying to authenticate: ", error);
  }
  revalidatePath("/fighters"); // purge les données en cache pour la route pour avoir des données fraîches lors de la redirection
  redirect("/fighters");
}

export async function getFighters() {
  const token = cookies().get("jwtToken")?.value;
  // console.log("FROM FIGHTERS TOKEN: ", token);

  const response = await fetch("http://localhost:8000/api/fighters", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  // console.log(data);

  return data;
}

export async function createFight(fightData: any) {
  fightData.user = "api/users/" + cookies().get("user_id")?.value;
  const response = await fetch("http://localhost:8000/api/fights", {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify(fightData),
  });

  if (!response.ok) {
    const data = await response.json();
    return data;
  }
  revalidatePath("/fights");
  redirect("/fights");
}

export async function updateFight(fightData: any, fight_id: number) {
  fightData.user = "api/users/" + cookies().get("user_id")?.value;
  const token = cookies().get("jwtToken")?.value;
  console.log(fightData);

  console.log("FIGHT ID IS : ", fight_id);

  const response = await fetch(`http://localhost:8000/api/fights/${fight_id}`, {
    method: "PUT",
    headers: {
      "Accept": "application/ld+json",
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({
      ...fightData,
      user: `api/users/${cookies().get("user_id")?.value}`,
    }),
  });

  const data = await response.json();
  console.log(data);
  revalidatePath("/fights");
  redirect("/fights");
}

export async function getUserFights() {
  const response = await fetch(
    `http://localhost:8000/api/fights?user.id=${
      cookies().get("user_id")?.value
    }`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getFight(id: number) {
  const response = await fetch("http://localhost:8000/api/fights/" + id);
  const data = await response.json();
  return data;
}
