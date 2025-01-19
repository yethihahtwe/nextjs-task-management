import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <ClerkProvider
        appearance={{
            layout: {
                termsPageUrl: 'https://clerk.com/terms',
                unsafe_disableDevelopmentModeWarnings: true,
            }
        }}>
            {children}
        </ClerkProvider>
    );
};

export default PlatformLayout;