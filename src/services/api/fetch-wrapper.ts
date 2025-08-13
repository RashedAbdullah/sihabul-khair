type Requestmethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function fetchWrapper(
  url: string,
  method: Requestmethod = "GET",
  body: unknown = null
) {
  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    });

    if (!response?.ok) {
      const errorDetails = await response.text();
      console.log("errorDetails ", errorDetails);
      throw new Error(`Request failed: ${response.status} - ${errorDetails}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.warn("Fetch aborted:", url);
      } else {
        console.error("Fetch error:", error);
      }
    } else {
      console.error("Unknown fetch error");
    }
    throw error;
  }
}
