import { useEffect, useState } from "react";
import TaskMainPart from "./Tasks/TaskMainPart";
import env from "../../env";
import StyleSelect from "../../components/Button/AutoComplete";
import StyleDatePicker from "../../components/Button/DatePicker";
import StyleDatePickerSingle from "../../components/Button/DatePickerSingle";
import TaskUpload from "./Tasks/TaskUpload";
import { Autocomplete, TextField } from "@mui/material";

function TaskPopUp(props) {
  const [data, setData] = useState(props.data);
  const token = props.token;
  const [content, setContent] = useState();
  useEffect(() => {
    const postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: data ? data._id : "" }),
    };
    fetch(env.siteApi + "/panel/user/taskData", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setContent(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const updateTotal = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ ...data, crmId: props.crm ? props.crm._id : "" }),
    };
    fetch(env.siteApi + "/panel/crm/update-tasks", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
          } else {
            props.setBoardArray(result.taskData);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <section className="delete-modal">
      <div className="modal-backdrop show-modal">
        <div className="task-popup">
          <div className="nt-header">
            <h4>{props.title}</h4>
            <div className="assign-input">
              <i className="fa-solid fa-user-plus avatar" style={{color: "#ffffff"}}></i>
              <div className="assign-wrapper" style={{flexDirection: "initial"}}>
                  <StyleSelect title={"Profile To"}
                  options={content?content.profileList:[]} label="profileName" 
                  defaultValue={(content&&content.currentAssign)?
                      content.currentAssign:''}
                  direction={props.direction}
                  action={(e)=>setData(prevState => ({
                      ...prevState,
                      profile:e?e._id:''
                  }))}/>
                  <StyleSelect title={"Assigned To"}
                  options={content?content.user:[]} label="username" 
                  defaultValue={(content&&content.currentUser)?
                      content.currentUser:''}
                  direction={props.direction}
                  action={(e)=>setData(prevState => ({
                      ...prevState,
                      assign:e?e._id:''
                  }))}/>
              </div>
            </div>

          </div>
          <div className="nt-wrapper">
            {content ? (
              <TaskMainPart
                data={data}
                setData={setData}
                crm={props.crm}
                taskStep={props.taskStep}
                content={content}
                setContent={setContent}
                direction={props.direction}
                btnText={"بروزرسانی"}
                action={props.action}
                close={props.close}
              />
            ) : (
              <>{env.loader}</>
            )}
            <div className="nt-col-2">
              <div className="prob-wrapper">
                <i
                  className="fa-solid fa-calendar"
                  style={{ color: "#c0c0c0" }}
                ></i>
                <div className="prob-title">
                  <StyleDatePickerSingle
                    title={"زمان اجرا"}
                    class="filterComponent"
                    direction={"rtl"}
                    local={"fa"}
                    defaultValue={data ? data.dueDate : ""}
                    action={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        dueDate: e,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="prob-wrapper">
                <i
                  className="fa-solid fa-sort"
                  style={{ color: "#c0c0c0" }}
                ></i>
                <div className="prob-title">
                  <StyleSelect
                    title={"اولویت"}
                    options={["بالا", "متوسط", "کم"]}
                    direction={props.direction}
                    defaultValue={
                      data && data.priority ? data.priority : "متوسط"
                    }
                    action={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        priority: e,
                      }))
                    }
                  />
                </div>
              </div>
              <TaskUpload
                defaultValue={data && data.attach ? data.attach : ""}
                action={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    attach: e,
                  }))
                }
              />
              
            </div>
            
          </div>
          <div className="nt-btn-wrapper">
            <div class="wrapper">
                <div
                  className="create-btn-task center-task"
                  onClick={() => (updateTotal(), props.close())}
                >
                  <p>{props.btnText}</p>
                </div>
                <div className="nt-btns center-task">
                  <div
                    className="cancel-btn-task center-task"
                    onClick={() => props.close()}
                  >
                    <p>انصراف</p>
                  </div>
                </div>
            </div>
            <div className="filler"></div>

          </div>
        </div>
      </div>
    </section>
  );
}
export default TaskPopUp;
