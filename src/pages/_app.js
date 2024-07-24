import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { WalletProvider } from "../../Context/WalletContext";
import { Awaiter } from "../../Components/Awaiter/Awaiter";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

  return (
    <ThirdwebProvider
      clientId="d6ef10249a89a4eb7e73297feaaafbcb"
    >
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <Awaiter />
   
          <Component {...pageProps} />
        </QueryClientProvider>
      </WalletProvider>
    </ThirdwebProvider>
  );
}
