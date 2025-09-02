# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React video player application that displays videos in a responsive grid layout. The application features:

- Dynamic video grid that adapts based on the number of videos (1-2 videos: horizontal layout, 3-4 videos: 2x2 grid, 5+ videos: 4-column grid)
- Support for both URL-based videos (embedded iframes) and local video files
- Floating Action Button (FAB) for adding new videos
- Modal popup for video input (URL or file upload)
- Responsive design that maintains 16:9 aspect ratio
- Auto-play and loop functionality for videos

When working on this project:

- Use modern React hooks (useState, useEffect, useCallback)
- Follow React best practices for component organization
- Maintain the original styling and UX patterns
- Use CSS modules or styled-components for styling
- Keep components modular and reusable
