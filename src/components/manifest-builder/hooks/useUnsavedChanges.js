import { useEffect, useCallback } from 'react';

/**
 * Custom hook for handling unsaved changes
 * @param {boolean} hasUnsavedChanges - Whether there are unsaved changes
 * @param {Function} onBeforeUnload - Optional callback for beforeunload event
 */
const useUnsavedChanges = (hasUnsavedChanges, onBeforeUnload) => {
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnloadEvent = (e) => {
      // Show a confirmation dialog
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      
      // Call the provided callback if any
      if (onBeforeUnload) {
        onBeforeUnload(e);
      }
      
      // For older browsers
      return e.returnValue;
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnloadEvent);

    // Clean up
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnloadEvent);
    };
  }, [hasUnsavedChanges, onBeforeUnload]);

  /**
   * Prompt the user to confirm navigation away with unsaved changes
   * @param {Function} onConfirm - Callback to execute if user confirms
   * @param {Function} onCancel - Callback to execute if user cancels
   * @returns {Promise<boolean>} Whether the user confirmed the navigation
   */
  const confirmNavigation = useCallback(async (onConfirm, onCancel) => {
    if (!hasUnsavedChanges) {
      onConfirm?.();
      return true;
    }

    // In a real app, you might show a custom modal here
    const confirmed = window.confirm(
      'You have unsaved changes. Are you sure you want to leave?'
    );

    if (confirmed) {
      await onConfirm?.();
      return true;
    } else {
      onCancel?.();
      return false;
    }
  }, [hasUnsavedChanges]);

  return { confirmNavigation };
};

export { useUnsavedChanges };
export default useUnsavedChanges;
