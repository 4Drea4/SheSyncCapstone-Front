import type { Project } from "../../types";
import './ProjectSelect.css';

type Props = {
projects: Project[];
selectedProjectId: string;
onSelect: (projectId: string) => void;
addNew: () => void;
};

export default function ProjectSelect({
    projects,
    selectedProjectId,
    onSelect,
    addNew,
}: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === '__new__'){
            addNew();
            return;
        }

        onSelect(value);
    };

    return (
        <div className="projectSelect">
            
        </div>
    )
}