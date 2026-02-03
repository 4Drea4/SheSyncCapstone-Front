import { useState } from 'react';
import './TaskModal.css';
import type { CreateTaskInput, Task, TaskStatus } from '../../types';
import {createTask} from '../../api/tasks';

type TaskModalProps = {
    projectId:string;
    onClose: () => void;
    onCreated: (task: Task) => void;
}
