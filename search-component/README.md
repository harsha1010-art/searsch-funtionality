DribbbleSearch React Component
Overview
DribbbleSearch is a React-based search interface component designed to mimic a search bar with tabbed filtering and a toggleable filter menu. It allows users to search for items (e.g., files, people, chats, lists), filter results by category, and toggle filter options to refine the displayed results.
Features

Search Bar: Input field for searching with a "Clear" button and quick access hint.
Tabbed Navigation: Switch between "All," "Files," and "People" tabs to filter results.
Filter Menu: Toggleable menu to enable/disable filters (Files, People, Chats, Lists).
Dynamic Result Filtering: Results update based on active tab and enabled filters.
Loading State: Displays a loading animation during search.
Responsive Design: Styled with Tailwind-inspired CSS for a modern look.

Prerequisites

Node.js (v14 or higher)
npm or yarn
React (v17 or higher)
Lucide React icons (lucide-react package)

Installation

Clone the Repository (or copy the component code):
git clone <repository-url>
cd dribbble-search


Install Dependencies:
npm install

Or, if using yarn:
yarn install


Install Lucide React Icons:
npm install lucide-react


Add CSS:Create a search.css file in the src directory with the following styles (or customize as needed):
.search-box {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.interface {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.interface.open {
  max-height: 600px;
}

.filter-menu {
  position: absolute;
  right: 0;
  top: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 200px;
  z-index: 20;
}

.filter-menu.open {
  display: block;
}

.filter-menu div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.filter-menu div:hover {
  background: #f5f5f5;
}


Include the Component:Import and use DribbbleSearch in your React app (e.g., in App.js):
import DribbbleSearch from './DribbbleSearch';
import './search.css';

function App() {
  return (
    <div>
      <DribbbleSearch />
    </div>
  );
}

export default App;



Usage

Search:

Type in the search bar to trigger the search interface.
Results appear after a brief loading animation (800ms delay).
Click "Clear" to reset the search.


Tabs:

Click "All," "Files," or "People" tabs to filter results by category.
The "All" tab shows results from all enabled filters.


Filter Menu:

Click the Settings icon to open the filter menu.
Toggle filters (Files, People, Chats, Lists) to enable/disable result types.
Results update dynamically based on enabled filters and the active tab.
Click outside the menu to close it.


Results:

Results are filtered based on enabled filters and the active tab.
Each result displays an icon (avatar for people, custom icons for files/videos/folders) and details.



Component Details

State Management:

searchQuery: Tracks the search input.
activeTab: Tracks the selected tab ("All," "Files," "People").
isSearching: Controls the loading animation.
showInterface: Toggles the expanded search interface.
showResults: Displays search results.
showFilterMenu: Toggles the filter menu.
filters: Manages filter options and their enabled state.


Filter Logic:

Filters map to result types (e.g., Files → ["file", "video", "folder"], People → ["person"]).
Results are filtered based on enabled filters and the active tab.
If a tab is selected (e.g., "People"), only results for that filter's types are shown if the filter is enabled.


Event Handling:

Toggle clicks use event.stopPropagation() to prevent the filter menu from closing.
Overlay clicks close the filter menu.



Known Limitations

Static Data: The searchResults and tabs counts are hardcoded. To make counts dynamic, compute them based on filtered results:const tabs = [
  { name: "All", count: filteredResults.length },
  { name: "Files", count: filteredResults.filter((r) => ["file", "video", "folder"].includes(r.type)).length },
  { name: "People", count: filteredResults.filter((r) => r.type === "person").length },
];


No Chats/Lists Results: The sample data includes only person, file, video, and folder types. Add corresponding data to test "Chats" and "Lists" filters.
CSS Dependency: The component requires search.css for styling. Ensure it’s included and compatible with your app.

Troubleshooting

Filter Menu Closes on Toggle:
Ensure event.stopPropagation() is applied in the toggleFilter function and filter menu container.
Check the z-index of .filter-menu (should be higher than the overlay’s z-0).


Toggles Don’t Update:
Verify the filters state updates in toggleFilter (use console.log(filters)).
Ensure the filter menu uses option.enabled for toggle styling.


Results Not Filtering:
Log filteredResults to confirm the filtering logic.
Check that filters types match searchResults types.


CSS Issues:
Confirm search.css includes styles for .search-box, .interface, .filter-menu, and toggle switches.



Contributing
Contributions are welcome! Please submit a pull request or open an issue for bug reports, feature requests, or improvements.
License
This project is licensed under the MIT License.
