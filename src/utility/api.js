
//const token = localStorage.getItem("token");


export const auth = async(code) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const res = await fetch("http://0.0.0.0:3000/api/auth", {
          method: "post",
          headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify({ code: code }),
      });
        if (!res.ok) {
           throw new Error("authentication failed");
      }
      const json = await res.json();
      localStorage.setItem("token", json.access_token);
      localStorage.setItem("accountId", json.accountId);
        
    }

    return { ok: true };
    
};

export const fetchDashboard = async () => {
const { token ,accountId} = JSON.parse(localStorage.getItem("stackpoint"));
    
  const res = await fetch("http://0.0.0.0:3000/api/dashboard", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
    
    if (!res.ok)
    {
      localStorage.removeItem("stackpoint");
      return res.ok;
    } 
    
     const json = await res.json();
     return {
       ok: res.ok,
       accountId,
       reputation: json.reputation,
       total_bounty_reward: json.total_bounty_reward,
     };
    
       
   
};
 

export const fetchBountyRewards = async () => {
 const { token } = JSON.parse(localStorage.getItem("stackpoint"));
 
  const res = await fetch("http://0.0.0.0:3000/api/dashboard/bountyRewards", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    localStorage.removeItem("stackpoint");
    return res.ok;
  }

  const json = await res.json();
  return {
    ok: res.ok,
    data: json   
  };
};

export const claimReputation = async () => {
  const { token } = JSON.parse(localStorage.getItem("stackpoint"));
  const res = await fetch("http://0.0.0.0:3000/api/dashboard/claimReputation", {
    method: "post",
    headers: {     
        authorization: `Bearer ${token}`,      
    }
  });
  const json = await res.json();
  return json;
};

export const claimBounty = async () => {
  const { token } = JSON.parse(localStorage.getItem("stackpoint"));
  const res = await fetch("http://0.0.0.0:3000/api/dashboard/claimBounty", {
    method: "post",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

export default {
  fetchDashboard,
  auth,
  claimReputation,
  claimBounty
};