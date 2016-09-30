var bio = {
    "name": "Atul Sharma",
    "role": "Full Stack Developer",
    "contacts": {
        "mobile": "+91-9549021503",
        "email": "theatsharma@gmail.com",
        "github": "the-atul-sharma",
        "twitter": "@atulsharma",
        "location": "Bharatpur"
    },
    "welcomeMessage": "Hello!",
    "skills": [
        "Front-End Developer", "Full-Stack Developer", "Software Engineer"
    ],
    "biopic": "images/atul_sharma.jpg",
    display: function() {
        var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
        $("#header").prepend(formattedRole);
        var formattedName = HTMLheaderName.replace('%data%', bio.name);
        $("#header").prepend(formattedName);

        var formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location)
        $("#topContacts").prepend(formattedLocation);
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        $("#topContacts").prepend(formattedTwitter);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        $("#topContacts").prepend(formattedGithub);
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        $("#topContacts").prepend(formattedEmail);
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        $("#topContacts").prepend(formattedMobile);
        $("#footerContacts").prepend(formattedLocation, formattedEmail, formattedMobile, formattedTwitter, formattedGithub);

        var WelcomeMessage = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
        $("#header").append(WelcomeMessage);
        var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
        $("#header").append(formattedPic);

        if (bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);

            bio.skills.forEach(function(skill) {
                formattedskill = HTMLskills.replace("%data%", skill);
                $("#skills").append(formattedskill);
            });
        }
    }
};

var work = {
    "jobs": [{
        "employer": "NIIT",
        "title": "Software Engineer",
        "dates": "Summer 2016",
        "location": "Jaipur",
        "description": `
                    - Worked as a software engineer intern with the technologies like Ruby on rails, AngularJS, ReactJS, MySQL, MEAN Stack.
                    - Learned web development and also learned how to adapt different technologies and libraries.
                `
    }],
    display: function() {
        work.jobs.forEach(function(job) {
            $("#workExperience").append(HTMLworkStart);
            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedEmployerTitle = formattedEmployer + formattedTitle;
            $(".work-entry:last").append(formattedEmployerTitle);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            $(".work-entry:last").append(formattedDates);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
            $(".work-entry:last").append(formattedDescription);
            var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
            $(".work-entry:last").prepend(formattedLocation);
        });
    }
};

var education = {
    "schools": [{
            "name": "Govt Engineering College",
            "degree": "BTech",
            "majors": ['Computer Science'],
            "dates": "August 2013 - April 2017",
            "location": "Bikaner, India",
            "url": "https://www.ecb.ac.in"
        }, {
            "name": "Udacity Front End Nanodegree",
            "degree": "Nannodegree",
            "majors": ['Computer Science'],
            "dates": "August 2013 - April 2017",
            "location": "Mountain View, CA",
            "url": "https://www.udacity.in"
        }

    ],
    "onlineCourses": [{
        "title": "FreeCodeCamp Front End Developement",
        "school": "FreeCodeCamp",
        "dates": "2015-2016",
        "url": "http://freecodecamp.com"
    }],
    display: function() {
        education.schools.forEach(function(school) {
            $("#education").append(HTMLschoolStart);
            var formattedName = HTMLschoolName.replace('%data%', school.name);
            $(".education-entry:last").append(formattedName);
            var formattedDates = HTMLschoolDates.replace('%data%', school.dates);
            $(".education-entry:last").append(formattedDates);
            var formattedLocation = HTMLschoolLocation.replace('%data%', school.location);
            $(".education-entry:last").prepend(formattedLocation);
            var formattedDegree = HTMLschoolDegree.replace('%data%', school.degree);
            $(".education-entry:last").append(formattedDegree);
            var formattedDegree = HTMLschoolMajor.replace("%data%", school.majors);
            $(".education-entry:last").append(formattedDegree);

        });

        education.onlineCourses.forEach(function(course) {
            var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
            $(".education-entry:last").append(formattedTitle);
            var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
            $(".education-entry:last").append(formattedDates);
            var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
            $(".education-entry:last").append(formattedSchool);
            var formattedURL = HTMLonlineURL.replace("%data%", course.url);
            $(".education-entry:last").append(formattedURL);
        });

    }
};

var projects = {
    "projects": [{
        "title": "Student Affair Council Website",
        "dates": "2016",
        "description": "Design and develop a student affair council for students of enginnering college bikaner. Used technologies Mean stack, Materiliaze.",
        "images": ["images/197x148.gif", "images/197x148.gif", "images/197x148.gif"]
    }, {
        "title": "Pomodoro Clock",
        "dates": "2016",
        "description": "This is a material design version of Pomodoro clock. You can use Pomodoro clock for time management and project management. Used technologies angular.js, material design.",
        "images": ["images/197x148.gif", "images/197x148.gif", "images/197x148.gif"]
    }],
    display: function() {
        projects.projects.forEach(function(project) {
            $("#projects").append(HTMLprojectStart);

            var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
            $(".project-entry:last").append(formattedTitle);

            var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
            $(".project-entry:last").append(formattedDates);

            var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
            $(".project-entry:last").append(formattedDescription);

            project.images.forEach(function(image) {
                formattedImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedImage);
            });
        });
    }
};

bio.display();
work.display();
education.display();
projects.display();

$("#mapDiv").append(googleMap);
