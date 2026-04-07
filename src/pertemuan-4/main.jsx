import { createRoot } from "react-dom/client";
import ResponsiveDesig from "./ResponsiveDesign";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworklistSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <ResponsiveDesig/>
            {/* <FrameworkListSearchFilter/> */}

        </div>
    )