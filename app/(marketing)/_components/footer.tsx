import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

// export default only requires in layouts or pages. not required in individual components
export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      {/* prevent the nav bar content not go beyond maximum page width */}
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        {/* logo hides on mobile. the block on mobile screen justify content in full width */}
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">Privacy Policy</Button>
          <Button size="sm" variant="ghost">Terms of Service</Button>
        </div>
      </div>
    </div>
  );
};
