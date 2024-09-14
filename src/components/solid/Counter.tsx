/** @jsxImportSource solid-js */

// this is just an example component 
// to make this component work in mdx, use client:load directive 
// for more info: https://docs.astro.build/en/concepts/islands/
import { createSignal } from "solid-js";
import "./Counter.css";

export function Counter(props: any) {
  const [count, setCount] = createSignal(0);
  const add = () => {
    setCount(count() + 1)
  };
  const subtract = () => setCount(count() - 1);

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <span>{count()}</span>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{props.children}</div>
    </>
  );
}
