import React, { createContext, useContext, useEffect, useState } from 'react';
import mockCourses from '../data/mockCourses.json';
import mockUsers from '../data/mockUsers.json';
import mockCategories from '../data/mockCategories.json';

const storageKeys = {
  user: 'levelup-user',
  courses: 'levelup-courses',
  users: 'levelup-users',
  categories: 'levelup-categories',
};

const AuthContext = createContext();

const loadState = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveState = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const initialProgress = {};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadState(storageKeys.user, null));
  const [courses, setCourses] = useState(() => loadState(storageKeys.courses, mockCourses));
  const [users, setUsers] = useState(() => loadState(storageKeys.users, mockUsers));
  const [categories, setCategories] = useState(() => loadState(storageKeys.categories, mockCategories));

  useEffect(() => {
    saveState(storageKeys.courses, courses);
  }, [courses]);

  useEffect(() => {
    saveState(storageKeys.users, users);
  }, [users]);

  useEffect(() => {
    saveState(storageKeys.categories, categories);
  }, [categories]);

  useEffect(() => {
    saveState(storageKeys.user, user);
  }, [user]);

  const login = ({ email, password }) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!existing) return { success: false, error: 'auth.unknownEmail' };
    if (!existing.active) return { success: false, error: 'auth.accountDisabled' };
    if (existing.password !== password) return { success: false, error: 'auth.invalidLogin' };
    setUser(existing);
    return { success: true };
  };

  const register = ({ name, email, password }) => {
    const already = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (already) return { success: false, error: 'auth.emailInUse' };
    const nextUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'learner',
      active: true,
      enrolledCourses: [],
      progress: initialProgress,
      avatar: null,
    };
    const nextUsers = [nextUser, ...users];
    setUsers(nextUsers);
    setUser(nextUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const manageEnrollment = (courseId) => {
    if (!user) return;
    const enrolled = user.enrolledCourses || [];
    const already = enrolled.includes(courseId);
    const nextEnrolled = already
      ? enrolled.filter((id) => id !== courseId)
      : [...enrolled, courseId];
    const nextProgress = { ...user.progress };
    if (!already) nextProgress[courseId] = 0;
    const updated = { ...user, enrolledCourses: nextEnrolled, progress: nextProgress };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const updateProgress = (courseId, value) => {
    if (!user) return;
    const nextProgress = { ...user.progress, [courseId]: value };
    const updated = { ...user, progress: nextProgress };
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const addCourse = (course) => {
    setCourses((prev) => [{ ...course, id: `course-${Date.now()}` }, ...prev]);
  };

  const updateCourse = (courseId, course) => {
    setCourses((prev) => prev.map((item) => (item.id === courseId ? { ...item, ...course } : item)));
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const toggleUserActive = (userId) => {
    setUsers((prev) => prev.map((item) => (item.id === userId ? { ...item, active: !item.active } : item)));
  };

  const changeUserRole = (userId, role) => {
    setUsers((prev) => prev.map((item) => (item.id === userId ? { ...item, role } : item)));
  };

  const addCategory = (name) => {
    setCategories((prev) => [{ id: `category-${Date.now()}`, name }, ...prev]);
  };

  const removeCategory = (categoryId) => {
    setCategories((prev) => prev.filter((item) => item.id !== categoryId));
  };

  const value = {
    user,
    courses,
    users,
    categories,
    login,
    logout,
    register,
    updateProfile,
    manageEnrollment,
    updateProgress,
    addCourse,
    updateCourse,
    deleteCourse,
    toggleUserActive,
    changeUserRole,
    addCategory,
    removeCategory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
