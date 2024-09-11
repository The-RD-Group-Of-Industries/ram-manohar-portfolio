import * as React from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

export interface TextareaProps extends React.HTMLProps<HTMLDivElement> {
  value?: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, value = '', onChange, ...props }, ref) => {
    const [isBold, setIsBold] = React.useState<boolean>(false);
    const [isItalic, setIsItalic] = React.useState<boolean>(false);
    const [isUnderline, setIsUnderline] = React.useState<boolean>(false);
    const editorRef = React.useRef<HTMLDivElement | null>(null);

    const combinedRef = (node: HTMLDivElement | null) => {
      editorRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const wrapContentInDiv = () => {
      if (editorRef.current) {
        let html = editorRef.current.innerHTML;
        if (!html.startsWith('<div>') || !html.endsWith('</div>')) {
          html = `<div>${html}</div>`;
        }
        editorRef.current.innerHTML = html;
      }
    };

    const adjustHeight = React.useCallback(() => {
      if (editorRef.current) {
        editorRef.current.style.height = 'auto';
        editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
      }
    }, []);

    const handleContentChange = React.useCallback(() => {
      if (editorRef.current) {
        wrapContentInDiv();
        const html = editorRef.current.innerHTML;
        if (onChange) {
          const event = {
            target: { value: html },
          } as unknown as React.ChangeEvent<HTMLDivElement>;
          onChange(event);
        }
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));

        adjustHeight();
      }
    }, [onChange, adjustHeight]);

    const applyFormatting = (command: string) => {
      document.execCommand(command, false, '');
      handleContentChange();
    };

    React.useEffect(() => {
      adjustHeight();
      const observer = new ResizeObserver(adjustHeight);
      if (editorRef.current) {
        observer.observe(editorRef.current);
      }
      return () => {
        if (editorRef.current) {
          observer.unobserve(editorRef.current);
        }
      };
    }, [adjustHeight]);

    return (
      <div className="space-y-1">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => applyFormatting('bold')}
            className={`p-[1px] rounded hover:bg-dashMain transition ${
              isBold ? 'bg-dashMain text-white' : 'bg-white text-gray-600'
            }`}
            aria-label="Bold"
          >
            <Bold className="h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('italic')}
            className={`p-[1px] rounded hover:bg-dashMain transition ${
              isItalic ? 'bg-dashMain text-white' : 'bg-white text-gray-600'
            }`}
            aria-label="Italic"
          >
            <Italic className="h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormatting('underline')}
            className={`p-[1px] rounded hover:bg-dashMain transition ${
              isUnderline ? 'bg-dashMain text-white' : 'bg-white text-gray-600'
            }`}
            aria-label="Underline"
          >
            <Underline className="h-4" />
          </button>
        </div>
        <div
          ref={combinedRef}
          contentEditable
          className={`border border-dashMain bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm ring-offset-dashMain focus:border-dashMainHover ${className}`}
          {...props}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
