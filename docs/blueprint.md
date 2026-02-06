# **App Name**: BhuVision

## Core Features:

- Map Rendering: Render land parcels as interactive polygons on a LeafletJS map, pulling coordinates from the Supabase database.
- Dynamic Color Coding: Visually represent parcel status (matched, mismatched, corrected) using dynamic color coding (Green, Yellow, Red, Blue) on the map.
- Parcel Details Display: Show parcel details (owner, survey number, area, status) in a popup when a polygon is clicked.
- User Profile Management: Allow users to update their profile data (plots, name, contact info) stored in Supabase.
- Search and Discovery: Enable searching for parcels by phone number or name, highlighting the results on the map.
- Mismatch Detection Tool: Generative AI evaluates and flags data discrepancies to enhance system accuracy. This automated tool uses pattern recognition to proactively highlight potential inaccuracies. This function acts as a first step in our gamified correction process.
- Gamified Corrections: Implement a gamified workflow where users earn points, badges, and leaderboard rankings for correcting parcel data on the map.

## Style Guidelines:

- Primary color: Strong blue (#4681C4) inspired by themes of land and mapping to convey trust and clarity.
- Background color: Light gray (#E8E8EA), a softer tone within the blue color family. Provides a muted, neutral backdrop to accentuate dynamic data.
- Accent color: Muted purple (#694F6D), chosen for contrast. To guide the eye without overwhelming other important UI elements, signals areas of interactivity.
- Body and headline font: 'Inter', a sans-serif font with a modern, neutral look suitable for both headlines and body text.
- Use clear, informative icons to represent parcel status and actions.
- Maintain a clean, map-centric layout with intuitive controls and information panels.
- Incorporate smooth transitions and subtle animations for user interactions (e.g., polygon highlighting, data loading).