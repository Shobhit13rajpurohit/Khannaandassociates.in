export async function revalidate(path: string): Promise<void> {
  const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
  const host = process.env.NEXT_PUBLIC_HOST_URL;

  if (!secret) {
    console.warn("Revalidation secret is not set. Skipping revalidation.");
    // Don't throw an error, just log it. The primary operation succeeded.
    return;
  }

  if (!host) {
    console.warn("Host URL is not set. Skipping revalidation.");
    return;
  }

  try {
    const response = await fetch(`${host}/api/revalidate?secret=${secret}&path=${path}`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Throw an error to be caught by the caller
      throw new Error(`Revalidation request failed for path: ${path}. Status: ${response.status}. Body: ${errorText}`);
    }

    console.log(`Revalidation successful for path: ${path}`);
  } catch (error) {
    // Re-throw the error to be handled by the caller
    throw error;
  }
}
