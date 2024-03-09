import QuickActions from "./QuickActions"
import QuickTable from "./QuickTable"
import QuickTotal from "./QuickTotal"

function QuickCartHolder(){
    return(
    <section className="admin-table-sec ">
        <QuickTable />
        <div className="product-table-btn-wrapper">
          <QuickActions />
          <QuickTotal />

        </div>

      </section>
    )
}
export default QuickCartHolder