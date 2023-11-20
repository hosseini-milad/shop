import React from "react"
import { rxFindCount } from "../../../env"
import tabletrans from "../../../translate/tables"

function OrderHistory(props){
    const log=props.log
    return(
        <div class="history-box">
        <p>{tabletrans.history[props.lang]}</p>
        <div class="order-progress">
          <div class="progress-step">
            <div class="step-bar">
                {log&&log.map((log,i)=>(
                    <React.Fragment key={i}>
                    <div class="dot dot-green"></div>
                    <div class="dash"></div>
                    </React.Fragment>
                ))}
              
            </div>
            <div class="step-name">
                {log&&log.map((log,i)=>(
                    <React.Fragment key={i}>
                    <p>{log.status}
                    </p>
                    <p>{new Date(log.date).toLocaleDateString('fa') + ' - '+
                    new Date(log.date).toLocaleTimeString('fa')}</p>
                    </React.Fragment>
                ))}
              
            </div>
          </div>
          <div class="order-time">
            <div class="time-info">
              <p>Order time</p>
              <p>19 Oct 2023 1:03 PM</p>
              <p>Payment time</p>
              <p>19 Oct 2023 1:03 PM</p>
            </div>
          </div>
        </div>
      </div>
    )
}
export default OrderHistory