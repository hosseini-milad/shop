import StyleInput from "../../components/Button/Input"

function CustomerXtra(props){
    const def = props.def
    return(
        <div className="card-input">
                <StyleInput title={"تاریخ تولد"} direction={"rtl"} 
                class="userInput" defaultValue={def?def.birthDay:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                    birthDay:e
                }))}/>
                <StyleInput title={"سایز لباس"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.clothSize:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  clothSize:e
                }))}/>
                <StyleInput title={"تلفن ثابت"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.call:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  call:e
                }))}/>
                <StyleInput title={"تلفن اضطراری"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.urgCall:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  urgCall:e
                }))}/>
                <StyleInput title={"تلفن افراد مرتبط"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.contractCall:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  contractCall:e
                }))}/>
                <StyleInput title={"وب سایت"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.website:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  website:e
                }))}/>
                <StyleInput title={"منطقه"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.zone:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  zone:e
                }))}/>
                <StyleInput title={"ساعت کاری"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.workTime:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  workTime:e
                }))}/>
                </div>
    )
}
export default CustomerXtra