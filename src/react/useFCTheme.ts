import { useCallback } from 'react';
import { ThemeManagerPlugin } from '../core/theme-manager';
import { FlexaCoreEngine } from '../core/engine';

// Giả sử bạn đã khởi tạo engine và themeManager ở ngoài (singleton)
declare const flexaCoreEngine: FlexaCoreEngine;
declare const themeManager: ThemeManagerPlugin;

export function useFCTheme() {
  // Đổi theme
  const applyTheme = useCallback((theme: string) => {
    themeManager.applyTheme(theme);
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    themeManager.toggleTheme();
  }, []);

  // Lấy theme hiện tại
  const getCurrentTheme = useCallback(() => {
    return themeManager.getCurrentTheme();
  }, []);

  // Lấy danh sách theme
  const getAllThemes = useCallback(() => {
    return themeManager.getAllThemes();
  }, []);

  return {
    applyTheme,
    toggleTheme,
    getCurrentTheme,
    getAllThemes
  };
} 