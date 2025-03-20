document.addEventListener("DOMContentLoaded", () => {
    // Dynamically update copyright year and last modified date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;

    // Responsive menu functionality
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Courses array (update completed courses)
    const courses = [
        { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
        { subject: 'WDD', number: 231, title: 'Frontend Web Dev I', credits: 2, completed: false }
    ];

    function displayCourses(filteredCourses) {
        const coursesContainer = document.getElementById("courses-container");
        coursesContainer.innerHTML = ""; // Clear previous content
    
        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
    
            if (course.completed) {
                courseCard.classList.add("completed");
            } else {
                courseCard.classList.add("not-completed");
            }
    
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <p>${course.title}</p>
            `; // Removed the credits display line
    
            coursesContainer.appendChild(courseCard);
        });
    
        // Update total credits dynamically
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        document.getElementById("total-credits").textContent = `Total Credits: ${totalCredits}`;
    }
    
    function filterCourses(category) {
        let filteredCourses;

        if (category === 'all') {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(course => course.subject === category);
        }

        displayCourses(filteredCourses);
    }

    // Attach event listeners to filter buttons
    document.getElementById("btn-all").addEventListener("click", () => filterCourses('all'));
    document.getElementById("btn-cse").addEventListener("click", () => filterCourses('CSE'));
    document.getElementById("btn-wdd").addEventListener("click", () => filterCourses('WDD'));

    // Load all courses by default
    filterCourses('all');
});
