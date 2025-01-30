// Gemini Api

let heading = "";
let jobSuggestionsDisplayContainer = document.getElementById("jobSuggestionsDisplayContainer");
jobSuggestionsDisplayContainer.style.display='none';
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyB2Y3nbcY_evC_H-k2sCjo5MkF7pn7InXE";
const genAI = new GoogleGenerativeAI(API_KEY);
let prompt = "";

async function Search(prompt, heading) {
    showLoader(); // Show loader when starting the search
    jobSuggestionsDisplayContainer.style.display='none';
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Await the text extraction
        console.log(text);
        
        const md = window.markdownit(); 
        const htmlContent = md.render(text);

        // Clear previous content and add heading
        jobSuggestionsDisplayContainer.innerHTML = `<h1 id="jobSuggestionsDisplayContainerHeading" class="text-2xl font-bold text-blue-600">${heading}</h1><br>${htmlContent}`;
        jobSuggestionsDisplayContainer.style.justifyContent = "center";
        jobSuggestionsDisplayContainer.style.display='block';
    } catch (error) {
        console.error("Error fetching job suggestions:", error);
        jobSuggestionsDisplayContainer.innerHTML = "<p>Error fetching job suggestions. Please try again later.</p>";
        jobSuggestionsDisplayContainer.style.display='block';
    } finally {
        hideLoader(); // Hide loader after content is loaded
    }
}

function showLoader() {
    const loader = document.getElementById('loadingSpinner');
    loader.style.display='block';
}

function hideLoader() {
    const loader = document.getElementById('loadingSpinner');
    loader.style.display='none';
}

document.getElementById("jobSuggestionButton").addEventListener("click", () => {
    prompt = "";
    let skills_dsp = document.querySelectorAll(".skills-items .preview-item .preview-item-val");
    heading = "Jobs Suggestion :-";
    skills_dsp.forEach(element => {
        prompt = prompt + element.innerHTML + " ";
    });
    prompt += " jobs suggestions with reference links";
    Search(prompt, heading);
    console.log(prompt);
});

document.getElementById("roadmapSuggestionButton").addEventListener("click", () => {
    prompt = "";
    jobSuggestionsDisplayContainer.style.display='none';
    heading = "RoadMap with how you can enhance your skills :-";
    let skills_dsp = document.querySelectorAll(".skills-items .preview-item .preview-item-val");
    skills_dsp.forEach(element => {
        prompt = prompt + element.innerHTML + " ";
    });
    prompt += " Advance roadMap with these skills";
    Search(prompt, heading);
    console.log(prompt);
});
