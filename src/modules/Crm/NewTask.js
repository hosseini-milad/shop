function NewTask(){
    return(
    <div className="task-popup">
        <div className="nt-header">
        <h4>Create New Task</h4>
        </div>
        <div className="nt-wrapper">
        <div className="nt-col-1">
            <div className="title-input center">
            <input type="text" placeholder="Add Task title"/>
            </div>
            <div className="note-input center">
            <label for="text-display">Add Task notes</label>
            <textarea></textarea>
            </div>
            <div className="list-input center">
            <h6>Checklist</h6>
            <div className="list-wrapper">
                <div className="list-member">
                <i className="fa-solid fa-pause fa-sm" style={{color: "#c0c0c0"}}></i>
                <div className="white-circle"></div>
                <p>list 1</p>
                <div className="member-btn-wrapper">
                    <i className="fa-regular fa-calendar fa-sm" style={{color: "#c0c0c0"}}></i>
                    <i className="fa-solid fa-user-plus fa-sm" style={{color: "#c0c0c0"}}></i>
                    <i className="fa-solid fa-x fa-sm" style={{color: "#c0c0c0"}}></i>
                </div>
                </div>
            </div>
            <div className="add-list-wrapper">
                <i className="fa-solid fa-pause fa-sm" style={{color: "#c0c0c0"}}></i>
                <div className="add-list-input">
                <div className="white-circle"></div>
                <input type="text"/>
                </div>
                <i className="fa-solid fa-x fa-xs"></i>
            </div>
            <div className="add-list-btn">
                <i className="fa-solid fa-circle-plus fa-lg" ></i>
                <p>Add Checklist</p>
            </div>
            </div>
            <div className="assign-input">
            <i className="fa-solid fa-user-plus avatar" style={{color: "#ffffff"}}></i>
            <div className="assign-wrapper">
                <p>Assigned to</p>
                <p>Unassigned <span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
            </div>
            <div className="assign-menu">
                <h6>Select Section</h6>
                <input type="search" name="" id="" placeholder="Search..."/>
                <p>To Do</p>
                <p>Doing</p>
                <p>QA</p>
                <p>Done</p>
            </div>
            </div>
            <div className="file-input">
            <input type="file" name="" id="file"/>
            <label for="file">
                <i className="fa-solid fa-paperclip" style={{color: "#c0c0c0"}}></i>
                <p>Add Attachment</p>
            </label>
            </div>
            <div className="nt-btn-wrapper">
            <p>Clear</p>
            <div className="nt-btns center">
                <div className="cancel-btn center">
                <p>Cancel</p>
                </div>
                <div className="create-btn center">
                <p>Create</p>
                </div>
            </div>
            </div>
        </div>
        <div className="nt-col-2">
            <div className="prob-wrapper">
            <i className="fa-regular fa-calendar" style={{color: "#c0c0c0"}}></i>
            <div className="prob-title">
                <p>Start date</p>
                <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
            </div>
            </div>
            <div className="prob-wrapper">
            <i className="fa-regular fa-calendar" style={{color: "#c0c0c0"}}></i>
            <div className="prob-title">
                <p>Due date</p>
                <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
            </div>
            </div>
            <div className="prob-wrapper">
            <i className="fa-regular fa-clock" style={{color: "#c0c0c0"}}></i>
            <div className="prob-title">
                <p>Reminder</p>
                <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
            </div>
            </div>
            <div className="prob-wrapper">
            <i className="fa-solid fa-right-left rotate" style={{color: "#c0c0c0"}}></i>
            <div className="prob-title">
                <p>Priority</p>
                <p>None<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
            </div>
            </div>
            <div className="prob-wrapper">
            <i className="fa-solid fa-tag" style={{color: "#c0c0c0"}}></i>
            <div className="prob-title">
                <p>Tags</p>
                <p>No Tags added<span><i className="fa-solid fa-plus fa-2xs"></i></span></p>
            </div>
            </div>
            <div className="prob-wrapper">
            <i className="fa-solid fa-repeat" style={{color: "#c0c0c0"}}></i>
            <p>Repeat Task</p>
            </div>
        </div>
        </div>
    </div>
    )
}
export default NewTask