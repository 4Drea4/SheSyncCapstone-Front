import { useEffect, useState} from 'react';
import { getProjects} from '../../api/projects';
import type { Project } from '../../types'; 
import ProjectSelect from '../../components/ProjectSelect/ProjectSelect';

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const  [showProjectModal, setShowProjectModal] = useState(false);
useEffect(()=> {
    async function load(){
        const data = await getProjects();
        setProjects(data);

    }
    load();
},[]);

    return (
        <div>
            <ProjectSelect
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelect={setSelectedProjectId}
            addNew={()=> setShowProjectModal(true)}
            />
            {showProjectModal && (
                // i didnt create the project modal yet
                <button onClick={()=> setShowProjectModal(false)}>Close This</button>
            )}
        </div>
    )
}