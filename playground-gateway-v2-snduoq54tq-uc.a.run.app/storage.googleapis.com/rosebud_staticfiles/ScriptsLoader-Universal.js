/**
 * Handles runtime-to-parent communication for universal game iframes.
 *
 * @listens window#message
 * @param {MessageEvent} event - Message from parent window
 */

// Canvas recording configuration
const CANVAS_RECORDING_FPS = 30;
const CANVAS_RECORDING_MIME_TYPE = 'video/webm;codecs=vp9'; // VP9 provides better compression than VP8 while maintaining quality

function postRuntimeLoaded() {
    window.parent.postMessage(
        {
            action: 'runtimeLoaded',
        },
        '*',
    );
}

if (document.readyState === 'complete') {
    setTimeout(postRuntimeLoaded, 0);
} else {
    window.addEventListener('load', postRuntimeLoaded, { once: true });
}

function initializePlayerActionTracking() {
    let hasTrackedPlayerAction = false;
    const trackedEvents = ['pointerdown', 'keydown', 'touchstart'];

    function removePlayerActionListeners() {
        trackedEvents.forEach((eventName) => {
            window.removeEventListener(eventName, handlePlayerAction, true);
        });
    }

    function handlePlayerAction(event) {
        if (hasTrackedPlayerAction) return;
        hasTrackedPlayerAction = true;

        window.parent.postMessage(
            {
                action: 'playerAction',
                content: {
                    eventType: event.type,
                },
            },
            '*',
        );

        removePlayerActionListeners();
    }

    trackedEvents.forEach((eventName) => {
        window.addEventListener(eventName, handlePlayerAction, {
            capture: true,
            passive: true,
        });
    });
}

initializePlayerActionTracking();

window.addEventListener('message', (event) => {

    if (event.data.action === 'requestCanvasRecording') {
        const requestId = event.data.requestId;
        const action = event.data.recordingAction; // 'start' or 'stop'
        
        if (action === 'start') {
            const canvas = document.querySelector('canvas');
            if (!canvas) {
                window.parent.postMessage({
                    action: 'canvasRecordingResponse',
                    content: { error: 'No canvas found' },
                    requestId: requestId
                }, '*');
                return;
            }

            if (!canvas.captureStream) {
                window.parent.postMessage({
                    action: 'canvasRecordingResponse',
                    content: { error: 'Canvas recording not supported' },
                    requestId: requestId
                }, '*');
                return;
            }

            try {
                const stream = canvas.captureStream(CANVAS_RECORDING_FPS);
                
                // Store recording state globally in iframe
                // Note: Using window.canvasRecorder to maintain state across message events
                // Alternative approaches would require more complex state management systems
                // Clear any existing recorder to prevent namespace collisions
                if (window.canvasRecorder) {
                    window.canvasRecorder = null;
                }
                window.canvasRecorder = {
                    mediaRecorder: null,
                    chunks: [],
                    requestId: requestId
                };

                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: CANVAS_RECORDING_MIME_TYPE
                });

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        window.canvasRecorder.chunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(window.canvasRecorder.chunks, { type: 'video/webm' });
                    
                    // Convert blob to base64 to send via postMessage
                    const reader = new FileReader();
                    reader.onload = () => {
                        window.parent.postMessage({
                            action: 'canvasRecordingResponse',
                            content: { 
                                success: true, 
                                videoData: reader.result,
                                size: blob.size 
                            },
                            requestId: window.canvasRecorder.requestId
                        }, '*');
                        
                        // Clean up
                        stream.getTracks().forEach(track => track.stop());
                        window.canvasRecorder = null;
                    };
                    reader.readAsDataURL(blob);
                };

                window.canvasRecorder.mediaRecorder = mediaRecorder;
                mediaRecorder.start();

                window.parent.postMessage({
                    action: 'canvasRecordingResponse',
                    content: { success: true, started: true },
                    requestId: requestId
                }, '*');

            } catch (error) {
                window.parent.postMessage({
                    action: 'canvasRecordingResponse',
                    content: { error: error.message },
                    requestId: requestId
                }, '*');
            }
        } else if (action === 'stop') {
            if (window.canvasRecorder && window.canvasRecorder.mediaRecorder) {
                window.canvasRecorder.mediaRecorder.stop();
            } else {
                window.parent.postMessage({
                    action: 'canvasRecordingResponse',
                    content: { error: 'No active recording' },
                    requestId: requestId
                }, '*');
            }
        }
        return;
    }

    // Handle Screenshot Request
    if (event.data && event.data.action === 'requestScreenshot') {
        // Use requestAnimationFrame to capture the next available frame
        requestAnimationFrame(() => {
            let responseContent;
            const targetWebpQuality = 0.7;
            const targetJpegQuality = 0.5;

            try {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                    // Try all formats and pick the smallest one.
                    // Safari doesn't support WebP encoding and silently returns PNG,
                    // so we need to compare all formats to get the best compression.
                    const webpDataUrl = canvas.toDataURL('image/webp', targetWebpQuality);
                    const jpegDataUrl = canvas.toDataURL('image/jpeg', targetJpegQuality);
                    const pngDataUrl = canvas.toDataURL('image/png');

                    // Find the smallest format
                    const formats = [
                        { url: webpDataUrl, size: webpDataUrl.length },
                        { url: jpegDataUrl, size: jpegDataUrl.length },
                        { url: pngDataUrl, size: pngDataUrl.length },
                    ];
                    formats.sort((a, b) => a.size - b.size);
                    const smallest = formats[0];

                    responseContent = {
                        success: true,
                        imageData: smallest.url
                    };
                } else {
                    responseContent = {
                        success: false,
                        error: 'Canvas element not found inside iframe for screenshot.'
                    };
                }
            } catch (error) {
                const isTaintedCanvasError =
                    error &&
                    error.name === 'SecurityError' &&
                    typeof error.message === 'string' &&
                    error.message.toLowerCase().includes('tainted');

                responseContent = {
                    success: false,
                    error: isTaintedCanvasError
                        ? 'Canvas screenshot blocked because the canvas was tainted by a cross-origin image or video.'
                        : 'Error capturing canvas screenshot inside iframe',
                    message: error.message,
                    stack: error.stack
                };
            }

            // Send the response back to the parent window
            if (event.source) {
                event.source.postMessage(
                    {
                        action: 'screenshotResponse',
                        content: responseContent,
                    },
                    event.origin,
                );
            } else {
                // If we can't send the response, there's nothing we can do
                // Don't log to console.error as it would appear as a runtime error
            }
        });

        return;
    }
});

/**
 * @typedef {Object} ErrorData
 * @property {string} message
 * @property {string} source
 * @property {number} lineNumber
 * @property {number} columnNumber
 * @property {string} stack
 * @property {string} errorName
 * @property {string} fullError
 */

/**
 * Replaces blob URLs in text with readable file names for clearer error messages.
 * Used by all error handlers to transform cryptic blob URLs.
 *
 * @param {string} text - Text containing blob URLs
 * @returns {string} Text with blob URLs replaced by file names
 */
function mapBlobUrlsToFileNames(text) {
    if (!text || !window.__blobToFileMap) return text;

    let transformedText = text;
    for (const [blobUrl, fileName] of Object.entries(window.__blobToFileMap)) {
        transformedText = transformedText.replace(new RegExp(blobUrl, 'g'), fileName);
    }

    return transformedText;
}

/**
 * Maps a single URL to its file name, handling exact and partial matches.
 * Primarily used by onerror handler for the 'source' parameter.
 *
 * @param {string} url - URL to map to file name
 * @returns {string} File name if found, otherwise original URL
 */
function mapUrlToFileName(url) {
    if (!url || !window.__blobToFileMap) return url;

    if (window.__blobToFileMap[url]) {
        return window.__blobToFileMap[url];
    }

    for (const [blobUrl, fileName] of Object.entries(window.__blobToFileMap)) {
        if (url.includes(blobUrl)) {
            return fileName;
        }
    }

    return url;
}

function truncateRuntimeConsoleText(text, limit = 2000) {
    if (!text || text.length <= limit) return text;
    return `${text.slice(0, limit)}... [truncated ${text.length - limit} chars]`;
}

function stringifyRuntimeConsoleArg(arg) {
    if (arg instanceof Error) {
        return arg.message;
    }

    if (typeof arg === 'string') {
        return arg;
    }

    try {
        return JSON.stringify(arg);
    } catch (error) {
        return String(arg);
    }
}

function formatRuntimeConsoleArgs(args) {
    if (args.length === 0) return { message: '', segments: undefined };

    const first = args[0];
    if (typeof first !== 'string' || !first.includes('%')) {
        return { message: args.map(stringifyRuntimeConsoleArg).join(' '), segments: undefined };
    }

    const segments = [];
    let currentText = '';
    let currentCss;
    let argIdx = 1;

    const flush = () => {
        if (!currentText) return;
        segments.push({ text: currentText, css: currentCss });
        currentText = '';
    };

    for (let i = 0; i < first.length; i++) {
        const ch = first[i];
        if (ch !== '%' || i + 1 >= first.length) {
            currentText += ch;
            continue;
        }

        const code = first[i + 1];
        if (code === '%') {
            currentText += '%';
            i++;
            continue;
        }
        if (code === 'c' && argIdx < args.length) {
            flush();
            currentCss = String(args[argIdx++]);
            i++;
            continue;
        }
        if ((code === 's' || code === 'd' || code === 'i' || code === 'f' || code === 'o' || code === 'O') && argIdx < args.length) {
            currentText += stringifyRuntimeConsoleArg(args[argIdx++]);
            i++;
            continue;
        }
        currentText += ch;
    }
    flush();

    if (argIdx < args.length) {
        const tail = args.slice(argIdx).map(stringifyRuntimeConsoleArg).join(' ');
        if (tail) segments.push({ text: ` ${tail}` });
    }

    const message = segments.map((s) => s.text).join('');
    const hasStyledSegment = segments.some((s) => s.css);

    return { message, segments: hasStyledSegment ? segments : undefined };
}

function postRuntimeConsoleEvent(level, args, kind = 'console') {
    const error = args.find((arg) => arg instanceof Error);
    const { message, segments } = formatRuntimeConsoleArgs(args);
    const mappedMessage = mapBlobUrlsToFileNames(message);
    const mappedSegments = segments?.map((segment) => ({
        text: mapBlobUrlsToFileNames(segment.text),
        css: segment.css,
    }));
    const stack = error?.stack ? mapBlobUrlsToFileNames(error.stack) : undefined;

    window.parent.postMessage(
        {
            action: 'runtimeConsole',
            content: {
                level,
                kind,
                message: truncateRuntimeConsoleText(mappedMessage),
                segments: mappedSegments,
                source: `console.${level}`,
                lineNumber: 0,
                columnNumber: 0,
                stack: truncateRuntimeConsoleText(stack, 4000),
                errorName: error?.name,
                fullError: error?.toString(),
                timestamp: new Date().toISOString(),
            },
        },
        '*',
    );
}

['log', 'info', 'warn', 'error'].forEach((level) => {
    const originalConsoleMethod = console[level];
    console[level] = (...args) => {
        originalConsoleMethod.apply(console, args);
        postRuntimeConsoleEvent(level, args);
    };
});

window.addEventListener('unhandledrejection', (event) => {
    postRuntimeConsoleEvent('error', [event.reason || 'Unhandled promise rejection'], 'unhandled_rejection');
});

function formatBrowserDialogFailureMessage(method, args, error) {
    const userMessage = args.length > 0 ? String(args[0]) : '';
    const nativeMessage = error instanceof Error && error.message ? error.message : '';
    const fallbackMessage = `${method}() could not run in the preview`;
    const diagnosticMessage = nativeMessage || fallbackMessage;

    return userMessage ? `${diagnosticMessage}: ${userMessage}` : diagnosticMessage;
}

function postBrowserDialogFailureEvent(method, args, error) {
    postRuntimeConsoleEvent('error', [formatBrowserDialogFailureMessage(method, args, error)]);
}

// Preview iframes omit allow-modals, so browsers can suppress dialog APIs by
// returning fallback values instead of throwing. Surface those calls explicitly.
['alert', 'confirm', 'prompt'].forEach((method) => {
    const original = window[method];
    if (typeof original !== 'function') return;
    window[method] = function (...args) {
        try {
            const result = original.apply(window, args);
            postBrowserDialogFailureEvent(method, args);
            return result;
        } catch (error) {
            postBrowserDialogFailureEvent(method, args, error);
            throw error;
        }
    };
});

// Capture browser-emitted reports (deprecations, other interventions) that don't flow
// through window.console and would otherwise only appear in DevTools.
if (typeof ReportingObserver === 'function') {
    try {
        const reportingObserver = new ReportingObserver(
            (reports) => {
                for (const report of reports) {
                    const body = report.body || {};
                    let message = body.message || body.reason || `Browser ${report.type} report`;
                    if (body.sourceFile) {
                        const mappedSource = mapUrlToFileName(body.sourceFile);
                        const location = body.lineNumber ? `:${body.lineNumber}` : '';
                        message += ` (${mappedSource}${location})`;
                    }
                    postRuntimeConsoleEvent('warn', [`[${report.type}] ${message}`]);
                }
            },
            { buffered: true, types: ['intervention', 'deprecation'] },
        );
        reportingObserver.observe();
    } catch (_error) {
        // ReportingObserver not supported in this environment; safe to skip.
    }
}

/**
 * Captures uncaught JavaScript runtime errors and syntax errors.
 * Automatically triggered by browser when JS errors occur.
 *
 * HANDLES: Runtime exceptions that bubble up to window level
 * vs console.error: Explicit logging calls
 * vs error event: Resource loading failures
 *
 * @param {string} message - Error message
 * @param {string} source - Script URL where error occurred
 * @param {number} lineno - Line number
 * @param {number} colno - Column number
 * @param {Error} error - Error object with stack trace
 */
window.onerror = (message, source, lineno, colno, error) => {
    const mappedSource = mapUrlToFileName(source);
    const mappedMessage = mapBlobUrlsToFileNames(message);
    const mappedStack = error?.stack ? mapBlobUrlsToFileNames(error.stack) : undefined;

    window.parent.postMessage(
        {
            action: 'codeError',
            /** @type {ErrorData} */
            content: {
                message: mappedMessage,
                source: mappedSource,
                lineNumber: lineno,
                columnNumber: colno,
                stack: mappedStack,
                errorName: error?.name,
                fullError: error?.toString(),
            },
        },
        '*',
    );
};
/**
 * Captures resource loading errors that window.onerror misses.
 * Only processes events where event.error is null (resource failures).
 *
 * HANDLES: Resource loading failures (404 scripts, CSS failures)
 * vs window.onerror: JavaScript runtime exceptions
 * vs console.error: Explicit logging calls
 *
 * @listens window#error
 * @param {ErrorEvent} event - Error event (event.error=null for resource errors)
 */
window.addEventListener(
    'error',
    /** @param {ErrorEvent} event */
    (event) => {
        // If event.error exists this is a normal runtime exception, window.onerror should handle it
        if (event.error) return;
        event.preventDefault();

        const source = event.filename || event?.target?.src || event?.target?.href || '';
        const mappedSource = mapUrlToFileName(source);
        const message =
            event.message || `Resource load error: ${event?.target?.src || event?.target?.href || 'Unknown'}`;

        let mappedMessage = mapBlobUrlsToFileNames(message);

        if (event?.target?.baseURI)
            mappedMessage += `\n\nevent.target.baseURI:\n${event.target.baseURI}`;

        if (event?.target?.outerHTML)
            mappedMessage += `\n\nevent.target.outerHTML:\n${event.target.outerHTML}`;

        if (event?.target?.error?.message)
            mappedMessage += `\n\nevent.target.error:\n${event.target.error.message}`;

        window.parent.postMessage(
            {
                action: 'codeError',
                /** @type {ErrorData} */
                content: {
                    message: mappedMessage,
                    source: mappedSource,
                    lineNumber: event.lineno || 0,
                    columnNumber: event.colno || 0,
                    stack: undefined,
                    errorName: 'ResourceError',
                    fullError: event.message || 'Resource failed to load',
                },
            },
            '*',
        );
    },
    true, // capture phaseâ€”needed to catch load errors
);

// Also monitor Performance API for resource timing
if (window.PerformanceObserver) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Check for failed resource loads (HTTP 4xx/5xx errors only)
            if (entry.entryType === 'resource' && entry.responseStatus >= 400) {
                // Extract just the filename from the full URL
                const urlParts = entry.name.split('/');
                const filename = urlParts[urlParts.length - 1];

                const message = `Resource failed to load (${entry.responseStatus}): ${filename}`;

                window.parent.postMessage(
                    {
                        action: 'codeError',
                        content: {
                            message: message,
                            source: entry.name,
                            lineNumber: 0,
                            columnNumber: 0,
                            stack: `Failed to load resource from: ${entry.name}\nStatus: ${entry.responseStatus || 'Network Error'}`,
                            errorName: 'ResourceLoadError',
                            fullError: `${message}\nURL: ${entry.name}`,
                        },
                    },
                    '*',
                );
            }
        }
    });

    observer.observe({ entryTypes: ['resource'] });
}
