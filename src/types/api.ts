export interface ApiSpec {
  id: string;
  name: string;
  version: string;
  category: string;
  specPath: string;
  type: 'openapi' | 'raml';
  description?: string;
}

export interface ApisConfig {
  apis: ApiSpec[];
}
