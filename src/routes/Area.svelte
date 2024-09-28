<script lang="ts">
    export let message: string;
    export let vertical: number;
    export let horizontal: number;
  </script>
  
  <div 
    id="circle"
    style:top="{vertical}%"
    style:left="{horizontal}%"
  >
    {message}
  </div>
  
  <style>
    #circle {
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: #ef4444;
      border: 1px solid white;
      border-radius: 50%;
      cursor: pointer;
      transition: border-width 0.15s ease-in-out;
      box-sizing: border-box; /* Include this to prevent size changes */
    }
    
    #circle:hover {
      border-width: 4px;
    }
  </style>
  