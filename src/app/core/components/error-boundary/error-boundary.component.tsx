import * as React from 'react';
import * as styles from './error-boundary.scss';
/**
 * Renders ErrorBoundary
 */
interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  errorStack: string;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorStack: ''
    };
  }

  public static getDerivedStateFromError({ message, stack }: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorStack: stack ?? 'error stack not found', errorMessage: message };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, errorMessage, errorStack } = this.state;
    const { children } = this.props;
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.caption}>
            <div className={styles.warn}>!</div>
            <div className={styles.info}>Oops, something went wrong...</div>
            <button
              className={styles.buttonReload}
              onClick={() => {
                window.location.reload();
              }}
              type='button'
            >
              Please try again
            </button>
          </div>
          {isDevelopment && (
            <div className={styles.errorContainer}>
              <div className={styles.message}>
                <span className={styles.errorCaption}>Message: </span>
                <span className={styles.errorDescription}>{errorMessage}</span>
              </div>
              <div className={styles.stack}>
                <span className={styles.errorCaption}>Stack:</span>
                {errorStack}
              </div>
            </div>
          )}
        </div>
      );
    }

    return children;
  }
}

export { ErrorBoundary };
