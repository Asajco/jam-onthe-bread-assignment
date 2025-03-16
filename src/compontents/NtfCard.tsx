import { AssetDetails } from "@/app/types/types";
import Image from "next/image";
import React from "react";

const NFTCard = ({ nft }: { nft: AssetDetails }) => {
  const name = nft.onchain_metadata?.name || nft.asset_name || "Unnamed";
  const imageUrl = nft.onchain_metadata?.image;
  const formattedImageUrl = imageUrl?.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${imageUrl.replace("ipfs://", "")}`
    : imageUrl;
  const number = name.split("#")[1];

  return (
    <div className="w-64 border-2 border-gray-200 overflow-hidden bg-white shadow-md">
      <div className="flex justify-between items-center p-2 border-b-2 bg-gray-100">
        <span className="font-black text-lg uppercase">
          {name.split("#")[0]}
        </span>
        <span className="font-black text-lg uppercase">#{number}</span>
      </div>
      <div className="bg-gray-50 p-4 flex justify-center">
        {formattedImageUrl ? (
          <Image
            src={formattedImageUrl}
            alt={name}
            width={220}
            height={220}
            className="rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-56 w-56 bg-gray-300">
            <span className="text-gray-500 font-bold">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
