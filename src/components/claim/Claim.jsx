import { useLoaderData } from "react-router-dom";
import { 
  useWriteContract,  
  
} from "wagmi";
import { abi as stackpointContract } from "../../abis/StackPointClaim.json";
import contractConfig from "../../configs/contracts.json";
import { claimReputation,claimBounty } from "../../utility/api";
//import {   useState } from "react";
//import {formatEther } from "viem";
import { useReputationStats } from "../../hooks/useReputationStats";
import { useRewardStats } from "../../hooks/useRewardStats";
import { ClaimSection } from "./ClaimSection";

function Claim() {
  const user_data = useLoaderData();
  //const { isConnected } = useAccount();
  //const [error, setError] = useState("");
   const { stats: reputationStats, isError: reputationError, isLoading: reputationLoading } = useReputationStats(user_data);
  const { stats: rewardStats, isError: rewardsError, isLoading: rewardsLoading } = useRewardStats(user_data);

  const {
    data: reputationClaimHash,
    error:reputationClaimError,
    writeContract: reputationClaim   
  
  } = useWriteContract();
  const {
    data: rewardClaimHash,
    error: rewardClaimError,
    writeContract: rewardClaim,
  } = useWriteContract();
 /* const {
    data: claimedData,
    error: readError,
    isPending: readPending,
  } = useReadContracts({
    contracts: [
      {
        abi: stackpointContract,
        address: contractConfig.CONTRACT_ADDRESS,
        functionName: "_claimedReputation",
        args: [user_data.accountId],
      },
      {
        abi: stackpointContract,
        address: contractConfig.CONTRACT_ADDRESS,
        functionName: "_claimedBounty",
        args: [user_data.accountId],
      }
    ]
  });
*/

    
 /* const  reputationClaim = async ()=> {
    const res = await claimReputation();
    setError("");
    if (res.error) {
      setError(res.error);     
      return;
    }

    writeContract({
      address: contractConfig.CONTRACT_ADDRESS,
      abi: stackpointContract,
      functionName: "reputationClaim",
      args: [res.acc_id, res.reputation, res.sig],
    });
  }

   const bountyClaim = async () => {
     const res = await claimBounty();
     setError("");
     if (res.error) {
       setError(res.error);
       return;
     }

     writeContract({
       address: contractConfig.CONTRACT_ADDRESS,
       abi: stackpointContract,
       functionName: "bountyClaim",
       args: [res.acc_id, res.amount, res.sig],
     });
   };*/

 const handleClaimReputation = async () => {
  const res = await claimReputation();

   reputationClaim({
     address: contractConfig.CONTRACT_ADDRESS,
     abi: stackpointContract,
     functionName: "reputationClaim",
     args: [res.acc_id, res.reputation, res.sig],
   });

  };

  const handleClaimRewards = async () => {
 const res = await claimBounty();
   rewardClaim({
    address: contractConfig.CONTRACT_ADDRESS,
    abi: stackpointContract,
    functionName: "bountyClaim",
    args: [res.acc_id, res.amount, res.sig],
   });    
    
  };
 
 

  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ClaimSection
        title="Reputation Claims"
        stats={reputationStats}
        buttonText="Claim Reputation"
        onClaim={handleClaimReputation}
        isLoading={reputationLoading}
        error={reputationError ? "Failed to load reputation data" : null}
        claimStatus={
          reputationClaimHash ? "TxHash:" + reputationClaimHash : null
        }
        claimError={
          reputationClaimError
            ? reputationClaimError.shortMessage || reputationClaimError.message
            : null
        }
      />

      <ClaimSection
        title="Reward Claims"
        stats={rewardStats}
        buttonText="Claim Rewards"
        onClaim={handleClaimRewards}
        isLoading={rewardsLoading}
        error={rewardsError ? "Failed to load rewards data" : null}
        claimStatus={rewardClaimHash ? "TxHash:" + rewardClaimHash : null}
        claimError={
          rewardClaimError
            ? rewardClaimError.shortMessage || rewardClaimError.message
            : null
        }
      />
    </div>

    /* <div className="mt64">
      {isConnected ? (
        readError ? (
          <p className="ta-center">
            {readError.shortMessage || readError.message}{" "}
          </p>
        ) : readPending ? (
          <p className="ta-center">Loading...</p>
          ) : (
                        
          <>
            <div className="d-grid grid__3 g16 ji-center mb64">
              <div className="grid--col ta-center">
                <p>Total Reputation: </p>
                <p>{user_data.reputation}</p>
              </div>
              <div className="grid--col ta-center">
                <div>
                  <p>Total claimed:</p>
                  <p>{formatEther(claimedData[0].result[0])}</p>
                </div>
              </div>
              <div className="grid--col ta-center">
                <p>Available to claim:</p>
                <p>
                  {user_data.reputation - formatEther(claimedData[0].result[0])}
                </p>
              </div>
              <div className="grid--col3 ta-center">
                <button
                  className="s-btn s-btn__filled"
                  disabled={writePending}
                  onClick={reputationClaim}
                >
                  {writePending ? "Confirming..." : "Claim Reputation"}
                </button>
              </div>
            </div>
            <div className="d-grid grid__3 g16 ji-center">
              <div className="grid--col ta-center">
                <p>Total Bounty: </p>
                <p>{user_data.total_bounty_reward}</p>
              </div>
              <div className="grid--col ta-center">
                <div>
                  <p>Bounty claimed:</p>
                  <p>{formatEther(claimedData[1].result)}</p>
                </div>
              </div>
              <div className="grid--col ta-center">
                <p>Available to claim:</p>
                <p>
                  {user_data.total_bounty_reward -
                    formatEther(claimedData[1].result)}
                </p>
              </div>
              <div className="grid--col3 ta-center">
                <button
                  className="s-btn s-btn__filled"
                  disabled={writePending}
                  onClick={bountyClaim}
                >
                  {writePending ? "Confirming..." : "Claim Bounty"}
                </button>
              </div>
            </div>
            <div className="d-grid ji-center ">
              <div className="grid--col ta-center">
                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {writeError && (
                  <p className="fc-error bc-error ba bar-sm mt16 p8">
                    Error: {writeError.shortMessage || writeError.message}
                  </p>
                )}
                {error && (
                  <p className="fc-error bc-error ba bar-sm mt8">
                    Error: {error}
                  </p>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <h3 className="grid--col4 ta-center">Connect Wallet first.</h3>
      )}
    </div>*/
  );
}

export default Claim;
