import http from 'k6/http';
import { check, sleep } from "k6";

const isNumeric = (value) => /^\d+$/.test(value);

const default_vus = 10;

const target_vus_env = `${__ENV.TARGET_VUS}`;
const target_vus = isNumeric(target_vus_env) ? Number(target_vus_env) : default_vus;

export let options = {
  stages: [
      // Ramp-up from 1 to TARGET_VUS virtual users (VUs) in 5s
      { duration: "15s", target: target_vus },

      // Stay at rest on TARGET_VUS VUs for 10s
      { duration: "20s", target: target_vus },

      // Ramp-down from TARGET_VUS to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

// export default function () {
//   const response = http.get("https://swapi.dev/api/people/30/", {headers: {Accepts: "application/json"}});
//   check(response, { "status is 200": (r) => r.status === 200 });
//   sleep(.300);
// };

export default function () {
  const response = http.get(
    "https://staging-api.pmt.teamdev.id/api/v1/id/coverage?client_id=4e8c7bb9-c3ca-47e8-b6a4-609e65dd7008&longitude=107.6736125&latitude=-6.3219097",
    { headers: { Accepts: "application/json" } }
  );
  check(response, { "status is 200": (r) => r.status === 200 });
  sleep(.300);
};
