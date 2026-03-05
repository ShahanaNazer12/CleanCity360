// import axios from "axios";

// const instance = axios.create({
//      baseURL:'http://localhost:4000/api/v1'
// });
// export default instance

import axios from "axios";

const instance = axios.create({
  baseURL: "https://cleancity360.onrender.com/api/v1"
});

export default instance;