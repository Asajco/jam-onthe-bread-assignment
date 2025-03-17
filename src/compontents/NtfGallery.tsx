import React, { useState } from "react";
import NFTCard from "./NtfCard";
import { AssetDetails } from "@/app/types/types";
import { LuSettings2 } from "react-icons/lu";

type NftGallery = {
  nfts: AssetDetails[];
};

const NtfGallery = ({ nfts }: NftGallery) => {
  const [type, setType] = useState<string>("type1");

  if (nfts.length === 0) {
    return <p className="text-center py-10">No NFTs found in this wallet.</p>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between p-4 gap-4">
        <div className="flex md:flex-row gap-2 items-center">
          <p
            onClick={() => setType("type1")}
            className={`p-4 font-bold ${
              type === "type1" ? "bg-black text-white " : "bg-gray-200"
            }`}
          >
            TYPE 1
          </p>
          <p
            onClick={() => setType("type2")}
            className={`p-4 font-bold ${
              type === "type2" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            TYPE 2
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className=" bg-gray-300 rounded-md p-2"
          />
          <LuSettings2
            size={40}
            className="border-2 border-gray-300 rounded-md p-[6px]"
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-black" />
      <div className="flex flex-wrap items-center justify-center md:justify-center gap-6 p-4">
        {nfts.map((nft) => (
          <NFTCard key={nft.asset} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NtfGallery;
