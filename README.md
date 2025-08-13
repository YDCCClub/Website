# Yerrabi District Cricket Club Website

This repository contains the source code for the official website of the Yerrabi District Cricket Club (YDCC). The website is designed to be a central hub for players, members, and supporters, providing easy access to club information, news, and resources.

## Features

- **Homepage:** A welcoming landing page with a hero section, club overview, and sponsor highlights.
- **About Us:** Detailed information about the club's history, mission, and values.
- **Teams:** Information on the various teams within the club.
- **News & Events:** The latest news, match reports, and upcoming events.
- **Contact:** Easy-to-find contact information and a contact form.
- **Responsive Design:** The website is fully responsive and optimized for viewing on all devices, including desktops, tablets, and mobile phones.

## Getting Started

To get a local copy up and running, follow these simple steps.
and do some work yourself

### Prerequisites



### Installation & Running

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/YDCC.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd YDCC
    ```

3.  **Start the local development server:**

    The website is static and can be served using Python's built-in HTTP server.

    ```sh
    python -m http.server 8000
    ```

4.  **View the website:**

    Open your web browser and go to `http://localhost:8000`.

## Technologies Used

-   **HTML5:** For the structure and content of the website.
-   **CSS3:** For styling and layout, using modern features like Flexbox and Grid.
-   **JavaScript:** For interactive elements and functionality.
-   **Font Awesome:** For icons used throughout the site.
-   **Google Fonts:** For custom typography.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## 1. Project Overview

This repository contains the official website for the Yerrabi District Cricket Club (YDCC), also known as the Yerrabi Devils. The website is designed to be a welcoming, informative, and professional digital hub for prospective players, parents, members, and sponsors.

The primary goals of this website are:
- To attract new players and families from the Gungahlin region by providing clear information about our junior cricket programs.
- To foster a strong sense of community and reflect the club's welcoming, inclusive ethos.
- To provide up-to-date news, team information, and contact details.
- To serve as a central point for registrations and official communications.

---

## 2. Technical Specifications

This is a modern, high-performance static website built with a focus on clean code, accessibility, and search engine optimization.

- **Core Technologies:**
  - HTML5
  - CSS3 (with Custom Properties for theming)
  - JavaScript (ES6) for DOM manipulation (e.g., mobile navigation)

- **Dependencies & Libraries:**
  - **Fonts:** [Google Fonts](https://fonts.google.com/) (specifically the 'Lato' family).
  - **Icons:** [Font Awesome](https://fontawesome.com/) for a consistent and accessible icon set.

- **Hosting:**
  - The site is fully static and can be deployed on any modern static hosting provider (e.g., Netlify, Vercel, GitHub Pages, AWS S3).

---

## 3. Key Features

- **Fully Responsive Design:** The layout adapts seamlessly to all screen sizes, from mobile phones to desktop monitors.
- **Performance Optimized:** Uses modern techniques like `preconnect` and `preload` to ensure fast load times.
- **SEO Enhanced:** 
  - **Meta Tags:** Comprehensive `meta`, `Open Graph` (for Facebook/social sharing), and `Twitter Card` tags on every page.
  - **Structured Data (JSON-LD):** Site-wide structured data implementation (`SportsClub`, `AboutPage`, `ContactPage`, etc.) to provide rich context to search engines like Google, improving discoverability and search result appearance.
- **Engaging & Strategic Content:** The website copy has been professionally written to be welcoming, informative, and aligned with the club's community-focused values.
- **Clear Calls to Action (CTAs):** Prominent and consistent buttons and links guide users towards key actions, such as registering or learning more about programs.
- **Accessible:** Built with semantic HTML and ARIA attributes to ensure it is usable by as many people as possible.

---

## 4. File Structure

The project follows a standard, easy-to-navigate structure:

```
/
├── css/
│   └── style.css         # Main stylesheet
├── images/
│   └── ...               # All images, logos, and assets
├── js/
│   └── main.js           # Main JavaScript file for interactivity
├── about.html
├── contact.html
├── index.html            # Homepage
├── join.html
├── news.html
├── teams.html
└── README.md
```

---

## 5. How to Run Locally

No complex build process is required. To view the website locally:

1.  Clone or download this repository.
2.  Navigate to the project directory.
3.  Open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Edge).

--- 

This documentation provides a clear and comprehensive overview of the Yerrabi District Cricket Club website.

---

## Photo Gallery Management

The website features a dynamic photo gallery on `gallery.html` that is managed entirely through local files and a Python script. You do not need to edit any HTML or JavaScript directly to update the gallery.

### How It Works

1.  **Album Folders:** Each photo album is simply a folder located in the `images/Albums/` directory.
2.  **Update Script:** The Python script `update_gallery.py` scans these folders and automatically generates the configuration file that the website uses to display the albums.
3.  **Configuration File:** The script creates/updates `js/album-config.js`, which is a JavaScript file containing a list of all your albums and the paths to their images.

### How to Add a New Album

1.  **Create a New Folder:** Inside the `images/Albums/` directory, create a new folder. The name you give this folder will become the album's name on the website (e.g., `My New Album`).
2.  **Add Photos:** Copy all the photos for the new album into the folder you just created.
3.  **Run the Update Script:** Open a terminal in the project's root directory and run the following command:
    ```sh
    python update_gallery.py
    ```

That's it! The script will add your new album to the configuration, and it will appear on the gallery page.

### How to Change an Album's Name

1.  **Rename the Folder:** In the `images/Albums/` directory, simply rename the folder of the album you wish to change.
2.  **Run the Update Script:** Run `python update_gallery.py` again to apply the name change to the website.

### How to Set the Main Album Image (Thumbnail)

The script automatically looks for an image named `Thumbnail` to use as the album's cover photo.

1.  **Navigate to the Album Folder:** Go into the specific album's folder (e.g., `images/Albums/My New Album/`).
2.  **Rename Your Chosen Image:** Find the photo you want to use as the cover and rename it to `Thumbnail.jpg` (or `.png`, `.jpeg`, etc.).
    *   If you already have a file named `Thumbnail.jpg`, rename it to something else first.
3.  **Run the Update Script:** Run `python update_gallery.py` to make the website use your new thumbnail.
