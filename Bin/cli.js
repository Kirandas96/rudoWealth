#!/usr/bin/env node

const axios = require("axios");
const yargs = require("yargs");


const options = yargs
 .usage("Usage: -n <name>")
 .option("s", { alias: "search", describe: "Search term", type: "string" })
 .argv;

const url=`https://concruise.herokuapp.com/${options.search}/users`

axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
   console.log(res.data);
 });

