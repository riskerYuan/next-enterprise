import { AppKitNetwork, arbitrum, base, mainnet, optimism, polygon } from "@reown/appkit/networks"
import { sepolia } from "@reown/appkit/networks"

const chains: AppKitNetwork[] = [mainnet, arbitrum, base, polygon, optimism]

if (process.env.NODE_ENV !== "production") chains.push(sepolia)

export const networks = chains
