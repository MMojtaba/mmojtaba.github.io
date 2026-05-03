const projectInfos = [];
let selectedProject = 0;

function init() {
  const teamerinoAngular = {
    title: "Teamerino Angular",
    descr:
      "A complete remake of my Teamerino website, which allows people to find teams, be it for sports, gaming, or work. Made using Angular, Express, and MongoDB.",
    github: "https://github.com/MMojtaba/teamerino-angular",
    video: "https://www.youtube.com/embed/KohGEGpYfQk",
    thumbnail: "./assets/teamerinoAngular/img1.jpeg",
  };
  projectInfos.push(teamerinoAngular);

  const paintingsAngularJS = {
    title: "Paintings Display",
    descr:
      "Website for displaying paintings. Made using AngularJS, Express, and MongoDB.",
    github: "https://github.com/MMojtaba/paintings-angularjs",
    video: "https://www.youtube.com/embed/_dd8cADE_Po",
    thumbnail: "./assets/paintingsAngularJS/img1.jpeg",
  };
  projectInfos.push(paintingsAngularJS);

  const bcTransitFriend = {
    title: "BC Transit Friend",
    descr: "An iOS SwiftUI app that shows bus locations in real time.",
    github: "https://github.com/MMojtaba/BCTransitFriend",
    video: "https://www.youtube.com/embed/cJwXFYQCWJc",
    thumbnail: "./assets/bcTransitFriend/img1.jpeg",
  };
  projectInfos.push(bcTransitFriend);

  const taskManagerNextjs = {
    title: "Task Governor",
    descr:
      "A basic todo list website made using NextJS, shadcn/ui, and MongoDB.",
    github: "https://github.com/MMojtaba/task-manager-nextjs",
    video: "https://www.youtube.com/embed/f5IbSDRAgnA",
    thumbnail: "./assets/taskGovernor/img1.jpeg",
  };
  projectInfos.push(taskManagerNextjs);

  const snakeEvolution = {
    title: "Snake Evolution",
    descr: "The Snake game made using C++ and OpenGL.",
    github: "https://github.com/MMojtaba/snake_evolution",
    video: "https://www.youtube.com/embed/BZs0yAohxcM",
    thumbnail: "./assets/snakeEvolution/img1.jpeg",
  };
  projectInfos.push(snakeEvolution);

  const teamerinoOriginal = {
    title: "Teamerino Original",
    descr:
      "The initial version of my Teamerino website made using React (JavaScript), Asp.Net Core (C#), and MySQL.",
    github: "https://github.com/MMojtaba/teamerino",
    video: "https://www.youtube.com/embed/9s1vI-6Zo6U",
    thumbnail: "./assets/teamerinoOriginal/img1.jpeg",
  };
  projectInfos.push(teamerinoOriginal);

  setTimeout(() => {
    createProjectSelectButtons(projectInfos);
    handleSelectProject(selectedProject, false);
  });
}

window.addEventListener(
  "load",
  () => {
    init();

    // To disable auto switch when clicking the youtube video
    window.focus();
    window.addEventListener(
      "blur",
      () => setTimeout(() => clearAutoSwitch(), 0),
      { once: true },
    );
  },
  { once: true },
);

// Switch the shown project in an interval
const intervalFuncId = setInterval(function () {
  selectedProject++;
  if (selectedProject >= projectInfos.length) selectedProject = 0;
  handleSelectProject(selectedProject, false);
}, 5000);

function clearAutoSwitch() {
  clearInterval(intervalFuncId);
}

// Changes the shown project when the user clicks one
function handleSelectProject(index, userAction = true) {
  // Stop auto switching if user selects a project
  if (userAction) clearAutoSwitch();

  selectedProject = index;

  playSwitchAnimation();

  //   Changes which element is set as active in the list of project
  changeSelectedList();

  //   Set title
  const titleElement = document.getElementById("main-title");
  if (titleElement)
    titleElement.textContent = projectInfos[selectedProject]?.title;

  //   Set Description
  const descrElement = document.getElementById("main-descr");
  if (descrElement)
    descrElement.textContent = projectInfos[selectedProject]?.descr;

  //   Set Github link
  const githubElement = /** @type {HTMLAnchorElement} */ (
    document.getElementById("main-link")
  );
  if (githubElement) githubElement.href = projectInfos[selectedProject]?.github;

  //   Set Media
  const videoElement = document.getElementById("main-video");
  if (!videoElement) return;

  const videoSource = projectInfos[selectedProject]?.video;
  const imageSource = projectInfos[selectedProject]?.image;
  if (videoSource) {
    // Set the video source if exists
    replaceTag(videoElement, "iframe", videoSource);
  } else if (imageSource) {
    // Set the image source if exists
    replaceTag(videoElement, "img", imageSource);
  }
}

// Replaces the given element by a similar element, but with a different HTML tag
function replaceTag(element, newTag, newSource) {
  // Don't need to replace the tag
  if (element.tagName === newTag.toUpperCase()) {
    element.src = newSource;
    return;
  }

  // Replace the tag
  const newElement = document.createElement(newTag);
  newElement.id = element.id;
  newElement.className = element.className;
  newElement.src = newSource;

  if (newTag === "img") newElement.style.height = "auto";
  else if (newTag === "iframe") newElement.setAttribute("allowfullscreen", "");
  element.parentNode.replaceChild(newElement, element);
}

// Changes the style of the selected project
function changeSelectedList() {
  for (let i = 0; i < projectInfos.length; ++i) {
    const element = document.getElementById("proj-" + i);
    if (!element) continue;
    if (i === selectedProject) element.classList.add("selected-element");
    else element.classList.remove("selected-element");
  }
}

// Animates switching the selected project
function playSwitchAnimation() {
  const selectedContainerElement = document.getElementById(
    "selected-project-container",
  );
  if (selectedContainerElement) {
    selectedContainerElement.classList.add("switch-animation");
    setTimeout(
      () => selectedContainerElement.classList.remove("switch-animation"),
      600,
    );
  }
}

/** Creates the project select list */
function createProjectSelectButtons(projects) {
  const projectListContainer = document.getElementsByClassName(
    "proj-list-container",
  )?.[0];
  if (!projectListContainer) {
    console.error("Project list element not found");
    return;
  }

  for (const [index, project] of projects.entries()) {
    /** @type {HTMLImageElement} */
    const imgEl = document.createElement("img");
    imgEl.id = `proj-${index}`;
    imgEl.classList.add("media", "media-list");
    imgEl.src = project.thumbnail;
    imgEl.onclick = () => handleSelectProject(index);
    projectListContainer.appendChild(imgEl);
  }
}
