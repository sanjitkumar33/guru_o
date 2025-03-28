import React from "react";
import './Dfooter.css';
const packageJson = require('../../package.json');
function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year
    let versionToDisplay = "unknown";
    try {
        versionToDisplay = packageJson.version; // Assuming VERSION is globally defined, e.g., through a bundler
    } catch (error) {
        console.log("Cannot get version of application.");
    }
    return (
        <div>
            <footer className="mt-5 footer">
                <div className="bg-grey h-theme d-flex flex-row mx-0">
                    <p className="mt-3 mx-auto">Copyright © {currentYear}. All Rights Reserved. | {` Version: ${versionToDisplay}`}</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
