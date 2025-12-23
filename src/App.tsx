import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ApiDoc } from './components/ApiDoc';
import apisConfig from './config/apis.json';
import { ApisConfig } from './types/api';

const config = apisConfig as ApisConfig;

function ApiDocPage() {
  const { apiId } = useParams<{ apiId: string }>();
  const api = config.apis.find((a) => a.id === apiId);

  if (!api) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">API Not Found</h2>
          <p className="text-gray-600">The requested API documentation could not be found.</p>
        </div>
      </div>
    );
  }

  return <ApiDoc api={api} />;
}

function HomePage() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">API Documentation Portal</h2>
        <p className="text-gray-600 mb-6">
          Select an API from the sidebar to view its documentation.
        </p>
        <div className="text-sm text-gray-500">
          {config.apis.length} API{config.apis.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout apis={config.apis} />}>
        <Route index element={<HomePage />} />
        <Route path="docs/:apiId" element={<ApiDocPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
