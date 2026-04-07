import { createRoot } from "react-dom/client";
import FrameworkList from "./Frameworklist";
import './tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <FrameworkList/>

        </div>
    )