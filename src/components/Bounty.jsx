import { useLoaderData } from "react-router-dom";
import  { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useWalletClient,
} from "wagmi";

import { abi as stackpointContract } from "../abis/StackPointClaim.json";
import contractConfig from "../configs/contracts.json";
import { parseEther, zeroAddress } from "viem";
import { Coins } from "lucide-react";
import { usePermit } from "../utility/wagmiPermit";

function Bounty() {
  const { bounty_code } = useLoaderData();
  const [amount, setAmount] = useState("20");
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { signPermit } = usePermit({
    walletClient,
    ownerAddress: walletClient?.account.address ?? zeroAddress,
    chainId: walletClient?.chain.id,
    spenderAddress: contractConfig.CONTRACT_ADDRESS, // vitalik.eth
    contractAddress: contractConfig.TOKEN_ADDRESS, // STP(stackpoint) on base-sepolia    
   
  });
  
  
  const {
    data: hash,
    error: writeError,
    writeContract,
    isPending: writePending,
    isError
  } = useWriteContract();

  

  const approvePermit = async () => {

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 100000);
    const signature = await signPermit({
      walletClient,
      deadline: deadline,
      value: parseEther(amount)
    });

  

    writeContract({
      account: walletClient.account.address,
      abi: stackpointContract,
      address: contractConfig.CONTRACT_ADDRESS,
      functionName: "placeBounty",
      args: [
        bounty_code,
        parseEther(amount),
        deadline,
        signature.v,
        signature.r,
        signature.s,
      ],
    });
  }
  
 

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });


  return (
    <div>
      {isConnected ? (
        bounty_code ? (
          <>
            <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md border border-so-gray-300">
              <h2 className="text-2xl font-bold text-so-black mb-6 text-center">
                Place a Bounty
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-so-gray-700 mb-2"
                  >
                    Token Amount (STP)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="block w-full pr-12 sm:text-sm border-so-gray-300 rounded-md focus:ring-so-blue-500 focus:border-so-blue-500 pl-4 py-2"
                      placeholder="0.0"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-so-gray-500 sm:text-sm">STP</span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={writePending}
                  onClick={approvePermit}
                  className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-so-blue-500 hover:bg-so-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-so-blue-500"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  {writePending ? "Confirming..." : "Place Bounty"}
                </button>
              </div>

              <div className="font-bold text-so-black mt-6 text-center">
                {hash && !isConfirmed && <div>Transaction Hash: {hash}</div>}
                {isConfirming && !isConfirmed && (
                  <div>Waiting for confirmation...</div>
                )}
                {isConfirmed && <div>Transaction confirmed: {hash}</div>}
                {isError && (
                  <p className="fc-error bc-error ba bar-sm mt16 p8">
                    There are some unknown error please check explorer for more
                    details.
                  </p>
                )}
                {writeError && (
                  <p className="fc-error bc-error ba bar-sm mt16 p8">
                    Error: {writeError.shortMessage || writeError.message}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <h3 className="grid--col4 ta-center">Connect Wallet first.</h3>
      )}
    </div>
  );


}

export default Bounty;
