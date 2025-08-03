document.addEventListener("DOMContentLoaded", () => {
	const projects = document.querySelectorAll(".project");
	const projectCircles = document.querySelectorAll(".progress_steps .Circle");
	const prevProjectBtn = document.getElementById("prevProjectBtn");
	const nextProjectBtn = document.getElementById("nextProjectBtn");
	const linkedinBtn = document.getElementById("linkedin");
	const resumeBtn = document.querySelector(".Resume");
	const projectsBtn = document.querySelector(".projects");
	const navItems = document.querySelectorAll("nav ul li.nav-item[data-target]");
	const sectionsToReveal = document.querySelectorAll(
		".container > section, .statisticsVid, .main-footer"
	);
	const individualItemsToReveal = document.querySelectorAll(
		".project, .certification"
	);
	const statisticsVidTextAndButtons = document.querySelectorAll(
		".statisticsVid .text-on-vid h1, .statisticsVid .text-on-vid h4, .statisticsVid .buttons"
	);

	const revealOnScroll = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	};

	const sectionObserver = new IntersectionObserver(revealOnScroll, {
		root: null,
		threshold: 0.1,
	});
	const itemObserver = new IntersectionObserver(revealOnScroll, {
		root: null,
		threshold: 0.05,
	});

	sectionsToReveal.forEach((section) => {
		sectionObserver.observe(section);
	});
	individualItemsToReveal.forEach((item) => {
		itemObserver.observe(item);
	});
	statisticsVidTextAndButtons.forEach((item) => {
		itemObserver.observe(item);
	});

	projectsBtn.addEventListener("click", (event) => {
		const targetId = event.currentTarget.dataset.target;
		const targetSection = document.getElementById(targetId);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth" });
		}
	});

	resumeBtn.addEventListener("click", () => {
		window.open("Resume.pdf", "_blank");
	});
	linkedinBtn.addEventListener("click", () => {
		window.open(
			"https://www.linkedin.com/in/mohamed-hussein-63b190213",
			"_blank"
		);
	});
	navItems.forEach((item) => {
		item.addEventListener("click", (event) => {
			const targetId = event.currentTarget.dataset.target;
			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				targetSection.scrollIntoView({ behavior: "smooth" });
			}
		});
	});

	const projectsPerPage = 3;
	let currentPage = 1;
	const totalProjects = projects.length;
	const totalPages = Math.max(
		...Array.from(projects).map((p) => parseInt(p.dataset.page))
	);

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
		const projectsToShow = Array.from(projects).filter(
			(project) => parseInt(project.dataset.page) === currentPage
		);
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

	const currentYearSpan = document.getElementById("current-year");
	if (currentYearSpan) {
		currentYearSpan.textContent = new Date().getFullYear();
	}
});
