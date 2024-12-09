


import {
  useAccount,
usePublicClient
 
} from "wagmi";
import { abi as stackpointContract } from "../abis/StackPointClaim.json";
import contractConfig from "../configs/contracts.json";
import { formatEther  } from "viem";
import { useEffect, useState } from "react";

import { Clock, Coins } from "lucide-react";
import { formatTimeAgo } from "../utility/dateUtils";

function BountyHistory() {
  const { isConnected, address } = useAccount();
  const client = usePublicClient();
  const [eventLogs, setEventLogs] = useState([]);
  useEffect(() => {
    isConnected
      ? client
        .getBlock()
        .then((block) => {
          return client.getContractEvents({
            address: contractConfig.CONTRACT_ADDRESS,
            abi: stackpointContract,
            eventName: "BountyUpdate",
            args: {
              addrFrom: address,
            },
            fromBlock: block.number - 10000n,
            toBlock: block.number,
          });
        })
        .then((logs) => {
          const eventData = [];
          console.log(logs);
          logs.forEach((l) => {
            eventData.push({
              bountyId: l.args.objId,
              addrFrom: l.args.addrFrom,
              amount: formatEther(l.args.amount),
              timestamp: new Date(parseInt(l.args.timestamp) * 1000),
            });
          });

          setEventLogs(eventData);
        })
        .catch((e) => {
          console.log(e);
        })
      : setEventLogs([]);
  }, [isConnected, client, address]);
    
  
  
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-so-gray-300">
        <div className="px-6 py-4 border-b border-so-gray-300 bg-so-gray-100">
          <h2 className="text-xl font-semibold text-so-black">
            Bounty History
          </h2>
        </div>

        <div className="divide-y divide-so-gray-200">
          {eventLogs.map((e, i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between hover:bg-so-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-so-blue-100 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-so-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-so-black">
                    Bounty #{e.bountyId}
                  </p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-so-gray-400 mr-1" />
                    <p className="text-sm text-so-gray-500">
                      {formatTimeAgo(e.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-so-black">
                  {e.amount} STP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
 
}

export default BountyHistory;