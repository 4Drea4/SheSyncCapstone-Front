import { useState } from 'react';
import "./ProjectModal.css";
import type { CreateProjectInput, Project } from '../../types';
import {createProject } from '../../api/projects';


type ProjectModalProps = {
    onClose: () => void;
    onCreated: (project: Project) => void; 
    
    // dashboard should be able to update and select
};

export default function ProjectModal({onClose, onCreated} :ProjectModalProps) {
    const [form, setForm] = useState<CreateProjectInput>({
        name: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name] : value}));
    }
    
    async function handleSubmit( event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setError("");

        if(!form.name.trim()) {
            setError("You need a project name");
            return;
        }

        try{
            setSaving(true);
            const newProject = await createProject({
                name: form.name.trim(),
                description: form.description?.trim(),
            });
             onCreated(newProject);
             onClose();
        } catch (err:any) {
            setError(err?.response?.data?.message || "Uh-oh we could not create this project")
        } finally{
            setSaving(false);
        }
    }

    function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) onClose();
    }

    return(
         <div className='overlay' onClick={handleOverlayClick}>
            <div className='modal'>
                <div className='modalHeader'>
                    <h2> Create a Project</h2>
                    <button onClick={onClose}>Close</button>
                </div>

                <form className='modalBody' onSubmit={handleSubmit}>
                    {error && <p className="errorText">{error}</p>}

                    <div className='modalField'>
                        <label>Project Name</label>
                        <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Conquer the world in my red bottoms"
                        />
                    </div>
                    <div className='modalField'>
                        <label>Description</label>
                        <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Give me the deets!"
                        />
                    </div>
                    <div className='modalButtons'>
                        <button 
                        type="button"
                        className='secondButton'
                        onClick={onClose}
                        >Cancel</button>

                        <button 
                        type="submit"
                        className="mainButton" disabled={saving}> {saving ? "Creating..." : "Create"}
                       </button>
                    </div>
                </form>
            </div>
         </div>
    );
}