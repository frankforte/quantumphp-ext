/**
 * Copyright 2017 Frank Forte
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(!ffQunatumPhp){ var ffQunatumPhp = {}; }
ffQunatumPhp.enabled = false;

/**
 * Toggles extension icon
 */
ffQunatumPhp.icon = function(on) {
	var type = on ? '' : '-dark';
	browser.browserAction.setIcon({
	path: {
		'16': 'icon' + type + '16.png',
		'32': 'icon' + type + '32.png',
		'48': 'icon' + type + '48.png',
		'64': 'icon' + type + '64.png'
	}
	});
	browser.browserAction.setTitle({"title":"Turn "+(on ? "off" : "on")+" QuantumPHP"});
}

/**
 * Toggles extension on and off
 */
ffQunatumPhp.toggle = function(){
	console.log("toggle")
	ffQunatumPhp.enabled ? ffQunatumPhp.off() : ffQunatumPhp.on();
}
/**
 * Turns extension on
 */
ffQunatumPhp.on = function(){
	console.log("on")
	ffQunatumPhp.enabled = true;
	browser.storage.local.set({"enabled":true});
	ffQunatumPhp.icon(true);
}
/**
 * Turns extension off
 */
ffQunatumPhp.off = function(){
	console.log("off")
	ffQunatumPhp.enabled = false;
	browser.storage.local.set({"enabled":false});
	ffQunatumPhp.icon(false);
}


ffQunatumPhp.restoreOptions = function() {

	browser.storage.sync.set({
		enabled: ffQunatumPhp.enabled
	});

  console.log("restoreOptions")
  
  var storageItem = browser.storage.managed.get('enabled');
   
   console.log(storageItem);
   
  function setCurrentChoice(result) {
    ffQunatumPhp.enabled = result.enabled || false;
	ffQunatumPhp.enabled ? ffQunatumPhp.on() : ffQunatumPhp.off();
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("enabled");
  getting.then(setCurrentChoice, onError);
}

browser.browserAction.onClicked.addListener((tab) => {
  // disable the active tab
  browser.browserAction.disable(tab.id);
  // requires the "tabs" or "activeTab" permission
  console.log(tab.url);
});
browser.browserAction.onClicked.addListener(ffQunatumPhp.toggle);


document.addEventListener("DOMContentLoaded", function(){
	ffQunatumPhp.restoreOptions();
	browser.browserAction.onClicked.addListener(function(){ffQunatumPhp.toggle()});
});