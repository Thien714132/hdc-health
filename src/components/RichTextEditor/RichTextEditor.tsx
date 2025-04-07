'use client';

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => void;
};

type RichTextEditorProps = {
  htmlContent: string;
  onClose: () => void;
  onSave: (text: string) => void;
  loading: boolean;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  ({ htmlContent, onClose, onSave, loading }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (!editorRef.current) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });

      // Set initial content
      quillRef.current.clipboard.dangerouslyPasteHTML(htmlContent);

      return () => {
        quillRef.current = null; // Cleanup
      };
    }, [htmlContent]);

    // Function to get editor content
    const getContent = () => {
      onSave(quillRef.current ? quillRef.current.root.innerHTML : '');
      // return quillRef.current ? quillRef.current.root.innerHTML : '';
    };

    // Expose the getContent function to the parent component
    useImperativeHandle(ref, () => ({
      getContent,
    }));

    return (
      <div className="flex flex-col h-full w-full">
        <div ref={editorRef} style={{ height: '100%', width: '100%' }} />
        <div className="flex gap-[20px] w-full justify-end items-center mt-[10px]">
          <div
            className="cursor-pointer h-[40px] w-[100px] bg-[#F2F2F7] flex items-center justify-center text-[#000000] rounded-[16px]"
            onClick={onClose}>
            Cancel
          </div>
          <div
            onClick={getContent}
            className="cursor-pointer h-[40px] w-[100px] bg-[#000] flex items-center justify-center text-[#fff] rounded-[16px]">
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined spin style={{ color: '#F2F2F7' }} />
                }
                size="default"
              />
            ) : (
              'Save'
            )}
          </div>
        </div>
      </div>
    );
  },
);

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
