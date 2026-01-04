
// export function FormatLocalDate(dateString: string) {
//   const d = new Date(dateString);

//   return d.toLocaleString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// }


// export function FormatLocalDate(dateString?: string) {
//   if (!dateString) return "";

//   const d = new Date(dateString);

//   return d
//     .toLocaleString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     })
//     .replace(",", ""); // remove comma
// }


export function FormatLocalDate(dateValue?: string | number | Date) {
  if (!dateValue) return "";

  const d = new Date(dateValue);

  return d
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
}
