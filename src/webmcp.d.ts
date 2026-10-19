// Declarative WebMCP attributes (https://developer.chrome.com/docs/ai/webmcp).
/* eslint-disable @typescript-eslint/no-unused-vars -- T must match React's declaration to merge. */
import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }
  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}
