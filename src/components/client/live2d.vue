<script setup lang="ts">
import * as PIXI from "pixi.js";
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InternalModel, Live2DModel } from "pixi-live2d-display/cubism4";
import { onMounted, onUnmounted } from "vue";

let app: PIXI.Application;
let model: Live2DModel<InternalModel>;

const init = async () => {
  PIXI.extensions.add(TickerPlugin);
  Live2DModel.registerTicker(Ticker);

  app = new PIXI.Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    width: 150,
    height: 360,
    backgroundAlpha: 0,
  });

  model = await Live2DModel.from("/live2d/hk416/normal.model3.json");

  app.stage.addChild(model);

  model.x = 75;
  model.y = 184;
  model.scale.set(0.08, 0.08);
  model.anchor.set(0.5, 0.5);

  model.on("click", (_hitAreas) => {
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
