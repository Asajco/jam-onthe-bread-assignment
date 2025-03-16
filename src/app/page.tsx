"use client";

import { useEffect, useState } from "react";
import { WalletData } from "./types/types";
import NftGallery from "@/compontents/NtfGallery";
import Filters from "@/compontents/Filters";
import { LuWallet } from "react-icons/lu";

export default function Home() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS || "";

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wallet?address=${address}`);
      const data = await response.json();
      setWalletData(data);
      console.log("Wallet Data:", data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return (
    <div className="relative">
      {showNotification && (
        <div className="fixed top-2 right-2 md:top-4 md:right-4 bg-green-100 border border-green-400 text-green-700 px-3 py-2 md:px-4 md:py-3 rounded shadow-md z-50 transition-opacity duration-300 max-w-[90%] md:max-w-md">
          <strong className="font-bold text-sm md:text-base">Success!</strong>
          <span className="block text-sm md:text-base">
            {" "}
            Wallet address copied to clipboard.
          </span>
        </div>
      )}
      <div className="p-4 md:p-8 flex flex-col sm:flex-row items-center justify-between border-b border-black">
        <h1 className="text-xl md:text-[2rem] text-black font-black mb-4 sm:mb-0">
          Cardano NFT
        </h1>
        <div className="flex gap-4 md:gap-[2rem] items-center">
          <LuWallet
            size={32}
            className="border-2 border-gray-300 rounded-md p-[6px] cursor-pointer hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            onClick={copyAddressToClipboard}
          />
          <p className="text-black font-black p-2 rounded-md bg-gray-100 text-sm md:text-base truncate max-w-[150px] md:max-w-none">
            {walletData?.balance.lovelace
              ? `Lovelace: ${walletData?.balance.lovelace}`
              : "0"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-4 text-center">
          <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
          <span className="text-sm md:text-base">Loading wallet data...</span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className=" ">
            <Filters />
          </div>
          <div className="w-full ">
            {walletData && <NftGallery nfts={walletData.nfts} />}
          </div>
        </div>
      )}
    </div>
  );
}
