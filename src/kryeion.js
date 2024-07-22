/**!
 * @version: v0.1.8
 * @name: Kryeion (https://github.com/isocroft/Kryeion)
 * @copyright: Copyright (c) 2017 - 2024, CoolCodes.
 * @license: MIT (https://github.com/iscroft/Kryeion/blob/master/LICENSE)
 *
 * @author: Ifeora Okechukwu (https://twitter.com/isocroft - @isocroft)
 * @type: JS
 * @credits: http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/ 
 */

/**!
    Inspired from => http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/ 
    - Kryeion JS - [v0.1.8]
*/

HTMLSpanElement.prototype.getPseudoStyle = (function (nonceValue) {
  
  var _sheetId = "__pseudoStyles";
  var _head = document.head || document.getElementsByTagName('head')[0];
  var _sheet = document.getElementById(_sheetId) || document.createElement('style');

  if (!sheet.id) {
    _sheet.id = _sheetId;
  }

  if (!sheet.hasAttribute('nonce')) {
    _sheet.setAttribute('nonce', nonceValue);
  }
  
  if (_sheet.parentNode === null) {
    _head.appendChild(_sheet);
  }
  
  return function (elementName) {
      var _this = this;
      var _selector = _this.nodeName.toLowerCase() + (_this.hasAttribute('placeholder') ? '[placeholder]' : '[data-combobox]');
      var cssStyleDeclaration = window.getComputedStyle(_this, ':' + elementName);
     
      return {
            value: cssStyleDeclaration.content,
            setProperty: function (prop, value) {
                  var newText = value;
                  var oldText = this.value;
          
                  if(newText !== oldText){
                      _sheet.innerHTML = _selector+"::"+elementName+"{"+prop+":\""+value+"\";}";
                 }
            }
      };
  };
  
}('arat5eyehaya6a7e8eehd6e7e'));

!function (win, doc) {

  var conditional = doc.querySelector('link.conditional[rel="prefetch"][as="style"]');
  var testElem = doc.createElement('div');

  if (conditional) {
    if (testElem.style.flex !== undefined && testElem.style.flexFlow !== undefined) {
      conditional.setAttribute('href', '://cdn.jsdelivr.net/../flex-layout.css');
    } else {
      conditional.setAttribute('href', '://cdn.jsdelivr.net/../float-layout.css');
    }
  }

  /*!
   * css-var-polyfill.js - v1.2
   *
   * Copyright (c) 2019 Aaron Barker <http://aaronbarker.net>
   * Released under the MIT license
   *
   * @TODO (v0.1.10):
   * - Add support for DOM scoping (check => https://blog.logrocket.com/css-variables-scoping/)
   * - Add support for media queries firing via `window.matchMedia('(...)')`
   *
   * Last updated date: 2021-03-19
   */
  var cssVarPoly = {
    init: function() {
      // first lets see if the browser supports CSS variables
      // No version of IE supports window.CSS.supports, so if that isn't supported in the first place we know CSS variables is not supported
      // Edge supports supports, so check for actual variable support
      if (window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')) {
        // this browser does support variables, abort
        console.info('css-var-polyfill: your browser supports CSS variables, aborting and letting the native support handle things.');
        return;
      } else {
        doc.querySelector('body').classList.add('cssvars-polyfilled');
      }

      cssVarPoly.ratifiedVars = {};
      cssVarPoly.varsByBlock = {};
      cssVarPoly.oldCSS = {};

      // start things off
      cssVarPoly.findCSS();
      cssVarPoly.updateCSS();
    },

    // find all the css blocks, save off the content, and look for variables
    findCSS: function() {
      var styleBlocks = doc.querySelectorAll('style:not(.inserted),link[rel="stylesheet"],link[rel="import"]');

      // we need to track the order of the style/link elements when we save off the CSS, set a counter
      var counter = 1;

      // loop through all CSS blocks looking for CSS variables being set
      [].forEach.call(styleBlocks, function(block) {
        // console.log(block.nodeName);
        var theCSS;
        if (block.nodeName === 'STYLE') {
          // console.log("style");
          theCSS = block.innerHTML;
          cssVarPoly.findSetters(theCSS, counter);
        } else if (block.nodeName === 'LINK') {
          // console.log("link");
          cssVarPoly.getLink(block.getAttribute('href'), counter, function(counter, request) {
            cssVarPoly.findSetters(request.responseText, counter);
            cssVarPoly.oldCSS[counter] = request.responseText;
            cssVarPoly.updateCSS();
          });
          theCSS = '';
        }
        // save off the CSS to parse through again later. the value may be empty for links that are waiting for their ajax return, but this will maintain the order
        cssVarPoly.oldCSS[counter] = theCSS;
        counter++;
      });
    },

    // find all the "--variable: value" matches in a provided block of CSS and add them to the master list
    findSetters: function(theCSS, counter) {
      // console.log(theCSS);
      // tests for the following at https://regex101.com/r/kWwUmp/3
      cssVarPoly.varsByBlock[counter] = theCSS.match(/(--[\w-]+:[\s]*[^;\n}]+)/g) || [];
    },

    // run through all the CSS blocks to update the variables and then inject on the page
    updateCSS: function() {
      // first lets loop through all the variables to make sure later vars trump earlier vars
      cssVarPoly.ratifySetters(cssVarPoly.varsByBlock);

      // loop through the css blocks (styles and links)
      for (var curCSSID in cssVarPoly.oldCSS) {
        // console.log("curCSS:", cssVarPoly.oldCSS[curCSSID]);
        var newCSS = cssVarPoly.replaceGetters(cssVarPoly.oldCSS[curCSSID], cssVarPoly.ratifiedVars);
        // put it back into the page
        // first check to see if this block exists already
        if (doc.querySelector('#inserted' + curCSSID)) {
          // console.log("updating")
          doc.querySelector('#inserted' + curCSSID).innerHTML = newCSS;
        } else {
          // console.log("adding");
          var style = doc.createElement('style');
          style.type = 'text/css';
          style.innerHTML = newCSS;
          style.classList.add('inserted');
          style.id = 'inserted' + curCSSID;
          doc.getElementsByTagName('head')[0].appendChild(style);
        }
      };
    },

    // parse a provided block of CSS looking for a provided list of variables and replace the --var-name with the correct value
    replaceGetters: function(curCSS, varList) {
      // console.log(varList);
      for (var theVar in varList) {
        // console.log(theVar);
        // match the variable with the actual variable name
        var getterRegex = new win.RegExp('var\\(\\s*' + theVar + '\\s*\\)', 'g');
        // console.log(getterRegex);
        // console.log(curCSS);
        curCSS = curCSS.replace(getterRegex, varList[theVar]);

        // now check for any getters that are left that have fallbacks
        var getterRegex2 = new win.RegExp('var\\([^\\)]+,\\s*([^\\)]+)\\)', 'g');
        // console.log(getterRegex);
        // console.log(curCSS);
        var matches = curCSS.match(getterRegex2);

        if (matches) {
          // console.log("matches",matches);
          matches.forEach(function(match) {
            // console.log(match.match(/var\(.+,\s*(.+)\)/))
            // find the fallback within the getter
            curCSS = curCSS.replace(match, match.match(/var\([^\)]+,\s*([^\)]+)\)/)[1]);
          });

        }

        //@TODO: curCSS = curCSS.replace(getterRegex2,varList[theVar]);
      };
      // console.log(curCSS);
      return curCSS;
    },

    // determine the css variable name value pair and track the latest
    ratifySetters: function(varList) {
      // console.log("varList:",varList);
      // loop through each block in order, to maintain order specificity
      for (var curBlock in varList) {
        var curVars = varList[curBlock];
        // console.log("curVars:",curVars);
        // loop through each var in the block
        curVars.forEach(function(theVar) {
          // console.log(theVar);
          // split on the name value pair separator
          var matches = theVar.split(/:\s*/);
          // console.log(matches);
          // put it in an object based on the varName. Each time we do this it will override a previous use and so will always have the last set be the winner
          // 0 = the name, 1 = the value, strip off the ; if it is there
          cssVarPoly.ratifiedVars[matches[0]] = matches[1].replace(/;/, '');
        });
      };
      // console.log(cssVarPoly.ratifiedVars);
    },

    // get the CSS file (same domain for now)
    getLink: function(url, counter, success) {
      var request = new win.XMLHttpRequest();
      request.open('GET', url, true);
      request.overrideMimeType('text/css;');

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          // console.log(request.responseText);
          if (typeof success === 'function') {
            success(counter, request);
          }
        } else {
          // We reached our target server, but it returned an error
          console.warn('css-var-polyfill: an error was returned from; <', url, '>');
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        console.warn('css-var-polyfill: we could not get anything from; <', url, '>');
      };

      request.send();
    }
  };

  cssVarPoly.init();

  /**
   * <select> tag decoration using a pseudo-element
   * 
   * Copyright (c) 2016 Ifeora Okechukwu <https://isocroft.vercel.app>
   */

  var selectTags = doc.querySelectorAll("select");

  var selectUpdateCallback = function (event) {
    var _target = event.srcElement || event.target; 
    var currIndex = _target.selectedIndex;
    var currOption = _target.options[currIndex];
    var selectedText = currOption.text;

    if (!_target.parentNode
      || _target.parentNode.nodeName === "FORM"
        || _target.parentNode.children.length > 1) {
      return;
    }
    _target.parentNode.getPseudoStyle('before').setProperty(
      'content',
      selectedText
    );
  };

  [].slice.call(selectTags).forEach(function (selectTag) {
    selectTag.addEventListener(
      'change', selectUpdateCallback, false
    );
  });

}(window, window.document);
