import localFont from "next/font/local";

export const MandalorianFont = localFont({
  src: [
    {
      path: "../fonts/Mandalorian.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Mandalorian.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mandalorian",
  display: "swap",
});
