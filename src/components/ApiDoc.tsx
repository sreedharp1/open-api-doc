import { RedocStandalone } from 'redoc';
import { ApiSpec } from '../types/api';

interface ApiDocProps {
  api: ApiSpec;
}

export function ApiDoc({ api }: ApiDocProps) {
  // For RAML files, use the converted OpenAPI version
  const specUrl = api.type === 'raml'
    ? api.specPath.replace(/\.raml$/, '.converted.yaml')
    : api.specPath;

  return (
    <div className="h-full overflow-auto">
      <RedocStandalone
        specUrl={specUrl}
        options={{
          scrollYOffset: 0,
          hideDownloadButton: false,
          hideHostname: false,
          pathInMiddlePanel: true,
          theme: {
            colors: {
              primary: {
                main: '#3b82f6',
              },
            },
            sidebar: {
              backgroundColor: '#1f2937',
              textColor: '#f3f4f6',
              activeTextColor: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}
