// Configurações de segurança e ambiente

// Validação de variáveis de ambiente
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const;

// Configurações de segurança
export const securityConfig = {
  // Rate limiting (requisições por minuto)
  rateLimit: {
    maxRequests: 100,
    windowMs: 60000, // 1 minuto
  },
  
  // Timeout de requisições (ms)
  requestTimeout: 30000, // 30 segundos
  
  // Tamanho máximo de upload (bytes)
  maxUploadSize: 5 * 1024 * 1024, // 5MB
  
  // Tipos de arquivo permitidos para upload
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  
  // Configurações de senha
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  
  // Headers de segurança
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
} as const;

// Configurações de cache
export const cacheConfig = {
  // Tempo de cache em segundos
  staticAssets: 31536000, // 1 ano
  apiResponses: 300, // 5 minutos
  userSession: 3600, // 1 hora
} as const;

// Configurações de performance
export const performanceConfig = {
  // Lazy loading
  enableLazyLoading: true,
  lazyLoadThreshold: 0.5, // 50% visível
  
  // Debounce/Throttle delays (ms)
  searchDebounce: 300,
  scrollThrottle: 100,
  resizeThrottle: 200,
  
  // Paginação
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// Validação de ambiente em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
  ];
  
  const missingVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );
  
  if (missingVars.length > 0) {
    console.warn(
      '⚠️ Variáveis de ambiente faltando:',
      missingVars.join(', ')
    );
  }
}

// Função para sanitizar URLs
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Permitir apenas http e https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Protocolo não permitido');
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

// Função para validar origem de requisição
export function isValidOrigin(origin: string): boolean {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://yourdomain.com',
  ];
  
  return allowedOrigins.includes(origin);
}

// Função para gerar nonce para CSP
export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}
