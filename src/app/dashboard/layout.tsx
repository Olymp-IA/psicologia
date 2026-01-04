import DashboardPage from './page';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}
