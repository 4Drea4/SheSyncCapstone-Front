import { useState } from 'react';
import "./ProjectModal.css";
import type { CreateProjectInput, Project } from '../../types';
import {createProject } from '../../api/projects';

type ProjectModalProps = {
    onClose: () => void;

}