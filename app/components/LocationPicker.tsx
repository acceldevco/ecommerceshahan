// "use client";

// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import L from "leaflet";

// // Fix default icon issue in Leaflet + Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// interface LocationData {
//   lat: number;
//   lng: number;
//   address: string;
// }

// export default function LocationPicker({ exportlocation }: any) {
//   const [location, setLocation] = useState<any>(null);

//   // کامپوننت داخلی برای دریافت کلیک روی نقشه
//   function LocationMarker() {
//     useMapEvents({
//       click: async (e) => {
//         const { lat, lng } = e.latlng;
//         console.log(e);

//         // تبدیل lat/lng به آدرس
//         let addr = "";
//         var postcode;
//         try {
//           const res = await axios.get(
//             "https://nominatim.openstreetmap.org/reverse",
//             {
//               params: { lat, lon: lng, format: "json" },
//               headers: { "User-Agent": "MyApp/1.0" },
//             }
//           );
//           addr = res.data.display_name || "آدرس پیدا نشد";
//           postcode = res.data.address.postcode;
//         } catch (err) {
//           console.error(err);
//           addr = "خطا در دریافت آدرس";
//         }

//         exportlocation({ lat, lng, address: addr,postcode:postcode });
//         // آپدیت state
//         setLocation({ lat, lng, address: addr });
//       },
//     });

//     return location ? <Marker position={[location.lat, location.lng]} /> : null;
//   }

//   return (
//     <div className="p-2 rounded-2xl">
//       <MapContainer

//         className="rounded-xl"
//         center={[35.6892, 51.389]}
//         zoom={13}
//         style={{ height: "200px", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker />
//       </MapContainer>

//       {/* <div className="mt-4 p-2 border rounded bg-gray-50">
//         <h3 className="font-bold mb-2">خروجی زنده:</h3>
//         {location ? (
//           <>
//             <p>
//               <strong>مختصات:</strong>{" "}
//               {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
//             </p>
//             <p>
//               <strong>آدرس:</strong> {location.address}
//             </p>
//           </>
//         ) : (
//           <p>روی نقشه کلیک کنید تا آدرس نمایش داده شود</p>
//         )}
//       </div> */}
//     </div>
//   );
// }
/////////////////////////////////////////////////
"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { useStorage } from "../hook/localstorage";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LocationPicker({
  exportlocation,
  defaultLocation,
}: any) {
  var [map, setmap] = useStorage("location", {});
  const [location, setLocation] = useState<any>({
    ...map, lat: 35.6892,
    lng: 51.3890,
  });

  // --- مقداردهی اولیه اگر defaultLocation وجود داشته باشد ---
  useEffect(() => {
    if (defaultLocation) {
      setLocation(defaultLocation);
      exportlocation(defaultLocation);
    }
  }, [defaultLocation]);

  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;

        let addr = "";
        let postcode;
        try {
          const normalizedLng = ((lng + 180) % 360) - 180;

          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat,
                lon: normalizedLng,
                format: "json",
              },
              headers: { "User-Agent": "MyApp/1.0" },
            }
          );
          addr = res.data.display_name || "آدرس پیدا نشد";
          postcode = res.data.address.postcode;
        } catch (err) {
          console.error(err);
          addr = "خطا در دریافت آدرس";
        }

        const data = { lat, lng, address: addr, postcode };
        setmap(data);
        // setLocation(data);
        // exportlocation(data);
      },
    });

    return location ? <Marker position={[location.lat, location.lng]} /> : null;
  }

  return (
    <div className="p-2 rounded-2xl">
      <MapContainer
        className="rounded-xl"
        center={
          location ? [location.lat, location.lng] : [35.6892, 51.389] // مرکز پیش‌فرض تهران
        }
        zoom={13}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
