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

    )
}