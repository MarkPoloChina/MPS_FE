<script setup lang="ts">
import * as PIXI from "pixi.js";
import { Ticker, TickerPlugin } from "@pixi/ticker";
import { InternalModel, Live2DModel } from "pixi-live2d-display/cubism4";
import { onMounted, onUnmounted } from "vue";

let app: PIXI.Application;
let model: Live2DModel<InternalModel>;

const init = async () => {
  PIXI.extensions.add(TickerPlugin);
  Live2DModel.registerTicker(Ticker);

  const ratio = window.devicePixelRatio || 1;
  document.getElementById("canvas")!.style.width = "150px";
  document.getElementById("canvas")!.style.height = "360px";

  app = new PIXI.Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    width: 150 * ratio,
    height: 360 * ratio,
    backgroundAlpha: 0,
  });

  model = await Live2DModel.from("/live2d/hk416/normal.model3.json");

  app.stage.addChild(model);

  model.x = 75 * ratio;
  model.y = 184 * ratio;
  model.scale.set(0.08 * ratio, 0.08 * ratio);
  model.anchor.set(0.5, 0.5);

  model.on("click", () => {
    model!.motion("TapBody");
  });
};

onMounted(() => {
  init();
});
onUnmounted(() => {
  if (app) app.destroy(true);
  if (model) model.destroy();
});
</script>
<template>
  <canvas id="canvas"></canvas>
</template>
<style lang="scss" scoped>
#canvas {
  position: fixed;
  right: 0;
  bottom: 0;
  @media screen and (max-width: $mobile-width) {
    display: none;
  }
}
</style>
