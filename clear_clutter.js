const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module

// Define file types and their corresponding extensions
const fileTypes = {
    images: ['.jpg', '.png', '.jpeg', '.gif'],
    documents: ['.pdf', '.doc', '.docx', '.txt'],
    archives: ['.zip', '.rar', '.tar', '.gz'],
    others: []
};

// Function to determine the folder name based on the file extension
function getFolderName(ext) {
    for (const folder in fileTypes) {
        if (fileTypes[folder].includes(ext)) {
            return folder; // Return the folder name if the extension matches
        }
    }
    return 'others'; // Default to 'others' if no match is found
}

// Function to organize files in a directory
function organizeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.log('Directory path does not exist.'); // Log an error if the directory does not exist
        return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file); // Get the full path of the file

        if (fs.lstatSync(filePath).isFile()) { // Check if the path is a file
            const ext = path.extname(file); // Get the file extension
            const folderName = getFolderName(ext); // Determine the folder name based on the extension
            const folderPath = path.join(dirPath, folderName); // Create the path to the folder

            // Create the folder if it does not exist
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }

            // Move the file to the appropriate folder
            const destPath = path.join(folderPath, file);
            fs.renameSync(filePath, destPath); // Rename (move) the file to the new location
            console.log(`${file} moved to ${folderName}/`); // Log the file move
        }
    });

    console.log('Directory organized successfully!'); // Log a success message
}

// Define the target directory to organize
const targetDirectory = './testFolder';
organizeDirectory(targetDirectory); // Call the function to organize the directory

// TARGET PATH = cd "C:\Users\HP\OneDrive\Desktop\NODE JS\PROJECTS" 