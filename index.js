/**
 * @file The starting point of Bastion
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const Tesseract = xrequire('tesseract');
const fs = require('fs');
const YAML = require('yaml');
var express = require('express');
var http = require('http');
const jw = require('jw-corona-api');
const client = require('discord.js');
const app2 = express();
const canvas = require('canvas');



const session = require('express-session');



/* eslint-disable no-sync */
const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const credentialsFile = fs.readFileSync('./settings/credentials.yaml', 'utf8');
/* eslint-enable no-sync */
const configurations = YAML.parse(configurationsFile);
const credentials = YAML.parse(credentialsFile);

const Manager = new Tesseract.ShardingManager('./bastion.js', {
  totalShards: configurations.shardCount,
  token: credentials.token
});
const log = xrequire('./handlers/logHandler');

Manager.spawn();

Manager.on('launch', shard => {
  log.info(`Launching Shard ${shard.id} [ ${shard.id + 1} of ${Manager.totalShards} ]`);
}); 
 
let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('OK!');
    response.end();
};

http.createServer(handleRequest).listen(3000);
