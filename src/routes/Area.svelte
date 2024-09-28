<script lang="ts">
    export let message: string;
    export let vertical: number;
    export let horizontal: number;
  </script>
  
  <div 
    id="marker"
    style:top="{vertical}%"
    style:left="{horizontal}%"
  >
    <div id="circle"></div>
    <div id="label">{message}</div>
  </div>
  
  <style>
    /* Marker container positioned absolutely */
    #marker {
      position: absolute;
      /* No additional positioning needed here */
    }
  
    /* Circle styles */
    #circle {
      width: 30px;
      height: 30px;
      background-color: #ef4444;
      border: 1px solid white;
      border-radius: 50%;
      cursor: pointer;
      transition: border-width 0.15s ease-in-out;
      box-sizing: border-box;
    }
    
    #circle:hover {
      border-width: 4px;
    }
  
    /* Label (rectangle) styles */
    #label {
      position: absolute;
      top: 35px;
      left: -55px;
      width: 140px;
      height: 28px;
      background-color: #15162C;
      border: 2px solid #a855f7;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
    }
  
    /* Show the label when hovering over the circle */
    #circle:hover + #label {
      opacity: 0.9;
    }
  </style>
  