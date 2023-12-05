"use strict";
// Latest blog posts
const blogPostsContainer = document.querySelector('.blog_posts');
const response = await fetch(
  'https://blog.shahryartayeb.com/api/featured-posts'
);
const posts = await response.json();

posts.forEach((post) => {
  // insert into the page
  const blogPostMarkup = `
<li>
    <a href="https://blog.shahryartayeb.com/post/${post.slug}">
      ${post.title}
    </a>
</li>
`;
  blogPostsContainer.insertAdjacentHTML('afterbegin', blogPostMarkup);
});


// I wish I could have used ES6 extravaganza, but not everyone supports it :(
let r = document.getElementById("rbw"),
  currentHue = 0,
  hueAddition = 5,
  documentElement = document.getElementsByTagName("html")[0],
  clickEvent = "ontouchstart" in window ? "touchend" : "click",
  classMethods = ["remove", "add"],
  rainbowTiming = 1000 / 25,
  stringArray = ["Add more contrast", "Remove additional contrast", "Inverted mode", "Normal mode"];

function createControls() {
  let contrastButton = document.createElement('button');
    contrastButton.id = "contrast";
    contrastButton.classList.add('cont-inv');
    contrastButton.innerText = stringArray[0];
    contrastButton.tabIndex = 1;

  let nightModeButton = document.createElement('button');
    nightModeButton.id = "invmode";
    nightModeButton.classList.add('cont-inv');
    nightModeButton.innerText = stringArray[2];
    nightModeButton.tabIndex = 2;
  document.body.appendChild(contrastButton);
  document.body.appendChild(nightModeButton);
}

function doThatFuckingColorThing() {
  let color = "hsl(" + currentHue + ", 80%, 60%)",
    nextHue = currentHue + hueAddition;
  currentHue = nextHue > 360 ? 0 : nextHue;
  r.style.color = color;
  setTimeout(doThatFuckingColorThing, rainbowTiming);
}

function someControl(id, textArr, className) {
  /* You see? No fucking jQuery needed, check:
   * http://www.vanilla-js.com/
   * http://jsperf.com/getelementbyid-vs-jquery-id/44
   */
  let el = document.getElementsByTagName("html")[0];
  let acbox = document.getElementById(id),
    textNode = acbox.firstChild,
    toggled = false;
  acbox.addEventListener(
    clickEvent,
    function() {
      let selector = Number((toggled = !toggled));
      textNode.data = textArr[selector];
      el.classList[classMethods[selector]](className);
    },
    false
  );
}

function addContrastControl() {
  someControl(
    "contrast",
    [stringArray[0], stringArray[1]],
    "contrast"
  );
}

function addInvertedControl() {
  someControl("invmode", [stringArray[2], stringArray[3]], "inverted");
}

createControls();
doThatFuckingColorThing();
addContrastControl();
addInvertedControl();
