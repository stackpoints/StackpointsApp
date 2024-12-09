import { useAccount, useReadContract } from 'wagmi';
import { abi as stackpointContract } from "../abis/StackPointClaim.json";
import contractConfig from "../configs/contracts.json";
import { formatEther } from 'viem';


export function useRewardStats(user_data) {
  const { address } = useAccount();

  const { data, isError, isLoading } = useReadContract({
          abi: stackpointContract,
        address: contractConfig.CONTRACT_ADDRESS,
        functionName: "_claimedBounty",
         args: [user_data.accountId],
        query: {
      enabled: !!address,
    }          
  });

  const claimed = data || 0n;

  return {
    isLoading,
    isError,
    stats: [
      {
        title: "Total Rewards",
        value: `${user_data.total_bounty_reward} STP`,
        icon: "Coins",
      },
      {
        title: "Rewards Claimed",
        value: `${formatEther(claimed)} STP`,
        icon: "CircleDollarSign",
      },
      {
        title: "Available to Claim",
        value: `${user_data.total_bounty_reward - formatEther(claimed)} STP`,
        icon: "Star",
      },
    ],
  };
}