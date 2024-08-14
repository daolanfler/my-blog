/** @jsxImportSource solid-js */

import { onMount, createEffect, createSignal } from "solid-js";

interface Props {
  userName?: string;
  slug: string;
  height?: string;
  editable?: boolean;
  defaultTab?: string;
}

export default function (props: Props) {
  const {
    defaultTab = "css,result",
    editable = false,
    height = 300,
    slug,
    userName = "daolanfler",
  } = props;

  onMount(() => {
    const s = document.createElement("script");
    s.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
    s.async = true;
    document.body.appendChild(s);
  });

  return (
    <>
      <p
        class="codepen"
        data-height={height}
        data-default-tab={defaultTab}
        data-slug-hash={slug}
        data-editable={editable}
        data-user={userName}
        style="
      height: 300px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid;
      margin: 1em 0;
      padding: 1em;
    "
      >
        <span>
          See the Pen
          <a href={`https://codepen.io/${userName}/pen/${slug}`}>
            overflow-hidden-with-absolute-position-1
          </a>
          by {userName} (
          <a href={`https://codepen.io/${userName}`}>@{userName}</a>) on
          <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>
    </>
  );
}
