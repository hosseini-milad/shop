import Cookies from 'universal-cookie';
import env from '../env';
import DashBoardDaily from '../modules/Dashboard/1DashBoardToday';
import DashboardChart from '../modules/Dashboard/2DashBoardCharts';
import DashboardProject from '../modules/Dashboard/3DashBoardProject';
import DashboardOverView from '../modules/Dashboard/4DashBoardOverview';
const cookies = new Cookies();

function Dashboard(){
    const token=cookies.get(env.cookieName)
    return(
    <div class="container-fluid py-4">
        <DashBoardDaily />
        <DashboardChart />
        <div class="row mb-4">
            <DashboardProject />
            <DashboardOverView />
        </div>
    </div>
    )
}
export default Dashboard