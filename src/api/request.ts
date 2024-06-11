const BASE_URL = "http://34.238.153.187:8085";

async function request(
  endpoint: string = "",
  method: "GET" | "PUT" | "POST" = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any = null
) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    });

    // handle specific errors provided by the server
    if (res.status === 400) {
      const { error }: { error: string } = await res.json();

      throw new Error(error);
    }

    // handle other unexpected errors
    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    const data = await res.json();

    return { error: "", data };
  } catch (error) {
    const errorMessage = `Error: ${error}`;

    console.error(errorMessage);

    return { error: errorMessage, data: null };
  }
}

export default request;
