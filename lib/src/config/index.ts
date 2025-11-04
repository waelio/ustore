import client from "./client";
import dev from "./dev";
import prod from "./prod";
import server from "./server";
const CONFIG = () => ({ server, client, dev, prod });

export { CONFIG };
export default CONFIG;
