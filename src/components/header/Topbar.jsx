//import { WalletBalance } from "./WalletBalance";
import { ProfileMenu } from "./ProfileMenu";

export function TopBar() {
  return (
   <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16 space-x-4">   
            <appkit-button />
            <ProfileMenu />
          </div>
        </div>
      </div>
   
  );
}
