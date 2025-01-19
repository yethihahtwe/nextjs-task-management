import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// export default only requires in layouts or pages. not required in individual components
export const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            {/* prevent the nav bar content not go beyond maximum page width */}
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                {/* logo hides on mobile. the block on mobile screen justify content in full width */}
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="outline" asChild>
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">Get Taskify for free</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}