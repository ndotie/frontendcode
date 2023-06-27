import MainDashboard from "../components/admin-dashboard";
import ProtectedLayout from "../layouts/protectedLayout";

export default function Dashboard(){
    return <ProtectedLayout title = "Dashboard">
        <MainDashboard />
    </ProtectedLayout>
}