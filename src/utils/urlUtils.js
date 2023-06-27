export function modifyURLsInData(data) {
  const frontendURL = "http://localhost:3000"; // Your frontend application's URL
  const backendURL = "http://oumouexpress.local"; // Your WordPress backend URL

  // Modify the URLs in the data object
  if (data.images && data.images.length > 0) {
    data.images = data.images.map((image) => {
      image.src = image.src.replace(backendURL, frontendURL);
      return image;
    });
  }

  // Modify other URLs in the data object as needed

  return data;
}
