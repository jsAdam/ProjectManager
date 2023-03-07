import React, { useEffect } from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Projects() {
    const [showCreatePanel, setShowCreatePanel] = React.useState(false);
    const [form, setForm] = React.useState({
        name: "",
        description: "",
        visibility: ""
    });

    const [projects, setProjects] = React.useState([
        {id: 1, title: "Project 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula urna risus, vel imperdiet sapien venenatis vitae. Vestibulum dapibus porta dui, at consequat risus suscipit in. Curabitur dictum tincidunt justo et euismod. Nam non turpis suscipit, rutrum sem in, tristique metus. Integer nunc nisi, tristique vel mauris at, imperdiet pretium dolor."},
        {id: 2, title: "Project 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula urna risus, vel imperdiet sapien venenatis vitae. Vestibulum dapibus porta dui, at consequat risus suscipit in. Curabitur dictum tincidunt justo et euismod. Nam non turpis suscipit, rutrum sem in, tristique metus. Integer nunc nisi, tristique vel mauris at, imperdiet pretium dolor."}
    ]);

    let navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        })
    }

    function openBoard(boardId) {
        navigate("/board", {
            boardId
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const project = { ...form };

        await fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .catch(error => {
            window.alert(error);
            return;
        })
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http:localhost:5000/projects");
        }
    })

    let uiProjects = projects.map((project, idx) => {
        return (<div key={idx} onClick={() => openBoard(project.id)} className="project col-4">
                    <div className="card">
                        <h3 className="card-header p-2">{project.title}</h3>
                        <div className="card-body projects">
                            <p className="card-text p-2">{project.description}</p>
                        </div>
                    </div>
                </div>);
    })

    return (
        <div>
            <div className="cards row p-5">
                <div className="col-4">
                    <button className="btn btn-primary w-100 h-100" onClick={() => setShowCreatePanel(!showCreatePanel)}>Create new project</button>
                </div>
                { uiProjects }
            </div>
            <div className={"modal create-project " + (showCreatePanel ? 'show' : 'hidden')}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowCreatePanel(!showCreatePanel)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group pb-4">
                                    <label className="pb-2">Project Title</label>
                                    <input 
                                        type="text"
                                        className="form-control bg-light"
                                        id="name"
                                        value={form.name}
                                        onChange={(e) => updateForm({ name: e.target.value })}
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="form-group pb-4">
                                    <label className="pb-2">Project Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control bg-light"
                                        id="description"
                                        value={form.description}
                                        onChange={(e) => updateForm({ description: e.target.value })}
                                        placeholder="Description of project"
                                    />
                                </div>
                                <div className="form-group pb-4">
                                    <label className="pb-2">Visibility</label>
                                    <select 
                                        className="form-control bg-light"
                                        id="visibility"
                                        value={form.visibility}
                                        onChange={(e) => updateForm({ visibility: e.target.value })}>
                                        <option>Private</option>
                                        <option>Public</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Create</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowCreatePanel(!showCreatePanel)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}