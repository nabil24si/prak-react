import { createRoot } from "react-dom/client";

import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworklistSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <FrameworkListSearchFilter/>

        </div>
    )