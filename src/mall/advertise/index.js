
import injectModules from "@/utils/mall/importModule";
const components = injectModules(
  require.context("./container", false, /\.vue$/),
  "vue"
);

export default components;

