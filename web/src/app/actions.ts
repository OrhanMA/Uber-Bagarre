"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(values: { username: string; password: string }) {
  console.log(values);

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
    console.log(token);
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
  console.log(values);

  try {
    const response = await fetch("http://localhost:8000/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log(data);

    // si c'est la réponse 401 Invalid credentials de Symfony
    if (!response.ok) {
      return data;
    }

    const token = data.token;
    cookies().set("jwtToken", token);
    console.log(token);
    // set token in nextjs cookies, redirect to another page
  } catch (error) {
    console.error("Error trying to authenticate: ", error);
  }
  revalidatePath("/fighters"); // purge les données en cache pour la route pour avoir des données fraîches lors de la redirection
  redirect("/fighters");
}

export async function getFighters() {
  const token = cookies().get("jwtToken")?.value;
  console.log("FROM FIGHTERS TOKEN: ", token);

  const response = await fetch("http://localhost:8000/api/fighters", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }),
  });
  const data = await response.json();
  return data;
}
