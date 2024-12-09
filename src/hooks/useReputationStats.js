import { useAccount, useReadContract } from 'wagmi';
import { abi as stackpointContract } from "../abis/StackPointClaim.json";
import contractConfig from "../configs/contracts.json";
import { formatNumber } from '../utility/formatters';


export function useReputationStats(user_data) {
  const { address } = useAccount();
  
    const { data, isError, isLoading } = useReadContract({
      abi: stackpointContract,
      address: contractConfig.CONTRACT_ADDRESS,
      functionName: "_claimedReputation",
      args: [user_data.accountId],
      query: {
        enabled: !!address,
      },
    });  
 

  const [claimed,lastUpdate] = data || [0n,0n];

  return {
    isLoading,
    isError,
    stats: [
      {
        title: "Total Reputation",
        value: formatNumber(user_data.reputation),
        icon: "Trophy",
      },
      {
        title: "Total Claimed",
        value: formatNumber(claimed),
        icon: "BadgeCheck",
      },
      {
        title: "Available to Claim",
        value: formatNumber(user_data.reputation - formatNumber(claimed)),
        icon: "Award",
      },
    ],
  };
}