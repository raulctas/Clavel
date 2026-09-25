import { ReactNode } from 'react';

import styles from './rich-text.module.css';

interface Props {
  /**
   * Bloques de texto tal como vienen de `translation.json`:
   * - `## Texto`: subtítulo.
   * - `### Texto`: subtítulo menor.
   * - `- Texto`: elemento de lista (los consecutivos forman una misma lista).
   * - Cualquier otro: párrafo.
   *
   * Es un formato mínimo para que los textos largos (noticias, política de
   * privacidad) se puedan traducir sin tocar el código ni escribir HTML.
   */
  blocks: string[];
  className?: string;
}

const HEADING_2 = '## ';
const HEADING_3 = '### ';
const LIST_ITEM = '- ';

export const RichText = ({ blocks, className }: Props) => {
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={`list-${nodes.length}`} className={styles.list}>
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  };

  blocks.forEach((block, index) => {
    if (block.startsWith(LIST_ITEM)) {
      listItems.push(block.slice(LIST_ITEM.length));
      return;
    }
    flushList();
    if (block.startsWith(HEADING_3)) {
      nodes.push(
        <h3 key={index} className={styles.heading3}>
          {block.slice(HEADING_3.length)}
        </h3>,
      );
    } else if (block.startsWith(HEADING_2)) {
      nodes.push(
        <h2 key={index} className={styles.heading2}>
          {block.slice(HEADING_2.length)}
        </h2>,
      );
    } else {
      nodes.push(
        <p key={index} className={styles.paragraph}>
          {block}
        </p>,
      );
    }
  });
  flushList();

  return <div className={[styles.text, className].filter(Boolean).join(' ')}>{nodes}</div>;
};
