export async function GET(request: Request) {
  console.log(request.url);

  const res = await fetch("http://localhost:8000/api/fighters", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
