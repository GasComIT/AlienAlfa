/* Copyright (C) 2022 Albin Thomas.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Alien-Alfa WhatsApp Bot - Albin Thomas
*/
const fs = require("fs")
  const { HANDLERS } = require("../database/settings");

var commands = [];

function command(info, func) {
  let types = ['converter','downloader','game','group','heroku','tool','user','xediazi','search','Textpro','Maker menu','user','textmaker','edit', 'theme']
  var infos = info;
  infos.function = func;
  infos.pattern = new RegExp( `${HANDLERS}( ?${info.pattern})`,  `is` );
  if (!infos.dontAddCommandList) infos.dontAddCommandList = false;
  if (!infos.fromMe) infos.dontAddCommandList = false;
  if (!info.type||!types.includes(info.type)) infos.type = 'misc';
  commands.push(infos);
  return infos;
}
module.exports = {
  command,
  commands,
};