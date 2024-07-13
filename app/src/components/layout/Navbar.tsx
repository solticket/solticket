import { Button } from "../ui/button";
import Logo from "../layout/Logo";

const Navbar = () => {
  return (
    <div className="h-[60px] bg-white w-full justify-between items-center flex px-8 flex-shrink-0 shadow-sm">
      <Logo />
      <div className="flex space-x-2">
        <Button variant={"secondary"}>{"Create Your Event"}</Button>
        <Button>Connect Wallet</Button>
      </div>
    </div>
  );
};

export default Navbar;
