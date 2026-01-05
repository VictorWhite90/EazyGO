/**
 * Utility to filter out HTML props that conflict with Framer Motion
 */

import { HTMLAttributes, ButtonHTMLAttributes } from 'react';

const CONFLICTING_PROPS = ['onDrag', 'onDragStart', 'onDragEnd', 'onAnimationStart', 'onAnimationEnd'] as const;

export function filterMotionProps<T extends Record<string, any>>(props: T): Omit<T, typeof CONFLICTING_PROPS[number]> {
  const filtered = { ...props };
  CONFLICTING_PROPS.forEach(prop => {
    delete filtered[prop];
  });
  return filtered as Omit<T, typeof CONFLICTING_PROPS[number]>;
}
