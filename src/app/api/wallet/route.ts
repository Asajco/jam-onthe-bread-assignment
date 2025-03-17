import { NextRequest, NextResponse } from "next/server";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

type AddressAmount = {
  unit: string;
  quantity: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address parameter is required" },
      { status: 400 }
    );
  }

  const projectId = process.env.BLOCKFROST_PROJECT_ID;

  try {
    const api = new BlockFrostAPI({
      projectId,
      network: "mainnet",
      customBackend: "https://cardano-mainnet.blockfrost.io/api/v0",
    });

    const addressData = await api.addresses(address);
    const nftDetails = await Promise.all(
      (addressData.amount || [])
        .filter((asset: AddressAmount) => asset.unit !== "lovelace")
        .map(async (asset: AddressAmount) => {
          return api.assetsById(asset.unit);
        })
    );

    const result = {
      address,
      balance: {
        lovelace:
          addressData.amount.find((a: AddressAmount) => a.unit === "lovelace")
            ?.quantity || "0",
      },
      nfts: nftDetails,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch wallet data",
        address,
        balance: { lovelace: "0" },
        nfts: [],
      },
      { status: 500 }
    );
  }
}
