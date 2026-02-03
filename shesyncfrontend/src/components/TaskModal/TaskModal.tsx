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

    return (
        <div className='overlay' onClick={handleOverlayClick}>
            <div className='modal'>
                <div className="modalHeader">
                    <h2> Create your task</h2>
                    <button type="button" onClick={onClose}> Close</button>
                </div>

                <form className='modalBody' onSubmit={handleSubmit}>

                <div className='modalField'>
                    <label htmlFor='title'>Task Title</label>

                    <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder='i.e Finish Per Scholas Like a Boss!'
                    />
                    
                </div>



                </form>

            </div>
        </div>
    
    )
}