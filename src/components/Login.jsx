import { useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";

function Login() {

  // const navigate = useNavigate();
  const location = useLocation();
const from = location.state?.from || "/claim";
  //code for stackexchange login from chrome extension
  /* const submit = () => {

    const client_id = 29137;
    const scope = "read_inbox,private_info";
    const redirectUrl = chrome.identity.getRedirectURL("oauth2");
    const url = `https://stackoverflow.com/oauth?client_id=${client_id}&scope=${scope}&redirect_uri=${redirectUrl}&state=`;
    chrome.identity
      .launchWebAuthFlow({ url: url, interactive: true })
      .then(async (redirect_url) => {
        const code = redirect_url.match(/.*code=([^&|\n|\t\s]+)/)[1];
         const res = await auth(code)           
         
          if (res.ok) {
              return navigate("/dashboard");
          }
        
      })
      .catch((e) => {
        console.log(e);
      });
    
  }*/

  return (

    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-so-black mb-2">Welcome to StackPoints</h1>
        <p className="text-so-gray-600">Connect your StackExchange account to start earning rewards</p>
      </div>
      
      <a
         href={`https://stackoverflow.com/oauth?client_id=29137&scope=read_inbox,private_info&redirect_uri=http://127.0.0.1:5173/auth&state=${from}`}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-so-orange hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-so-orange transition-colors duration-150 shadow-md"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Login with StackExchange
      </a>
    </div>
  );
}

export default Login;