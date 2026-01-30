export const getUserLocation = () =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      return resolve(null);
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
              headers: {
                "User-Agent": "travel-with-buddy-app",
              },
            },
          );

          const data = await res.json();

          resolve({
            lat,
            lng,
            city:
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              "",
            country: data?.address?.country || "",
          });
        } catch {
          // reverse-geocode failed → still allow register
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            city: "",
            country: "",
          });
        }
      },
      () => {
        // 🚨 Permission denied → DO NOT reject
        resolve(null);
      },
      { enableHighAccuracy: true },
    );
  });
