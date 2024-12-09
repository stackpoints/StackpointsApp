import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,  
  RouterProvider
} from "react-router-dom";


import "@stackoverflow/stacks/dist/css/stacks.min.css";
//import "@stackoverflow/stacks/dist/js/stacks.min.js";
import contractConfig from "./configs/contracts.json";


import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia } from "@reown/appkit/networks";
import { WagmiAdapter  } from "@reown/appkit-adapter-wagmi";
import { WagmiProvider } from "wagmi";
import AllRoutes from './components/extras/AllRoutes.jsx';

import "./index.css";


// 0. Setup queryClient
const queryClient = new QueryClient();


// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "712d8abb82dbb8eea3812e184777a9b7";
// 2. Create wagmiConfig
const metadata = {
  name: 'StackPoint',
  description: 'Rewarding StackExchange community with web3.',
  url: 'http://localhost:5371', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks: [baseSepolia],
  projectId,
});


// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseSepolia],
  metadata,
  features: {
    socials: false
  }, 
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#b86464",
  },
  tokens: {
    "eip155:84532": {
      address: contractConfig.TOKEN_ADDRESS,
    },
  },
});


const router = createBrowserRouter( 
   AllRoutes()
);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig} >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
