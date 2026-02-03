import { useState } from 'react';
import './TaskModal.css';
import type { CreateTaskInput, Task, TaskStatus } from '../../types';
import {createTask} from '../../api/tasks';

type TaskModalProps = {
    projectId:string;
    onClose: () => void;
    onCreated: (task: Task) => void;
}

export default function TaskModal({projectId, onClose, onCreated}: TaskModalProps) {
    const [form, setForm] = useState<CreateTaskInput>({
        title:"",
        description:"",
        status:"todo",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
    ){
        const { name, value} = event.target ;

        setForm((prev) => ({
          ...prev,
          [name] : value,  
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if(!form.title.trim()) {
            setError("Give your task a title!");
            return;
        }
        try {
            setSaving(true);

        const newTask = await createTask(projectId, {
            title: form.title.trim(),
            description: form.description?.trim(),
            status: form.status,
        });
        onCreated(newTask);
        onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Uh oh we could not create a the task");
        } finally {
            setSaving(false);
        }
    }
    function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) onClose();
    }

    
}