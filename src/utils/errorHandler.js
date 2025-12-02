import i18n from '../i18n';

// Error message formatting utility
export const formatErrorMessage = (error) => {
  // Log full technical error for debugging
  console.error('API Error Details:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    statusText: error.response?.statusText,
    stack: error.stack
  });

  // Check for specific API error patterns
  const errorData = error.response?.data;
  const status = error.response?.status;

  // Rate limit / quota exceeded
  if (status === 402 || status === 429 || 
      (typeof errorData === 'string' && errorData.toLowerCase().includes('limit')) ||
      (typeof errorData === 'string' && errorData.toLowerCase().includes('quota'))) {
    return {
      title: i18n.t('errors.rateLimit.title'),
      message: i18n.t('errors.rateLimit.message'),
      action: i18n.t('errors.rateLimit.action')
    };
  }

  // Network errors
  if (!error.response) {
    return {
      title: i18n.t('errors.network.title'),
      message: i18n.t('errors.network.message'),
      action: i18n.t('errors.network.action')
    };
  }

  // Server errors (5xx)
  if (status >= 500) {
    return {
      title: i18n.t('errors.server.title'),
      message: i18n.t('errors.server.message'),
      action: i18n.t('errors.server.action')
    };
  }

  // Not found (404)
  if (status === 404) {
    return {
      title: i18n.t('errors.notFound.title'),
      message: i18n.t('errors.notFound.message'),
      action: i18n.t('errors.notFound.action')
    };
  }

  // Unauthorized (401, 403)
  if (status === 401 || status === 403) {
    return {
      title: i18n.t('errors.unauthorized.title'),
      message: i18n.t('errors.unauthorized.message'),
      action: i18n.t('errors.unauthorized.action')
    };
  }

  // Generic error
  return {
    title: i18n.t('errors.generic.title'),
    message: i18n.t('errors.generic.message'),
    action: i18n.t('errors.generic.action')
  };
};
