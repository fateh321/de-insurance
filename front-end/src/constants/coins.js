export const AUTONITY = {
  name: "Ethereum",
  abbr: "ETH",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};

export const TOKEN_A = {
  name: "Token A",
  abbr: "TA",
  address: "0x1d29BD2ACedBff15A59e946a4DE26d5257447727",
};

export const TOKEN_B = {
  name: "Token B",
  abbr: "TB",
  address: "0xc108a13D00371520EbBeCc7DF5C8610C71F4FfbA",
};

export const TOKEN_C = {
  name: "Token C",
  abbr: "TC",
  address: "0xC8E25055A4666F39179abE06d466F5A98423863F",
};

export const TOKEN_D = {
  name: "Token D",
  abbr: "TD",
  address: "0x23238098F2B4dd9Ba3bb8bc78b639dD113da697e",
};
export const ETHEREUM = {
  isCoin: true,
  isInsurer: false,
  name: "Ethereum",
  abbr: "ETH",
  address: "0x1AeAf2947163119eB36E4d730C1e23e2d6D71072", // Weth address
};
export const BITCOIN = {
  isCoin: true,
  isInsurer: false,
  name: "Bitcoin",
  abbr: "BTC",
  address: "0x1AeAf2947163119eB36E4d730C1e23e2d6D71072", // Weth address
};
export const AVALANCHE = {
  isCoin: true,
  isInsurer: false,
  name: "AVALANCHE",
  abbr: "AVAX",
  address: "0x1AeAf2947163119eB36E4d730C1e23e2d6D71072", // Weth address
};
export const DOGECOIN = {
  isCoin: true,
  isInsurer: false,
  name: "Dogecoin",
  abbr: "DOGE",
  address: "0x1AeAf2947163119eB36E4d730C1e23e2d6D71072", // Weth address
};
export const INSURER = {
  isCoin: false,
  isInsurer: true,
  name: "Insurer",
  abbr: "Provide insurance",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};
export const INSURED = {
  isCoin: false,
  isInsurer: false,
  name: "Insured",
  abbr: "Get insurance",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};
export const CONTR1 = {
  isCoin: false,
  isInsurer: false,
  name: "USDT/USDC < 0.9",
  abbr: "USDT-USDC",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};
export const CONTR2 = {
  isCoin: false,
  isInsurer: false,
  name: "ETH/st-ETH > 1.5",
  abbr: "st-ETH",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};
export const CONTR3 = {
  isCoin: false,
  isInsurer: false,
  name: "ETH/USDT < 900",
  abbr: "ETH-USDT",
  address: "0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", // Weth address
};
export const ALL = [AUTONITY, TOKEN_A, TOKEN_B, TOKEN_C, TOKEN_D];
export const ALLOPTIONS = [INSURED, INSURER];
export const ALLTOKENS = [BITCOIN, ETHEREUM, AVALANCHE, DOGECOIN];
export const ALLCONTRACTS = [CONTR1, CONTR2, CONTR3];
export const ALL_WITHOUT_AUTONITY = [TOKEN_A, TOKEN_B, TOKEN_C, TOKEN_D];
