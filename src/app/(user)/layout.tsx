import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {ReduxProvider} from "../redux/provider";
import {ToastContainer} from "react-toastify";
import Sidebar from "@/components/contributor/Sidebar";

// import {ReduxProvider} from "./redux/provider";

const inter = Inter( {subsets: ["latin"]} );

export const metadata: Metadata = {
  title: "Block Tour",
  description: "Generated by create next app",
};

export default function RootLayout ( {children, }: Readonly<{children: React.ReactNode;}> ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ToastContainer /> */}
        <ReduxProvider>
        <div className="flex">
            <Sidebar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
