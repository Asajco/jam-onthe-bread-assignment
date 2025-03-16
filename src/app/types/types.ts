export type AssetDetails = {
  asset: string;
  policy_id: string;
  asset_name: string | null;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata?: {
    name?: string;
    image?: string;
    description?: string;
    [key: string]: unknown;
  } | null;
  metadata?: {
    [key: string]: unknown;
  } | null;
};

export type WalletData = {
  address: string;
  balance: { lovelace: string };
  nfts: AssetDetails[];
};
