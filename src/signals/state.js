import { signal} from "@preact/signals-react";

const state = signal({
  home:[],
  article:undefined,
});

export default state;