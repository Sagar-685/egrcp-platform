# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# e-GRCP — Enterprise Governance, Risk, Compliance & Procurement Platform

## Live Demo
[Deploy URL here after Vercel deployment]

## GitHub Repo
[Your GitHub URL here]

## Tech Stack
- React 19 + Vite
- Redux Toolkit + Redux Persist
- React Router DOM v6
- Axios (with interceptors)
- React Hook Form + Yup
- Material UI + Recharts
- Jest + React Testing Library

## Setup Instructions
```bash
npm install
npm run dev
```

## Demo Login
- **Admin:** alice@company.com / admin123
- **Manager:** bob@company.com / manager123
- **Employee:** carol@company.com / emp123

## Architecture
- Feature-based folder structure
- 10 Redux slices with createAsyncThunk
- Lazy-loaded routes for code splitting
- Mock data strategy simulating real API calls
- Protected routes with role-based access

## Modules
1. Authentication (Login, Forgot Password)
2. Executive Dashboard (KPIs + Charts)
3. Procurement Workspace
4. Vendor Governance
5. Risk Center
6. Compliance Center
7. Audit Center
8. Reporting Center
9. Notifications
10. Settings