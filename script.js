document.addEventListener("DOMContentLoaded", () => {
	const projects = document.querySelectorAll(".project");
	const projectCircles = document.querySelectorAll(".progress_steps .Circle");
	const prevProjectBtn = document.getElementById("prevProjectBtn");
	const nextProjectBtn = document.getElementById("nextProjectBtn");
	const linkedinBtn = document.getElementById("linkedin");
	const resumeBtn = document.querySelector(".Resume");
	const projectsBtn = document.querySelector(".projects");

	projectsBtn.addEventListener("click", (event) => {
		const targetId = event.currentTarget.dataset.target;
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			event.preventDefault();
			targetSection.scrollIntoView({
				behavior: "smooth",
			});
		}
	});

	resumeBtn.onclick = () => {
		window.open("resume.pdf", "_blank");
	};

	linkedinBtn.onclick = () => {
		window.open(
			"https://www.linkedin.com/in/mohamed-hussein-63b190213",
			"_blank"
		);
	};

	const projectsPerPage = 3;
	let currentPage = 1;
	const totalProjects = projects.length;
	const totalPages = Math.ceil(totalProjects / projectsPerPage);

	function showProjectsForPage(page) {
		if (page < 1) {
			currentPage = totalPages;
		} else if (page > totalPages) {
			currentPage = 1;
		} else {
			currentPage = page;
		}
		projects.forEach((project) => {
			project.classList.remove("visible");
		});
		const projectsToShow = Array.from(projects).filter((project) => {
			return parseInt(project.dataset.page) === currentPage;
		});
		projectsToShow.forEach((project) => {
			project.classList.add("visible");
		});
		projectCircles.forEach((circle) => {
			circle.classList.remove("active");
			if (parseInt(circle.dataset.page) === currentPage) {
				circle.classList.add("active");
			}
		});
	}

	prevProjectBtn.addEventListener("click", (event) => {
		event.preventDefault();
		showProjectsForPage(currentPage - 1);
	});

	nextProjectBtn.addEventListener("click", (event) => {
		event.preventDefault();
		showProjectsForPage(currentPage + 1);
	});

	projectCircles.forEach((circle) => {
		circle.addEventListener("click", (event) => {
			event.preventDefault();
			const pageNum = parseInt(circle.dataset.page);
			showProjectsForPage(pageNum);
		});
	});

	showProjectsForPage(currentPage);
});

document.addEventListener("DOMContentLoaded", () => {
	const navItems = document.querySelectorAll("nav ul li.nav-item[data-target]");
	navItems.forEach((item) => {
		item.addEventListener("click", (event) => {
			const targetId = event.currentTarget.dataset.target;
			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				event.preventDefault();
				targetSection.scrollIntoView({
					behavior: "smooth",
				});
			}
		});
	});
});
