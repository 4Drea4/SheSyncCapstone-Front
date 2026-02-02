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

        if (value === 'new-project'){
            addNew();
            return;
        }
        onSelect(value);
    };

    return (
        <div className="projectSelect">
            <label className="projectSelectLabel" htmlFor="projectSelect">
                Pick your project
            </label>

            <select
            id="projectSelect"
            className="pickProjectSelect"
            value={selectedProjectId}
            onChange={handleChange}
            >
                <option value="" disabled>
                    Select your project!
                </option>
            {projects.map((p)=>(
                <option key={p._id} value={p._id}>
                {p.name}
            </option>
            ))}
            <option value="new-project">Create a new project + </option>
            </select>
        </div>
    )
}