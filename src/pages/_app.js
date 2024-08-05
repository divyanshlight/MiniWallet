import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "../../Context/WalletContext";
import { Awaiter } from "../../Components/Awaiter/Awaiter";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          activeChain="https://mainnet.mode.network"
          clientId="d6ef10249a89a4eb7e73297feaaafbcb"
        >
          <Awaiter />
          <Component {...pageProps} />
        </ThirdwebProvider>
      </QueryClientProvider>
    </WalletProvider>
  );
}
