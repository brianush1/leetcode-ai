<script lang="ts">
    export let vertical: number;
    export let horizontal: number;
    export let regionId: string;
    export let problemId: number;
    export let locked: boolean = false;
    export let message: string;

    function onDragover(e: DragEvent) {
      e.preventDefault();
    }

    // export let onDrop: (e: DragEvent) => void = () => {};
    // export let onDoubleClick: () => void = () => {};
  </script>

<!-- on:click={(e) => e.preventDefault()}
on:dragover={onDragover}
on:drop={onDrop}
on:dblclick={onDoubleClick} -->

  <a
    href={locked ? "#" : `/regions/${regionId}/${problemId}`}
    class="marker {locked ? "locked" : ""}"
    style:top="calc({vertical}% - 15px)"
    style:left="calc({horizontal}% - 15px)"
  >
    <div class="circle"></div>
    <div class="label">{message}</div>
  </a>

  <style>
    .marker {
      position: absolute;
    }

    .locked {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
  
    /* Circle styles */
    .circle {
      width: 30px;
      height: 30px;
      background-color: #ef4444;
      border: 1px solid white;
      border-radius: 50%;
      transition: border-width 0.15s ease-in-out;
      box-sizing: border-box;
    }
    
    .marker:not(.locked):hover > .circle {
      border-width: 4px;
    }
  
    /* Label (rectangle) styles */
    .label {
      position: absolute;
      translate: calc(-50% + 15px) 0;
      width: fit-content;
      text-wrap: nowrap;
      top: 35px;
      height: 28px;
      line-height: 28px;
      padding: 0 4px;
      background-color: #15162C;
      border: 2px solid #a855f7;
      border-radius: 5px;
      color: white;
      font-size: 16px;
    }
  
    /* Show the label when hovering over the circle */
    .circle:hover + .label {
      opacity: 0.9;
    }
  </style>
  