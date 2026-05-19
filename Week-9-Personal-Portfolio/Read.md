# 🚀 My Logic-Driven JavaScript Project

This project focuses on building a fast, interactive web interface using pure **Vanilla JavaScript**. Instead of relying on heavy frameworks, all the features, animations, and tab filtering are driven by clean, custom JS logic.

---

## 🧠 Key Features & JavaScript Logic

Here is how the JavaScript works behind the scenes to power this project:

### 1️⃣ Dynamic Navigation (Scrollspy)
* **The Logic:** The script listens to the page `scroll` event. 
* **How it works:** It uses `getBoundingClientRect()` to check the position of each section. If a section is active on the screen, its corresponding link in the navigation bar lights up in purple (`rgb(99,102,241)`), and goes back to normal when you scroll away.

### 2️⃣ Dynamic Project Filtering (Tabs)
* **The Logic:** A clean filtering system for the portfolio sections.
* **How it works:** When you click on any category button (Websites, Apps, Design, or E-commerce), the script loops through the project elements using `forEach` and dynamically adds or removes the `hidden` class to show only the selected projects instantly.

### 3️⃣ Testimonials Carousel (Slider)
* **The Logic:** A custom responsive slider built from scratch.
* **How it works:** It calculates the width of the cards dynamically using `offsetWidth` and updates the `translateX` property to slide them. It also recalculates boundaries on window `resize` so it never breaks on mobile or desktop screens.

### 4️⃣ Appearance Customizer (Fonts & Theme Colors)
* **The Logic:** A central settings panel to customize the website look.
* **Dark Mode:** Toggles the `.dark` class on the root element with a single click.
* **Font Changer:** Changes the entire website font by updating `document.body.style.fontFamily` based on the clicked option.
* **Color Palettes:** Maps custom theme colors dynamically using CSS variables (`--color-primary`, `--color-secondary`), allowing the user to change the website look instantly, with a **Reset** button to return everything to default.

---

## 🛠️ Built With

* **HTML5:** For the layout and custom `data-*` attributes.
* **Vanilla JavaScript (ES6):** For 100% of the interactive logic and DOM control.
* **CSS Variables:** To bridge the JavaScript theme choices with the visual design.