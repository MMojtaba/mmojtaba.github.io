const projectInfos = [];
let selectedProject = 0;

const paintingsAngularJS = {
  title: "Paintings Display",
  descr:
    "Website for displaying paintings. Made using AngularJS, Express, and MongoDB.",
  github: "https://github.com/MMojtaba/paintings-angularjs",
  video: "https://www.youtube.com/embed/_dd8cADE_Po",
};
projectInfos.push(paintingsAngularJS);

const snakeEvolution = {
  title: "Snake Evolution",
  descr: "The Snake game made using C++ and OpenGL.",
  github: "https://github.com/MMojtaba/snake_evolution",
  video: "https://www.youtube.com/embed/BZs0yAohxcM",
};
projectInfos.push(snakeEvolution);

const teamerinoAngular = {
  title: "Teamerino Angular (coming soon...)",
  descr:
    "A complete remake of my Teamerino website, which allows people to find teams, be it for sports, gaming, or work. Made using Angular (TypeScript), Express (TypeScript), and MongoDB.",
  site: "NA",
  image: "./assets/teamerinoAngular/img1.png",
};
projectInfos.push(teamerinoAngular);

const teamerinoOriginal = {
  title: "Teamerino Original",
  descr:
    "The initial version of my Teamerino website made using React (JavaScript), Asp.Net Core (C#), and MySQL.",
  github: "https://github.com/MMojtaba/teamerino",
  image: "./assets/teamerinoOriginal/img1.png",
};
projectInfos.push(teamerinoOriginal);

// Changes the shown project when the user clicks one
function handleSelectProject(index) {
  selectedProject = index;

  //   Set title
  const titleElement = document.getElementById("main-title");
  if (titleElement)
    titleElement.textContent = projectInfos[selectedProject]?.title;

  //   Set Description
  const descrElement = document.getElementById("main-descr");
  if (descrElement)
    descrElement.textContent = projectInfos[selectedProject]?.descr;

  //   Set Github link
  const githubElement = document.getElementById("main-link");
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
  if (element.tagName === newTag) return;

  // Replace the tag
  const newElement = document.createElement(newTag);
  newElement.id = element.id;
  newElement.className = element.className;
  newElement.src = newSource;

  if (newTag === "img") newElement.style.height = "auto";
  else if (newTag === "iframe") newElement.setAttribute("allowfullscreen", "");
  element.parentNode.replaceChild(newElement, element);
}
