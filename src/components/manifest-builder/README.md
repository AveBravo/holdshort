# Manifest Builder Component

A flexible and extensible drag-and-drop manifest builder for React applications.

## Features

- 🧩 Modular block-based architecture
- 🖱️ Drag-and-drop interface
- 📱 Responsive design
- 🎨 Customizable blocks
- 🔄 Undo/Redo support
- 💾 Auto-save functionality
- ♿ Accessible UI components

## Installation

```bash
npm install @your-org/manifest-builder
# or
yarn add @your-org/manifest-builder
```

## Usage

```jsx
import { ManifestBuilder } from '@your-org/manifest-builder';

function App() {
  const handleNavigate = (route) => {
    // Handle navigation
    console.log('Navigating to:', route);
  };

  return (
    <div className="app">
      <ManifestBuilder onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
```

## Available Blocks

- **Flight Data**: Display flight information
- **Input Sign**: Signature input field
- **Seat Map**: Visual seat layout
- **Weight Balance**: Weight and balance calculations
- **Two Columns**: Create side-by-side layouts

## Custom Blocks

You can create custom blocks by extending the existing components:

1. Create a new block component in `BlockRenderer/BlockTypes/`
2. Add it to the `MANIFEST_BLOCKS` object in `utils/blockUtils.js`
3. Import and add it to the `BlockRenderer` switch statement

## Styling

The component uses Tailwind CSS for styling. You can customize the look by overriding the default styles in your project's CSS.

## API

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onNavigate | Function | Yes | Callback for navigation events |
| initialBlocks | Array | No | Initial blocks to load |
| onSave | Function | No | Callback when the manifest is saved |
| onUpdate | Function | No | Callback when the manifest is updated |

### Hooks

- `useManifestState`: Manage manifest state
- `useDragAndDrop`: Handle drag and drop functionality
- `useUnsavedChanges`: Track and handle unsaved changes

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

MIT
