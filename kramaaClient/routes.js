import React from 'react';
const Dashboard = React.lazy(() => import('./Dashboard'));
const Profile = React.lazy(() => import('./Profile'));
const Projects = React.lazy(() => import('./Projects'));
const Things = React.lazy(() => import('./Things'));
const Devices = React.lazy(() => import('./Devices'));
const ProjectFormModal = React.lazy(() => import('./ProjectFormModal'));
const UserDatabase = React.lazy(() => import('./UserDatabase'));
// import Dashboard from './Dashboard';
// import Profile from './Profile';
// import Projects from './Projects';
// import Things from './Things';
// import Devices from './Devices';
// import ProjectFormModal from './ProjectFormModal';
import ProjectPage from './ProjectPage';
import ThingPage from './ThingPage';
import DevicePage from './DevicePage';
const routes = [
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/settings', name: 'Settings', component: Profile},
  { path: '/projects', name: 'Projects', component: Projects},
  { path: '/devices', name: 'Devices', component: Devices},
  { path: '/things', name: 'Things', component: Things},
  { path: '/project/:projectID', name: 'ProjectPage', component: ProjectPage},
  { path: '/thing/:thingID', name: 'ThingPage', component: ThingPage},
  { path: '/device/:deviceID', name: 'DevicePage', component: DevicePage},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard},
  { path: '/newProject', name: 'New Project', component: ProjectFormModal},
  { path: '/userDatabase', name: 'User Database', component: UserDatabase},
];

export default routes;
