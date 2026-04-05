# School-website
One-page school demo website — Rudra Tech Solutions Internship Task


**Code Explanation:**

The project is a fully responsive one-page school demo website built using only HTML, CSS, and JavaScript — no frameworks used.

**HTML (index.html):**
The page is divided into 7 clearly structured sections — Header, Hero, About, Director's Message, Admissions, Enquiry Form, and Contact. Semantic HTML5 tags like header, section, and footer are used throughout for clean structure and readability.

**CSS (style.css):**
All colors, fonts, and spacing are defined using CSS variables at the top for easy consistency. CSS Grid is used for two-column layouts (About, Director, Form, Contact sections) and Flexbox is used for navigation, buttons, and stat bars. Smooth scroll reveal animations are done using opacity and transform transitions triggered by a JavaScript class. Three responsive breakpoints (1024px, 768px, 480px) ensure the site works perfectly on mobile, tablet, and desktop.

**JavaScript (script.js):**
Smooth scrolling is handled by a reusable function that calculates section position with a header offset. An IntersectionObserver watches sections to highlight the active navigation link as the user scrolls. A second IntersectionObserver triggers the scroll reveal animations. The hamburger menu opens and closes the mobile navigation with body scroll lock. The enquiry form uses custom validation — name must be 3+ characters, mobile is validated using a 10-digit Indian number regex, and class selection is required. On successful submission a loading state is shown followed by a success message. Stat counters in the hero section animate from zero to their final value when first visible on screen.
