DribbbleSearch React Component

Overview

DribbbleSearch is a React-based search interface component designed to simulate a search bar with tabbed navigation and a toggleable filter menu. It allows users to search for items (e.g., files, people, chats, lists), filter results by category using tabs, and toggle filter options to refine the displayed results.

Features

Search Bar: Input field with a "Clear" button and a quick access hint.

Tabbed Navigation: Switch between "All," "Files," and "People" tabs to filter results.

Filter Menu: Toggleable menu to enable/disable filters (Files, People, Chats, Lists).

Dynamic Result Filtering: Results update based on the active tab and enabled filters.

Loading State: Displays a loading animation during search.

Responsive Design: Styled with Tailwind-inspired CSS for a modern look.

Repository

The source code for this project is available on GitHub: git@github.com:harsha1010-art/searsch-funtionality.git

Prerequisites

Node.js (v14 or higher)

npm or yarn

React (v17 or higher)

Lucide React icons (lucide-react package)

Git (for cloning the repository)

How to Install

Follow these steps to set up and run the DribbbleSearch component locally:

Clone the Repository: Clone the project from GitHub using the SSH URL:

git clone git@github.com:harsha1010-art/searsch-funtionality.git cd searsch-funtionality

Alternatively, use the HTTPS URL if SSH is not configured:

git clone https://github.com/harsha1010-art/searsch-funtionality.git cd searsch-funtionality

Install Dependencies: Install the required npm packages:

npm install

Or, if using yarn:

yarn install

Install Lucide React Icons: Install the lucide-react package for icons used in the component:

npm install lucide-react

Or, with yarn:

yarn add lucide-react

Add Component and CSS: Create the following files in your project’s src directory:

LIVE Link : https://polite-sable-b7145b.netlify.app/

DribbbleSearch.jsx: Contains the main component code.

search.css: Contains the styling for the component.
