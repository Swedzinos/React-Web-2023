import DashboardForm from "./DashboarForm.js";
import "../css/dashboard.css";


const Dashboard = () => {

    return (
        <>
            <section className="dashboard-container">
                <DashboardForm sectionName="Miejsce" apiEndpoint="places" />
                <DashboardForm sectionName="Użytkownik" apiEndpoint="users" />
                <DashboardForm sectionName="Kategoria" apiEndpoint="categories" />
            </section>
        </>
    );
}


export default Dashboard;