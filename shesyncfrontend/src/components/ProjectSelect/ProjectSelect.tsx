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


            </select>
        </div>
    )
}